import React from 'react';

import Cookie from './../services/cookieService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';
import DiceIcon from './diceIcon';

import DialogBox from './../dialogBox/dialogBox';

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
        const isAbleToRoll = this.isAbleToRollADice();
        if (isAbleToRoll !== this.state.ableToRoll) {
            this.setState({ableToRoll: isAbleToRoll});
        }
    },
    isAbleToRollADice() {
        const diceRolled = Cookie.get('dice-rolled');
        return (diceRolled === null);
    },
    dialogBoxOpen() {
        this.setState({dialogBoxOpen: true});
    },
    dialogBoxClose() {
        this.setState({dialogBoxOpen: false});
    },
    roll(diceResult) {
        this.dialogBoxClose();

        const roll = parseInt(diceResult, 10);

        if (roll >= 1 && roll <= 6) {
            const hours = 20;
            Cookie.set('dice-rolled', {roll: roll}, hours);

            this.checkRollAvailability();
            this.props.onClick(roll);
        }
    },
    render() {
        let style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/dice-ribbon-inactive.png")',
        });

        const dicesContainerStyle = {
            width: 160,
            padding: '0 0 10px 10px',
        };

        let dices = [];

        if (this.state.ableToRoll) {
            style.backgroundImage = 'url("./fairytale/images/dice-ribbon.png")';

            dices = [1, 2, 3, 4, 5, 6].map(number =>
                <DiceIcon key={number} onClick={this.roll} number={number} />
            );
        }

        return (
            <div className="DiceRibbon" style={style}>
                {this.state.ableToRoll &&
                    <RibbonLink title="Hodit kostkou" onClick={this.dialogBoxOpen} />
                }

                {this.state.ableToRoll &&
                    <DialogBox visible={this.state.dialogBoxOpen} onClose={this.dialogBoxClose}>
                        <strong>Zadej výsledek hodu:</strong>

                        <div style={dicesContainerStyle}>
                            {dices}
                        </div>
                    </DialogBox>
                }
            </div>
        );
    }
});

module.exports = DiceRibbon;