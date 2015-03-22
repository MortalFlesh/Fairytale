var React = require('react');

var AppHeader = React.createClass({
    render() {
        var style = {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            height: 42,
            width: '100%',
            borderBottom: '1px solid black',
            backgroundColor: '#fdd9ae',
            zIndex: 1000,
        };

        return (
            <div className="AppHeader gradient-background" style={style}>
                ...header (active: {this.props.active})...
            </div>
        );
    }
});

module.exports = AppHeader;