import React from 'react';

import CharacterInfo from './characterInfo';
import Clear from './../style/clear';

import Style from './../services/styleService';

var Character = React.createClass({
    render() {
        var character = this.props.character;
        var infos = character.infos.map((info, i) => <CharacterInfo key={i} info={info} />);

        var style = {
            padding: '50px 50px 30px 50px',
            border: '1px solid black',
            margin: '20px auto',
            borderRadius: 15,
            backgroundColor: Style.colors.titleActive,
        };

        var titleStyle = {
            marginTop: 0,
            color: Style.colors.title,
            fontSize: 40,
            textShadow: Style.shadow.title,
        };

        return (
            <div className="Character gradient-background" style={style}>
                <h2 style={titleStyle}>
                    {character.name}
                </h2>
                <div className="CharacterInfos">
                    {infos}
                    <Clear/>
                </div>
            </div>
        );
    }
});

export default Character;