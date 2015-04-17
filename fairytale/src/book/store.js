import * as actions from './actions';
import {bookCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setTitle:
            bookCursor((book) => book.set('title', data));
            break;

        case actions.setSubTitle:
            bookCursor((book) => book.set('subTitle', data));
            break;

        case actions.setCover:
            bookCursor((book) => book.set('cover', data));
            break;
    }
});

export const get = (key) => bookCursor().get(key);
