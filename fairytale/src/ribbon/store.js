import * as actions from './actions';
import {ribbonCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setDialogBoxOpen:
            setToCursor('dialogBoxOpen', data);
            break;
    }
});

function setToCursor(key, value) {
    ribbonCursor((ribbon) => ribbon.set(key, value));
}

export function getDialogBoxOpen() {
    return ribbonCursor().get('dialogBoxOpen');
}
