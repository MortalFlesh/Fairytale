var React = require('react');

var CharacterInfo = require('./characterInfo');
var Clear = require('./clear');

var Character = React.createClass({
    render() {
        var character = this.props.character;
        var infos = character.infos.map(info => <CharacterInfo info={info} />);

        var style = {
            padding: '50px 50px 20px 50px',
            border: '1px solid black',
            margin: 20,
            borderRadius: 15,
            backgroundColor: '#fddbad',
        };

        var titleStyle = {
            marginTop: 0,
            color: '#956722',
            fontSize: 40,
            textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
        };

        return (
            <div className="Character" style={style}>
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

module.exports = Character;