import React from 'react';

import {getCharacters} from './store';

import Character from './character';

const Characters = React.createClass({
    propTypes: {
        selected: React.PropTypes.string,
    },
    getDefaultProps() {
        return {
            selected: '',
        };
    },
    isSelected(characterName) {
        const selected = this.props.selected.toLocaleLowerCase();
        const name = characterName.toLocaleLowerCase();

        return (!selected || selected === name);
    },
    render() {
        const characters = getCharacters()
            .filter((character) => this.isSelected(character.get('name')))
            .map((character, i) => <Character key={i} character={character.toJS()} />);

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
