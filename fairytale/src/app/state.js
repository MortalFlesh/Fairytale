import Immutable from 'immutable';
import State from './../lib/state';

import Loader from './../services/loader';
import * as cookieStore from './cookieStore';

import * as bookActions from './../book/actions';
import * as chapterActions from './../chapter/actions';
import * as charactersActions from './../character/actions';
import * as appActions from './actions';
import * as ribbonActions from './../ribbon/actions';

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
                image: '',
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
    ribbon: {
        dialogBoxOpen: false,
        ableToRoll: false,
    }
});

const appState = new State(basicData);

export default appState;
export const state = appState;

export const bookCursor = appState.cursor(['book']);
export const chapterCursor = appState.cursor(['chapter']);
export const charactersCursor = appState.cursor(['characters']);
export const appCursor = appState.cursor(['app']);
export const ribbonCursor = appState.cursor(['ribbon']);

export const reloadBook = (url) => {
    Loader.loadJson(url, (response) => {
        bookActions.setTitle(response.title);
        bookActions.setSubTitle(response.subTitle);
        bookActions.setCover(response.cover);
        bookActions.setChapters(response.chapters);

        const bookmark = cookieStore.getBookmark();
        chapterActions.setBookmark(bookmark);

        const diceRolled = cookieStore.getDiceRoll();
        const ableToRoll = (diceRolled === null);
        ribbonActions.setAbleToRoll(ableToRoll);
    });
};

export const reloadCharacters = (url) => {
    Loader.loadJson(url, (response) => {
        charactersActions.setCharacters(response);
    });
};

export const reloadAppHeader = (url) => {
    Loader.loadJson(url, (response) => {
        appActions.setAppMenuItems(response);
    });
};