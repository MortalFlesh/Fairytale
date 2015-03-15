var React = require('react');

var ResponsiveBox = React.createClass({
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ResponsiveBox;