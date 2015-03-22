var React = require('react');

var AppHeaderContent = React.createClass({
    render() {
        var style = {
            padding: '8px 0',
        };

        return (
            <div className="AppHeaderContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = AppHeaderContent;