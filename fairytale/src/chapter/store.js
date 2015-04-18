import * as actions from './actions';
import {bookmarkCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setBookmark:
            const chapter = (data !== null && data.hasOwnProperty('chapter')) ? data.chapter : 0;
            const paragraph = (data !== null && data.hasOwnProperty('paragraph')) ? data.paragraph : 0;

            bookmarkCursor((bookmark) => bookmark.set('chapter', chapter));
            bookmarkCursor((bookmark) => bookmark.set('paragraph', paragraph));
            break;


    }
});

export const getBookmark = () => {
    return {
        chapter: bookmarkCursor().get('chapter'),
        paragraph: bookmarkCursor().get('paragraph'),
    };
};
