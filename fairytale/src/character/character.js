import React from 'react';
import {addons} from 'react/addons';

import CharacterInfo from './characterInfo';
import Clear from './../style/clear';

import Style from './../services/styleService';

const Character = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        character: React.PropTypes.object.isRequired,
    },
    render() {
        const character = this.props.character;
        const infos = character.infos.map((info, i) => <CharacterInfo key={i} info={info} />);

        const style = {
            character: {
                padding: '50px 50px 30px 50px',
                border: '1px solid black',
                margin: '20px auto',
                borderRadius: 15,
                backgroundColor: Style.colors.titleActive,
            },
            title: {
                marginTop: 0,
                color: Style.colors.title,
                fontSize: 40,
                textShadow: Style.shadow.title,
            },
        };

        return (
            <div className="Character gradient-background" style={style.character}>
                <h2 style={style.title}>
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