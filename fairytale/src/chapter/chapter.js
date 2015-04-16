import React from 'react';

import ChapterParagraph from './chapterParagraph';
import ChapterHeader from './chapterHeader';

import CookieService from './../services/cookieService';

const Chapter = React.createClass({
    onBookmarkedHandler() {
        this.forceUpdate();
    },
    markAsFirstParagraph(i, content) {
        const firstLetter = content[0];
        const isFirstLetterValid = new RegExp(/[a-záÁčČďĎéěÉĚíÍóÓřŘšŠťŤůŮúÚýÝžŽ]/i).test(firstLetter);

        return (i === 0 && isFirstLetterValid);
    },
    render() {
        const chapter = this.props.chapter;

        const bookmark = CookieService.get('bookmark');
        let bookmarkedId = 0;

        if (bookmark !== null) {
            bookmarkedId = bookmark.paragraph;
        }

        let i = 0;

        const paragraphs = chapter.paragraphs.map(paragraph =>
            <ChapterParagraph
                key={paragraph.id}
                paragraph={paragraph}
                bookmark={bookmarkedId == paragraph.id}
                onBookmarked={this.onBookmarkedHandler}
                isFirstParagraph={this.markAsFirstParagraph(i++, paragraph.content)}
            >
                {paragraph.content}
            </ChapterParagraph>
        );

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                <ChapterHeader number={chapter.header.number} title={chapter.header.title} inChapter={true} />

                {paragraphs}
            </div>
        );
    }
});

export default Chapter;