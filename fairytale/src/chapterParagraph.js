var React = require('react');

var ChapterParagraph = React.createClass({
    render() {
        var bgColor = 'none';

        if (this.props.isNew == '1') {
            bgColor = 'RGBA(0,255,0, 0.15)';
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