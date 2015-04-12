import React from 'react';

import Character from './character';

import Loader from './../services/loader';

var Characters = React.createClass({
    getInitialState() {
        return {
            characters: [],
            selected: this.props.selected || '',
        }
    },
    loadCharacters() {
        Loader.loadJson(this.props.url, response => {
            this.setState({characters: response});
        });
    },
    componentDidMount() {
        this.loadCharacters();
    },
    isSelected(characterName) {
        var selected = this.state.selected.toLocaleLowerCase();
        var name = characterName.toLocaleLowerCase();

        return (selected === '' || selected === name);
    },
    render() {
        var characters = this.state.characters.map((character, i) => {
            if (this.isSelected(character.name)) {
                return <Character key={i} character={character} />;
            }
        });

        var style = {
            paddingTop: 1,
        };

        return (
            <div className="Characters" style={style}>
                {characters}
            </div>
        );
    }
});

module.exports = Characters;