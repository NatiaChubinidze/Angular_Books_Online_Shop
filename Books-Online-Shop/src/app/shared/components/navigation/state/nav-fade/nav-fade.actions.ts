import {createAction, props} from '@ngrx/store';
import {IFadeNav} from './fadenav.interface';

export const fadeNav = createAction('[Navigation Fade Navigation]', props<{fadeSteps:number}>());    
