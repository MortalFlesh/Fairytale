var React = require('react');

var Cookie = require('./../services/cookieService');
var Style = require('./../services/styleService');
var Json = require('./../services/jsonService');

var RibbonLink = require('./ribbonLink');

var DiceRibbon = React.createClass({
    onClickHandler() {
        console.log('onClick');
        var x = prompt('Zadej výsledek hodu:', '0');
        console.log('vysledek: ', x);
    },
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
                <RibbonLink title="Hodit kostkou" onClickHandler={this.onClickHandler} />
            </div>
        );
    }
});

module.exports = DiceRibbon;