var React = require('react');

var BarMenu = React.createClass({
    render() {
        var style = {
            float: 'right',
        };

        return (
            <div className="BarMenu" style={style}>
                ...header (active: {this.props.active})...
            </div>
        );
    }
});

module.exports = BarMenu;