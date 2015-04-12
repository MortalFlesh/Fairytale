import React from 'react';

import Json from './../services/jsonService';

var EmptyRibbonSpace = React.createClass({
    getDefaultProps() {
        return {
            baseStyle: {},
            width: 400,
        };
    },
    render() {
        var style = Json.extendsJson(this.props.baseStyle, {
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