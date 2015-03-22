var React = require('react');

var BarMenuLink = React.createClass({
    render() {
        var style = {
            textDecoration: 'none',
        };

        if (this.props.active) {
            style.textDecoration = 'underline';
        }

        return (
            <a className="BarMenuLink" href={this.props.href} style={style}>
                {this.props.children}
            </a>
        );
    }
});

module.exports = BarMenuLink;