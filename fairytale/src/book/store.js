import * as actions from './actions';
import {bookCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';
import {List, Record} from 'immutable';

const ChapterRecord = new Record({
    header: {},
    image: '',
    paragraphs: [],
});

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setTitle:
            setToCursor('title', data);
            break;

        case actions.setSubTitle:
            setToCursor('subTitle', data);
            break;

        case actions.setCover:
            setToCursor('cover', data);
            break;

        case actions.setChapters:
            let chapters = new List();

            data.forEach((chapter) => {
                chapters = chapters.push(new ChapterRecord(chapter).toMap());
            });

            setToCursor('chapters', chapters);
            break;
    }
});

function setToCursor(key, value) {
    bookCursor((book) => book.set(key, value));
}

export const get = (key) => bookCursor().get(key);
