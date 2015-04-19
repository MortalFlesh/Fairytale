import * as actions from './actions';
import {charactersCursor} from './../app/state';
import dispatcher from './../lib/dispatcher';
import {List, Record} from 'immutable';

const CharacterRecord = new Record({
    name: '',
    infos: [],
});

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch(action) {
        case actions.setCharacters:
            let characters = new List();

            data.forEach((character) => {
                characters = characters.push(new CharacterRecord(character).toMap());
            });

            setCharacters(characters);
            break;
    }
});

function setCharacters(charactersData) {
    charactersCursor((characters) => characters.set('data', charactersData));
}

export const getCharacters = () => charactersCursor().get('data');
