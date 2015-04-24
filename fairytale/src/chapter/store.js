import * as actions from './actions';
import {chapterCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setBookmark:
            const chapter = (data !== null && data.hasOwnProperty('chapter')) ? data.chapter : 0;
            const paragraph = (data !== null && data.hasOwnProperty('paragraph')) ? data.paragraph : 0;

            setToCursor('bookmark', {
                chapter,
                paragraph,
            });
            break;
    }
});

function setToCursor(key, value) {
    chapterCursor((chapter) => chapter.set(key, value));
}

export function getBookmark() {
    return chapterCursor().get('bookmark');
}
