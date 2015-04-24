import dispatcher from './../lib/dispatcher';

export function setDialogBoxOpen(isOpen: boolean) {
    dispatcher.dispatch(setDialogBoxOpen, isOpen);
}


