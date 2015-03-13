var React = require('react');

var ChapterParagraph = React.createClass({
    render() {
        var bgColor = 'white';

        if (this.props.isNew == '1') {
            bgColor = 'green';
        }

        var style = {
            lineHeight: '20px',
            background: bgColor,
        };

        return (
            <p className="ChapterParagraph" style={style}>
                {this.props.children}
            </p>
        );
    }
});

module.exports = ChapterParagraph;