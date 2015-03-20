var React = require('react');

var AppHeader = React.createClass({
    render() {
        return (
            <div className="AppHeader">
                ...header (active: {this.props.active})...
            </div>
        );
    }
});

module.exports = AppHeader;