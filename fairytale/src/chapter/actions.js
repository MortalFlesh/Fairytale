import dispatcher from './../lib/dispatcher';

export function setBookmark(bookmark: object) {
    dispatcher.dispatch(setBookmark, bookmark);
}
