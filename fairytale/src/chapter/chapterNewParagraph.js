var React = require('react');

var ChapterNewParagraph = React.createClass({
    render() {
        var style = {
            color: 'green',
            float: 'right',
            fontSize: 12,
            margin: '-5px -10px',
        };

        return (
            <div className="ChapterNewParagraph" style={style}>
                {this.props.count}
            </div>
        );
    }
});

module.exports = ChapterNewParagraph;