import { createReducer, on } from '@ngrx/store';
import { IFadeNav } from './fadenav.interface';
import { fadeNav } from './nav-fade.actions';

export const initialState: IFadeNav = {
  fadeSteps: 0,
};
const _fadeNavReducer = createReducer(
  initialState,
  on(
    fadeNav,
    (state, action): IFadeNav => {
      return {
        ...state,
        fadeSteps: action.fadeSteps,
      };
    }
  )
);

export function fadeNavReducer(state, action) {
  return _fadeNavReducer(state, action);
}
