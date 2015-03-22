var React = require('react');

var BarMenuItem = React.createClass({
    clickHandler() {
        this.props.onClick(this.props.item.pathName);
    },
    render() {
        var item = this.props.item;

        var style = {
            display: 'inline-block',
            padding: '0 5px',
            lineHeight: '28px',

            textDecoration: 'none',
        };

        if (this.props.active) {
            style.textDecoration = 'underline';
        }

        return (
            <a className="BarMenuItem" href={item.link} style={style} onClick={this.clickHandler}>
                {item.name}
            </a>
        );
    }
});

module.exports = BarMenuItem;