var React = require('react');

var BarMenuItem = React.createClass({
    render() {
        var item = this.props.item;

        var style = {
            display: 'inline-block',
            padding: '0 5px',
        };

        return (
            <div className="BarMenuItem" style={style}>
                [bar menu item - {this.props.active ? 'active' : 'off'}]
            </div>
        );
    }
});

module.exports = BarMenuItem;