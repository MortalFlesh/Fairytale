import Immutable from 'immutable';
import State from './../lib/state';

import Loader from './../services/loader';

const basicData = Immutable.fromJS({
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
                paragraphs: [],
            },
        ],
    },
});

const appState = new State(basicData);

export default appState;
export const state = appState;

export const bookCursor = appState.cursor(['book']);

export const reloadState = (url, key) => {
    Loader.loadJson(url, (response) => {
        if (response.hasOwnProperty(key)) {
            response = response[key];
        }

        let currentState = appState.get();

        currentState[key] = response;
        appState.load(currentState);
    });
};
