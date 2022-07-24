import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeekBarComponent } from './seek-bar/seek-bar.component';
import { SliderModule } from '../slider/slider.module';

@NgModule({
	declarations: [VideoPlayerComponent, SeekBarComponent],
	imports: [CommonModule, SharedModule, SliderModule],
	exports: [VideoPlayerComponent],
})
export class VideoPlayerModule {}
