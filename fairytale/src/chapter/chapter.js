import React from 'react';

import ChapterParagraph from './chapterParagraph';
import ChapterHeader from './../chaptersMenu/chapterHeader';

const Chapter = React.createClass({
    markAsFirstParagraph(i, content) {
        const firstLetter = content[0];
        const isFirstLetterValid = new RegExp(/[a-záÁčČďĎéěÉĚíÍóÓřŘšŠťŤůŮúÚýÝžŽ]/i).test(firstLetter);

        return (i === 0 && isFirstLetterValid);
    },
    render() {
        const chapter = this.props.chapter.toJS();

        let paragraphs = '';

        if (chapter.hasOwnProperty('paragraphs')) {
            paragraphs = chapter.paragraphs.map((paragraph, i) =>
                <ChapterParagraph
                    key={paragraph.id}
                    paragraph={paragraph}
                    isFirstParagraph={this.markAsFirstParagraph(i, paragraph.content)}
                >
                    {paragraph.content}
                </ChapterParagraph>
            );
        }

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                {chapter.hasOwnProperty('header') &&
                    <ChapterHeader number={chapter.header.number} title={chapter.header.title} inChapter={true} />
                }

                {paragraphs}
            </div>
        );
    }
});

export default Chapter;