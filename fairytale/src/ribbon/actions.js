import dispatcher from './../lib/dispatcher';

export function setDialogBoxOpen(isOpen: boolean) {
    dispatcher.dispatch(setDialogBoxOpen, isOpen);
}

export function setAbleToRoll(ableToRoll: boolean) {
    dispatcher.dispatch(setAbleToRoll, ableToRoll);
}

export function setDiceRoll(roll: number) {
    dispatcher.dispatch(setDiceRoll, roll);
}
