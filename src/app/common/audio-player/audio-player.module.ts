import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AudioPlayerComponent } from './audio-player.component';

@NgModule({
	declarations: [AudioPlayerComponent],
	imports: [CommonModule, SharedModule],
	exports: [AudioPlayerComponent],
})
export class AudioPlayerModule {}
