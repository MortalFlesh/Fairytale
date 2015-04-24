import React from 'react';

import DiceRibbon from './../ribbon/diceRibbon';
import Bookmark from "./../ribbon/bookmark";

const Ribbons = React.createClass({
    propTypes: {
        onBookmarkClick: React.PropTypes.func.isRequired,
        onDiceRibbonClick: React.PropTypes.func.isRequired,
    },
    render() {
        const style = {
            ribbons: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                float: 'left',
                width: 740,
            },
            ribbonBase: {
                width: 100,
                height: 108,
                margin: '-7px 25px',
                textAlign: 'center',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            },
        };

        return (
            <div className="Ribbons" style={style.ribbons}>
                <Bookmark baseStyle={style.ribbonBase} onClick={this.props.onBookmarkClick} />
                <DiceRibbon
                    baseStyle={style.ribbonBase}
                    onClick={this.props.onDiceRibbonClick}
                />
            </div>
        );
    }
});

export default Ribbons;