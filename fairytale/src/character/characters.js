import React from 'react';

import {getCharacters} from './store';

import Character from './character';

const Characters = React.createClass({
    getDefaultProps() {
        return {
            selected: '',
        };
    },
    isSelected(characterName) {
        const selected = this.props.selected.toLocaleLowerCase();
        const name = characterName.toLocaleLowerCase();

        return (selected === '' || selected === name);
    },
    render() {
        let characters = getCharacters().toJS();

        characters = characters.map((character, i) => {
            if (this.isSelected(character.name)) {
                return <Character key={i} character={character} />;
            }
        });

        const style = {
            paddingTop: 1,
        };

        return (
            <div className="Characters" style={style}>
                {characters}
            </div>
        );
    }
});

export default Characters;
