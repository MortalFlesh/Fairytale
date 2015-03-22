var React = require('react');

var Content = React.createClass({
    render() {
        var style = {
            maxWidth: 800,
            margin: '0 auto',
        };

        return (
            <div className="Content" style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Content;