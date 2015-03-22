var React = require('react');

var BarMenuLink = require('./barMenuLink');

var BarMenuItem = React.createClass({
    render() {
        var item = this.props.item;

        var style = {
            display: 'inline-block',
            padding: '0 5px',
            lineHeight: '28px',
        };

        return (
            <div className="BarMenuItem" style={style}>
                <BarMenuLink active={this.props.active} href={item.link}>
                    {item.name}
                </BarMenuLink>
            </div>
        );
    }
});

module.exports = BarMenuItem;