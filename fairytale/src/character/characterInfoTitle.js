import React from 'react';

var CharacterInfoTitle = React.createClass({
    translateTitle(originalName) {
        switch(originalName) {
            case 'role': return 'Role';
            case 'nature': return 'Povaha';
            case 'family': return 'Rodina';
            case 'property': return 'Vlastnictví';
            case 'other': return 'Ostatní';
            case 'appearance': return 'Vzhled';
            case 'skill': return 'Schopnosti';
            case 'magical_skill': return 'Kouzelné schopnosti';
            case 'fighting_skill': return 'Bojové schopnosti';
            case 'weapon': return 'Zbraň';
            case 'condition': return 'Stav';
            case 'rank': return 'Hodnost/Povolání';
            case 'race': return 'Rasa';
            case 'talent': return 'Talent';
            case 'relation': return 'Vztah/vazba';
            default: return originalName;
        }
    },
    render() {
        var style = {
            marginBottom: 5,
        };

        return (
            <h3 style={style}>
                {this.translateTitle(this.props.name)}:
            </h3>
        );
    }
});

module.exports = CharacterInfoTitle;