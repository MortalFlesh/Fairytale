var React = require('react');

var BarMenuSeparator = React.createClass({
    render() {
        var style = {
            display: 'inline-block',
            width: 1,
            background: '#956722',
            margin: '0 10px',
            lineHeight: '28px',
            height: 28,
            verticalAlign: 'top',
        };

        return (
            <div className="BarMenuSeparator" style={style} />
        );
    }
});

module.exports = BarMenuSeparator;