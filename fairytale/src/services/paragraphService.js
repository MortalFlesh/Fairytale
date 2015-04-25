import React from 'react';

import ParagraphBookmark from './../chapter/paragraphBookmark';
import ChapterFirstLetter from './../chapter/chapterFirstLetter';

const paragraphService = {
    buildContent(rawContent, isBookmarked, isFirstParagraph) {
        if (isFirstParagraph) {
            rawContent = this.makeFirstLetterNice(rawContent);
        }

        let content = this.transformContentStyle(rawContent);

        if (isBookmarked) {
            content = this.addBookmark(content);
        }

        return content;
    },
    makeFirstLetterNice(rawContent) {
        let first = rawContent[0];
        if (first === '@') {
            // first is @ so it's @* or @# -> bold or em, and we need letter
            first = rawContent[2];
        }

        const markedLetter = this.markLetter(first);

        return rawContent.replace(first, markedLetter);
    },
    markLetter(letter) {
        return '@^' + letter + '@';
    },
    transformContentStyle(rawContent) {
        if (rawContent.length < 2) {
            return <br />;
        }

        return rawContent.split('@').map((part) => this.transformPart(part));
    },
    transformPart(part) {
        const chapterFirstLetter = '^';
        const bold = '#';
        const italic = '*';
        const empty = '*';

        const firstLetter = part[0];
        const realPart = part.substring(1);

        switch(firstLetter) {
            case chapterFirstLetter:
                return <ChapterFirstLetter>{realPart}</ChapterFirstLetter>;

            case bold:
                return <strong>{realPart}</strong>;

            case italic:
                return <em>{realPart}</em>;

            case empty:
                return <br />;

            default:
                return part;
        }
    },
    addBookmark(content) {
        const contentWithBookmark = [];
        contentWithBookmark.push(<ParagraphBookmark />);

        content.forEach((item) => {
            contentWithBookmark.push(item);
        });

        return contentWithBookmark;
    },
};

export default paragraphService;