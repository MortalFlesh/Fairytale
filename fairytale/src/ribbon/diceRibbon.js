import React from 'react';
import {setDialogBoxOpen, setAbleToRoll, setDiceRoll} from './actions';
import {getDialogBoxOpen, getAbleToRoll} from './store';

import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';
import DiceIcon from './diceIcon';
import DialogBox from './../dialogBox/dialogBox';

const DiceRibbon = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        baseStyle: React.PropTypes.object.isRequired,
    },
    openDialogBox() {
        setDialogBoxOpen(true);
    },
    closeDialogBox() {
        setDialogBoxOpen(false);
    },
    roll(diceResult) {
        this.closeDialogBox();

        const roll = parseInt(diceResult, 10);

        if (roll >= 1 && roll <= 6) {
            setAbleToRoll(false);
            setDiceRoll(roll);

            this.props.onClick(roll);
        }
    },
    render() {
        const ableToRoll = getAbleToRoll();
        const dialogBoxOpen = getDialogBoxOpen();
        const imageSuffix = ableToRoll ? '' : '-inactive';

        const style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/dice-ribbon' + imageSuffix + '.png")',
        });

        const dicesContainerStyle = {
            width: 160,
            padding: '0 0 10px 10px',
        };

        let dices = [];
        if (ableToRoll) {
            dices = [1, 2, 3, 4, 5, 6].map((number) =>
                <DiceIcon key={number} onClick={this.roll} number={number} />
            );
        }

        return (
            <div className="DiceRibbon" style={style}>
                {ableToRoll &&
                    <RibbonLink title="Hodit kostkou" onClick={this.openDialogBox} />
                }

                {ableToRoll &&
                    <DialogBox visible={dialogBoxOpen} onClose={this.closeDialogBox}>
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

export default DiceRibbon;
