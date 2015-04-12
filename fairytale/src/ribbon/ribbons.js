import React from 'react';

import DialogBox from './../dialogBox/dialogBox'

import DiceRibbon from './../ribbon/diceRibbon';
import Bookmark from "./../ribbon/bookmark";

var Ribbons = React.createClass({
    getInitialState() {
        return {
            dialogBoxOpen: false,
        };
    },
    dialogBox(callback) {
        //var x = prompt(title);
        //callback(x);

        this.setState({dialogBoxOpen: true});
    },
    dialogBoxClose() {
        this.setState({dialogBoxOpen: false});
    },
    render() {
        var style = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            float: 'left',
            width: 740,
        };

        var ribbonBaseStyle = {
            width: 100,
            height: 108,
            margin: '-7px 25px',
            textAlign: 'center',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
        };

        return (
            <div className="Ribbons" style={style}>
                <Bookmark baseStyle={ribbonBaseStyle} onClick={this.props.onBookmarkClick} />
                <DiceRibbon
                    baseStyle={ribbonBaseStyle}
                    dialogBox={this.dialogBox}
                    onClick={this.props.onDiceRibbonClick}
                    refreshRate={this.props.refreshRate}
                />

                <DialogBox visible={this.state.dialogBoxOpen} onClose={this.dialogBoxClose}>
                    <strong>Zadej výsledek hodu:</strong>
                </DialogBox>
            </div>
        );
    }
});

module.exports = Ribbons;