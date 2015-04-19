import dispatcher from './../lib/dispatcher';

export function setCharacters(characters: array) {
    dispatcher.dispatch(setCharacters, characters);
}
