import React from 'react';

import DiceRibbon from './../ribbon/diceRibbon';
import Bookmark from "./../ribbon/bookmark";

var Ribbons = React.createClass({
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
            </div>
        );
    }
});

module.exports = Ribbons;