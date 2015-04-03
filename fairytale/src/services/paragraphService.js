var React = require('react');

var ParagraphBookmark = require('./../chapter/paragraphBookmark');
var ChapterFirstLetter = require('./../chapter/chapterFirstLetter');

var paragraphService = {
    buildContent(rawContent, isBookmarked, isFirstParagraph) {
        if (isFirstParagraph) {
            rawContent = this.makeFirstLetterNice(rawContent);
        }

        var content = this.transformContentStyle(rawContent);

        if (isBookmarked) {
            content = this.addBookmark(content);
        }

        return content;
    },
    makeFirstLetterNice(rawContent) {
        var first = rawContent[0];
        if (first === '@') {
            // first is @ so it's @* or @# -> bold or em, and we need letter
            first = rawContent[2];
        }

        var markedLetter = this.markLetter(first);

        return rawContent.replace(first, markedLetter);
    },
    markLetter(letter) {
        return '@^' + letter + '@';
    },
    transformContentStyle(rawContent) {
        if (rawContent.length < 2) {
            return <br />;
        }

        return rawContent.split('@').map(part => this.transformPart(part));
    },
    transformPart(part) {
        const chapterFirstLetter = '^';
        const bold = '#';
        const italic = '*';
        const empty = '*';

        var transformed = part;
        var firstLetter = part[0];
        var realPart = part.substring(1);

        switch(firstLetter) {
            case chapterFirstLetter:
                transformed = <ChapterFirstLetter>{realPart}</ChapterFirstLetter>;
                break;
            case bold:
                transformed = <strong>{realPart}</strong>;
                break;
            case italic:
                transformed = <em>{realPart}</em>;
                break;
            case empty:
                transformed = <br />;
                break;
        }

        return transformed;
    },
    addBookmark(content) {
        var contentWithBookmark = [];
        contentWithBookmark.push(<ParagraphBookmark />);

        for (var i in content) {
            contentWithBookmark.push(content[i]);
        }

        return contentWithBookmark;
    },
};

module.exports = paragraphService;