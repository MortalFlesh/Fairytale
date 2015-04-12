import React from 'react';

var BarContent = React.createClass({
    render() {
        var style = {
            padding: '8px 0',
        };

        return (
            <div className="BarContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = BarContent;