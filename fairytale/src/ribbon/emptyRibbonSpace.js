import React from 'react';

import Style from './../services/styleService';
import Json from './../services/jsonService';

var EmptyRibbonSpace = React.createClass({
    getDefaultProps() {
        return {
            width: 400,
        };
    },
    render() {
        var style = Json.extendsJson(Style.ribbonCommonStyle, {
            width: this.props.width,
            height: 1,
            margin: 0,
        });

        return (
            <div className="EmptyRibbonSpace" style={style} />
        );
    }
});

module.exports = EmptyRibbonSpace;