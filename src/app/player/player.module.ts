import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [AudioPlayerComponent],
	imports: [CommonModule, SharedModule],
	exports: [AudioPlayerComponent],
})
export class PlayerModule {}
