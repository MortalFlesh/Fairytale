var React = require('react');

var BarMenuItem = React.createClass({
    getInitialState() {
        return {
            active: this.props.active,
        }
    },
    clickHandler() {
        this.setState({active: true});
    },
    render() {
        var style = {
            display: 'inline-block',
            padding: '0 5px',
            lineHeight: '28px',

            textDecoration: 'none',
        };

        if (this.state.active) {
            style.textDecoration = 'underline';
        }

        return (
            <a className="BarMenuItem" href={this.props.href} style={style} onClick={this.clickHandler}>
                {this.props.children}
            </a>
        );
    }
});

module.exports = BarMenuItem;