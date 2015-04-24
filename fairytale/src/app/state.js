import Immutable from 'immutable';
import State from './../lib/state';

import Loader from './../services/loader';
import Cookies from './../services/cookieService';

import * as bookAction from './../book/actions';
import * as chapterAction from './../chapter/actions';
import * as charactersAction from './../character/actions';
import * as appAction from './actions';

const basicData = Immutable.fromJS({
    app: {
        menuItems: [
            {
                name: 'Pohádka',
                pathName: 'book',
                link: '/',
            },
        ],
    },
    book: {
        title: '',
        subTitle: '',
        cover: '',
        chapters: [
            {
                header: {
                    number: 1,
                    title: '',
                },
                paragraphs: [
                    {
                        id: 1,
                        content: '',
                        isNew: 0,
                        chapter: 1,
                    }
                ],
            },
        ],
        selectedChapter: 1,
        flashMessage: '',
    },
    chapter: {
        bookmark: {
            chapter: 0,
            paragraph: 0,
        },
    },
    characters: {
        data: [
            {
                name: '',
                infos: [
                    {
                        name: '',
                        items: [],
                    },
                ],
            },
        ],
    },
});

const appState = new State(basicData);

export default appState;
export const state = appState;

export const bookCursor = appState.cursor(['book']);
export const chapterCursor = appState.cursor(['chapter']);
export const charactersCursor = appState.cursor(['characters']);
export const appCursor = appState.cursor(['app']);

export const reloadBook = (url) => {
    Loader.loadJson(url, (response) => {
        bookAction.setTitle(response.title);
        bookAction.setSubTitle(response.subTitle);
        bookAction.setCover(response.cover);
        bookAction.setChapters(response.chapters);

        const bookmark = Cookies.get('bookmark');
        chapterAction.setBookmark(bookmark);
    });
};

export const reloadCharacters = (url) => {
    Loader.loadJson(url, (response) => {
        charactersAction.setCharacters(response);
    });
};

export const reloadAppHeader = (url) => {
    Loader.loadJson(url, (response) => {
        appAction.setAppMenuItems(response);
    });
};