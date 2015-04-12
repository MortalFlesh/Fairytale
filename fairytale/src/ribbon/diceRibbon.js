import React from 'react';

import Cookie from './../services/cookieService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';

var DiceRibbon = React.createClass({
    getDefaultProps() {
        return {
            baseStyle: {},
        };
    },
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
        this.props.dialogBox(diceResult => {
            var roll = parseInt(diceResult, 10);

            if (roll >= 1 && roll <= 6) {
                const hours = 20;
                Cookie.set('dice-rolled', {roll: roll}, hours);

                this.checkRollAvailability();
                this.props.onClick(roll);
            }
        });
    },
    render() {
        var content = [];

        var style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/dice-ribbon-inactive.png")',
        });

        if (this.state.ableToRoll) {
            style.backgroundImage = 'url("./fairytale/images/dice-ribbon.png")';

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