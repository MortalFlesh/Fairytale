var React = require('react');

var ChapterFirstLetter = React.createClass({
    render() {
        var style = {
            color: 'red',
        };

        return (
            <span className="ChapterFirstLetter" style={style}>
                {this.props.children}
            </span>
        );
    }
});

module.exports = ChapterFirstLetter;