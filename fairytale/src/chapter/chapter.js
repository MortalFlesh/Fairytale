var React = require('react');

var ChapterParagraph = require('./chapterParagraph');
var ChapterHeader = require('./chapterHeader');

var Chapter = React.createClass({
    render() {
        var chapter = this.props.chapter;

        var paragraphs = chapter.paragraphs.map(paragraph =>
            <ChapterParagraph isNew={paragraph.isNew}>
                {paragraph.content}
            </ChapterParagraph>
        );

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                <ChapterHeader number={chapter.header.number} title={chapter.header.title} />

                {paragraphs}
            </div>
        );
    }
});

module.exports = Chapter;