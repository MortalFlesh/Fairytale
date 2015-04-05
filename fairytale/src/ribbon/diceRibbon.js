var React = require('react');

var Cookie = require('./../services/cookieService');
var Style = require('./../services/styleService');
var Json = require('./../services/jsonService');

var DiceRibbon = React.createClass({
    render() {
        var diceRolled = Cookie.get('dice-rolled');

        var style = Json.extendsJson(Style.ribbonCommonStyle, {
            backgroundImage: 'url("./fairytale/images/roll-a-dice.png")',
            width: 100,
        });

        if (diceRolled !== null) {

        }

        return (
            <div className="DiceRibbon" style={style}>

            </div>
        );
    }
});

module.exports = DiceRibbon;