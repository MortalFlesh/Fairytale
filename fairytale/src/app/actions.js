import dispatcher from './../lib/dispatcher';

export function setAppMenuItems(items: array) {
    dispatcher.dispatch(setAppMenuItems, items);
}
