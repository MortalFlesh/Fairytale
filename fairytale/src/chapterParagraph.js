var React = require('react');

var ChapterParagraph = React.createClass({
    repairContent(rawContent) {
        return rawContent.split('@').map(part =>
            part[0] === '#'
                ? <strong>{part.substring(1)}</strong>
                : part[0] === '*'
                    ? <em>{part.substring(1)}</em>
                    : part
        );
    },
    render() {
        var bgColor = 'none';

        if (this.props.isNew == '1') {
            bgColor = 'RGBA(0,255,0, 0.15)';
        }

        var style = {
            background: bgColor,
            lineHeight: '20px',
            textIndent: 30,
            textAlign: 'justify',
        };

        var content = this.repairContent(this.props.children);

        return (
            <p className="ChapterParagraph" style={style}>
                {content}
            </p>
        );
    }
});

module.exports = ChapterParagraph;