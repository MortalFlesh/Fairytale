var React = require('react');

var ChapterParagraph = require('./chapterParagraph');
var ChapterHeader = require('./chapterHeader');

var CookieService = require('./../services/cookieService');

var Chapter = React.createClass({
    onBookmarkedHandler() {
        this.setState();
    },
    render() {
        var chapter = this.props.chapter;

        var bookmark = CookieService.get('bookmark');
        var bookmarkedId = 0;

        if (bookmark !== null) {
            bookmarkedId = bookmark.paragraph;
        }

        var paragraphs = chapter.paragraphs.map(paragraph =>
            <ChapterParagraph
                key={paragraph.id}
                paragraph={paragraph}
                bookmark={bookmarkedId == paragraph.id}
                onBookmarked={this.onBookmarkedHandler}
            >
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