import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AvatarModule as NgxAvatarModule } from 'ngx-avatar';

@NgModule({
	declarations: [AvatarComponent],
	imports: [CommonModule, NgxAvatarModule],
	exports: [AvatarComponent],
})
export class AvatarModule {}
