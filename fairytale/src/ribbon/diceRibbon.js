import React from 'react';

import Cookie from './../services/cookieService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';

import DialogBox from './../dialogBox/dialogBox'

var DiceRibbon = React.createClass({
    getDefaultProps() {
        return {
            baseStyle: {},
        };
    },
    getInitialState() {
        return {
            ableToRoll: false,
            dialogBoxOpen: false,
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
    dialogBoxOpen() {
        this.setState({dialogBoxOpen: true});
    },
    dialogBoxClose() {
        this.setState({dialogBoxOpen: false});
    },
    roll1() {
        this.roll(1);
    },
    roll2() {
        this.roll(2);
    },
    roll3() {
        this.roll(3);
    },
    roll4() {
        this.roll(4);
    },
    roll5() {
        this.roll(5);
    },
    roll6() {
        this.roll(6);
    },
    roll(diceResult) {
        this.dialogBoxClose();

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

        var style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/dice-ribbon-inactive.png")',
        });

        if (this.state.ableToRoll) {
            style.backgroundImage = 'url("./fairytale/images/dice-ribbon.png")';

            content.push(<RibbonLink title="Hodit kostkou" onClick={this.dialogBoxOpen} />);
        }

        return (
            <div className="DiceRibbon" style={style}>
                {content}

                <DialogBox visible={this.state.dialogBoxOpen} onClose={this.dialogBoxClose}>
                    <strong>Zadej výsledek hodu:</strong>

                    <button onClick={this.roll1}>1</button>
                    <button onClick={this.roll2}>2</button>
                    <button onClick={this.roll3}>3</button>
                    <button onClick={this.roll4}>4</button>
                    <button onClick={this.roll5}>5</button>
                    <button onClick={this.roll6}>6</button>
                </DialogBox>
            </div>
        );
    }
});

module.exports = DiceRibbon;