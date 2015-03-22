var React = require('react');

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
            color: '#956722',
            textShadow: '-1px -1px 1px #000, 1px -1px 1px #000,-1px 1px 1px #000,1px 1px 1px #000',
            border: '1px solid black',
            borderRadius: 3,

            textDecoration: 'none',
        };

        if (this.props.active) {
            style.textDecoration = 'underline';
        }

        return (
            <a className="BarMenuItem gradient-background" href={item.link} style={style} onClick={this.clickHandler}>
                {item.name}
            </a>
        );
    }
});

module.exports = BarMenuItem;