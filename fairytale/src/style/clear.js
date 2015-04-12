import React from 'react';

var Clear = React.createClass({
    render() {
        var style = {
            clear: 'both',
            height: 1,
        };

        return (
            <br className="Clear" style={style} />
        );
    }
});

module.exports = Clear;