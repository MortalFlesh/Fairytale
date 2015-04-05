var React = require('react');

var Cookie = require('./../services/cookieService');
var Style = require('./../services/styleService');
var Json = require('./../services/jsonService');

var RibbonLink = require('./ribbonLink');

var DiceRibbon = React.createClass({
    getInitialState() {
        return {
            ableToRoll: false,
        };
    },
    componentDidMount() {
        this.checkRollAvailability();
        setInterval(this.checkRollAvailability, this.props.refreshRate);
    },
    checkRollAvailability() {
        var isAbleToRoll = this.isAbleToRollADice();
        if (isAbleToRoll !== this.state.ableToRoll) {
            this.setState({ableToRoll: isAbleToRoll});
        }
    },
    isAbleToRollADice() {
        var diceRolled = Cookie.get('dice-rolled');
        return (diceRolled === null);
    },
    onClickHandler() {
        const diceResult = prompt('Zadej výsledek hodu:', '0');
        var roll = parseInt(diceResult, 10);

        if (roll >= 1 && roll <= 6) {
            const hours = 20;
            Cookie.set('dice-rolled', {roll: roll}, hours);

            this.checkRollAvailability();
            this.props.onClick(roll);
        }
    },
    render() {
        var content = [];

        var style = Json.extendsJson(Style.ribbonCommonStyle, {
            backgroundImage: 'url("./fairytale/images/roll-a-dice-inactive.png")',
            width: 100,
        });

        if (this.state.ableToRoll) {
            style.backgroundImage = 'url("./fairytale/images/roll-a-dice.png")';

            content.push(<RibbonLink title="Hodit kostkou" onClickHandler={this.onClickHandler} />);
        }

        return (
            <div className="DiceRibbon" style={style}>
                {content}
            </div>
        );
    }
});

module.exports = DiceRibbon;