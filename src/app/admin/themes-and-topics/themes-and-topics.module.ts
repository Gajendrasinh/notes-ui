import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemesAndTopicsComponent } from './themes-and-topics.component';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers/themes-and-topics.reducer';
import { ThemesAndTopicsEffects } from './store/effects/themes-and-topics.effects';
import { EffectsModule } from '@ngrx/effects';
const routes: Routes = [{ path: '', component: ThemesAndTopicsComponent }];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature(
			fromStore.themesAndTopicsFeatureKey,
			fromStore.reducers
		),
		EffectsModule.forFeature([ThemesAndTopicsEffects]),
	],
})
export class ThemesAndTopicsModule {}
