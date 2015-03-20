var React = require('react');

var AppContent = React.createClass({
    render() {
        return (
            <div className="AppContent">
                {this.props.children}
            </div>
        );
    }
});

module.exports = AppContent;