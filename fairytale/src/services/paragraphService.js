var React = require('react');

var ParagraphBookmark = require('./../chapter/paragraphBookmark');

var paragraphService = {
    buildContent(rawContent, isBookmarked) {
        var content = this.repairContentStyle(rawContent);

        if (isBookmarked) {
            content = this.addBookmark(content);
        }

        return content;
    },
    repairContentStyle(rawContent) {
        return rawContent.split('@').map(part => {
            var firstLetter = part[0];

            if (firstLetter === '#') {
                return <strong>{part.substring(1)}</strong>
            } else if (firstLetter === '*') {
                return <em>{part.substring(1)}</em>
            } else if (firstLetter === '~' || rawContent.length < 2) {
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