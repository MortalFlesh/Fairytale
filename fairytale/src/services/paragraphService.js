var React = require('react');

var ParagraphBookmark = require('./../chapter/paragraphBookmark');
var ChapterFirstLetter = require('./../chapter/chapterFirstLetter');

var paragraphService = {
    buildContent(rawContent, isBookmarked, isFirstParagraph) {
        if (isFirstParagraph) {
            rawContent = this.makeFirstLetterNice(rawContent);
        }

        var content = this.repairContentStyle(rawContent);

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
    repairContentStyle(rawContent) {
        const chapterFirstLetter = '^';
        const bold = '#';
        const italic = '*';
        const empty = '*';

        return rawContent.split('@').map(part => {
            var firstLetter = part[0];
            var realPart = part.substring(1);

            if (firstLetter === chapterFirstLetter) {
                return <ChapterFirstLetter>{realPart}</ChapterFirstLetter>
            } else if (firstLetter === bold) {
                return <strong>{realPart}</strong>
            } else if (firstLetter === italic) {
                return <em>{realPart}</em>
            } else if (firstLetter === empty || rawContent.length < 2) {
                return <br />
            } else {
                return part;
            }
        });
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