var React = require('react');

var Chapter = require('./chapter');

var Page = React.createClass({
    render() {
        var style={
            padding: 20,
            border: '1px solid black',
        };

        return (
            <div className="Page" style={style}>
                <Chapter data={this.props.chapter} />
            </div>
        );
    }
});

module.exports = Page;