var React = require('react');

var Style = require('./../services/styleService');

var BarMenuItem = React.createClass({
    clickHandler() {
        this.props.onClick(this.props.item.pathName);
    },
    render() {
        var item = this.props.item;

        var style = {
            display: 'inline-block',
            padding: '0 15px',
            lineHeight: '26px',
            color: Style.colors.title,
            textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
            border: '1px solid black',
            borderRadius: 3,
            verticalAlign: 'top',

            textDecoration: 'none',
        };

        if (this.props.active) {
            style.textDecoration = 'underline';
            style.color = Style.colors.titleActive;
        }

        return (
            <a className="BarMenuItem gradient-background" href={item.link} style={style} onClick={this.clickHandler}>
                {item.name}
            </a>
        );
    }
});

module.exports = BarMenuItem;