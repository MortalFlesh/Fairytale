var React = require('react');

var ChapterParagraph = require('./chapterParagraph');

var Chapter = React.createClass({
    render() {
        var data = this.props.data;

        var paragraphs = data.paragraphs.map(paragraph =>
            <ChapterParagraph isNew={paragraph.isNew}>
                {paragraph.content}
            </ChapterParagraph>
        );

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                <h3 style={{textAlign: 'center'}}>
                    <strong>{data.chapter.number}.</strong>{' ' + data.chapter.title}
                </h3>

                {paragraphs}
            </div>
        );
    }
});

module.exports = Chapter;