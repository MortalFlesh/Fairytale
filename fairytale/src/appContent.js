var React = require('react');

var AppContent = React.createClass({
    render() {
        var style = {
            marginTop: 43,
        };

        return (
            <div className="AppContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = AppContent;