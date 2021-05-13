import {createReducer, on} from '@ngrx/store';
import {showNav,hideNav} from './nav-visibility.actions';

export const initialState = true;

const _navReducer = createReducer(initialState,
    on(showNav, (state)=>true),
    on(hideNav, (state)=>false));

    export function navReducer(state, action){
        return _navReducer(state, action);
    }
