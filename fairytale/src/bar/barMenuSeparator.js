var React = require('react');

var Style = require('./../services/styleService');

var BarMenuSeparator = React.createClass({
    render() {
        var style = {
            display: 'inline-block',
            width: 1,
            background: Style.colors.title,
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