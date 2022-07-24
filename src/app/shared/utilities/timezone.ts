const tz: any = {};
tz.moveInvalidForward = true;
tz.moveAmbiguousForward = false;

const zones: { [prop: string]: any } = {},
	links: { [prop: string]: any } = {},
	countries: { [prop: string]: any } = {},
	names: { [prop: string]: any } = {},
	guesses: { [prop: string]: any } = {};
let cachedGuess: any = null;

/** Unpacking */

function charCodeToInt(charCode: number) {
	if (charCode > 96) {
		return charCode - 87;
	} else if (charCode > 64) {
		return charCode - 29;
	}
	return charCode - 48;
}
function unpackBase60(string: string) {
	const parts = string.split('.'),
		whole = parts[0],
		fractional = parts[1] || '';

	let i = 0,
		multiplier = 1,
		num,
		out = 0,
		sign = 1;

	// handle negative numbers
	if (string.charCodeAt(0) === 45) {
		i = 1;
		sign = -1;
	}

	// handle digits before the decimal
	for (i; i < whole.length; i++) {
		num = charCodeToInt(whole.charCodeAt(i));
		out = 60 * out + num;
	}

	// handle digits after the decimal
	for (i = 0; i < fractional.length; i++) {
		multiplier = multiplier / 60;
		num = charCodeToInt(fractional.charCodeAt(i));
		out += num * multiplier;
	}

	return out * sign;
}

function arrayToInt(array: any[]) {
	for (let i = 0; i < array.length; i++) {
		array[i] = unpackBase60(array[i]);
	}
}

function intToUntil(array: any[], length: number) {
	for (let i = 0; i < length; i++) {
		array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000); // minutes to milliseconds
	}

	array[length - 1] = Infinity;
}

function mapIndices(source: any[], indices: any[]) {
	const out: any[] = [];

	for (let i = 0; i < indices.length; i++) {
		out[i] = source[indices[i]];
	}

	return out;
}

function unpack(string: string) {
	const data = string.split('|'),
		offsets = data[2].split(' '),
		indices = data[3].split(''),
		untils = data[4].split(' ');

	arrayToInt(offsets);
	arrayToInt(indices);
	arrayToInt(untils);

	intToUntil(untils, indices.length);

	return {
		name: data[0],
		abbrs: mapIndices(data[1].split(' '), indices),
		offsets: mapIndices(offsets, indices),
		untils: untils,
		population: data[5] as any | 0,
	};
}

/************************************
    Zone object
************************************/

export class Zone {
	name = '';
	abbrs: string[] = [];
	untils: number[] = [];
	offsets: number[] = [];
	population: number[] = [];

	constructor(packedString: string) {
		if (packedString) {
			this._set(unpack(packedString));
		}
	}

	_set(unpacked: any) {
		this.name = unpacked.name;
		this.abbrs = unpacked.abbrs;
		this.untils = unpacked.untils;
		this.offsets = unpacked.offsets;
		this.population = unpacked.population;
	}

	_index(timestamp: number) {
		const target = +timestamp,
			untils = this.untils;

		for (let i = 0; i < untils.length; i++) {
			if (target < untils[i]) {
				return i;
			}
		}
		return undefined;
	}

	parse(timestamp: number) {
		const target = +timestamp,
			offsets = this.offsets,
			untils = this.untils,
			max = untils.length - 1;

		let offset, offsetNext, offsetPrev, i;

		for (i = 0; i < max; i++) {
			offset = offsets[i];
			offsetNext = offsets[i + 1];
			offsetPrev = offsets[i ? i - 1 : i];

			if (offset < offsetNext && tz.moveAmbiguousForward) {
				offset = offsetNext;
			} else if (offset > offsetPrev && tz.moveInvalidForward) {
				offset = offsetPrev;
			}

			if (target < untils[i] - offset * 60000) {
				return offsets[i];
			}
		}

		return offsets[max];
	}

	abbr(mom: number) {
		const index = this._index(mom);
		return index && this.abbrs[index];
	}
}

/** Load Data **/
function normalizeName(name: string) {
	return (name || '').toLowerCase().replace(/\//g, '_');
}

function addZone(packed: any) {
	let i, name, split, normalized;

	if (typeof packed === 'string') {
		packed = [packed];
	}

	for (i = 0; i < packed.length; i++) {
		split = packed[i].split('|');
		name = split[0];
		normalized = normalizeName(name);
		zones[normalized] = packed[i];
		names[normalized] = name;
		addToGuesses(normalized, split[2].split(' '));
	}
}

export function getZone(name: any, caller?: any) {
	name = normalizeName(name);

	let zone = zones[name];
	let link;

	if (zone instanceof Zone) {
		return zone;
	}

	if (typeof zone === 'string') {
		zone = new Zone(zone);
		zones[name] = zone;
		return zone;
	}

	// Pass getZone to prevent recursion more than 1 level deep
	if (
		links[name] &&
		caller !== getZone &&
		(link = getZone(links[name], getZone))
	) {
		zone = zones[name] = new Zone('');
		zone._set(link);
		zone.name = names[name];
		return zone;
	}

	return null;
}

function addLink(aliases: any) {
	let i, alias, normal0, normal1;

	if (typeof aliases === 'string') {
		aliases = [aliases];
	}

	for (i = 0; i < aliases.length; i++) {
		alias = aliases[i].split('|');

		normal0 = normalizeName(alias[0]);
		normal1 = normalizeName(alias[1]);

		links[normal0] = normal1;
		names[normal0] = alias[0];

		links[normal1] = normal0;
		names[normal1] = alias[1];
	}
}

function addCountries(data: any) {
	let i, country_code, country_zones, split;
	if (!data || !data.length) return;
	for (i = 0; i < data.length; i++) {
		split = data[i].split('|');
		country_code = split[0].toUpperCase();
		country_zones = split[1].split(' ');
		countries[country_code] = new Country(country_code, country_zones);
	}
}

function addToGuesses(name: string, offsets: any) {
	let i, offset;
	arrayToInt(offsets);
	for (i = 0; i < offsets.length; i++) {
		offset = offsets[i];
		guesses[offset] = guesses[offset] || {};
		guesses[offset][name] = true;
	}
}

class Country {
	name: any;
	zones: any;
	constructor(country_name: string, zone_names: any) {
		this.name = country_name;
		this.zones = zone_names;
	}
}

export function loadData(data: any) {
	addZone(data.zones);
	addLink(data.links);
	addCountries(data.countries);
	tz.dataVersion = data.version;
}

export function guess(ignoreCache?: boolean) {
	if (!cachedGuess || ignoreCache) {
		cachedGuess = rebuildGuess();
	}
	return cachedGuess;
}

function rebuildGuess() {
	// use Intl API when available and returning valid time zone
	try {
		const intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (intlName && intlName.length > 3) {
			const name = names[normalizeName(intlName)];
			if (name) {
				return name;
			}
		}
	} catch (e) {
		// Intl unavailable, fall back to manual guessing.
	}
}
