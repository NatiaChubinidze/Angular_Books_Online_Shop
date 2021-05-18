import { createAction, props } from '@ngrx/store';

export const fadeNav = createAction(
  '[Navigation Fade Navigation]',
  props<{ fadeSteps: number }>()
);
