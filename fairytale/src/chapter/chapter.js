import React from 'react';
import immutable from 'immutable';

import ChapterParagraph from './chapterParagraph';
import ChapterTitle from './chapterTitle';
import ChapterImage from './chapterImage';

const Chapter = React.createClass({
    propTypes: {
        chapter: React.PropTypes.instanceOf(immutable.Map).isRequired,
    },
    shouldMarkAsFirstParagraph(i, content) {
        const firstLetter = content[0];
        const isFirstLetterValid = new RegExp(/[a-záÁčČďĎéěÉĚíÍóÓřŘšŠťŤůŮúÚýÝžŽ]/i).test(firstLetter);

        return (i === 0 && isFirstLetterValid);
    },
    getChapterNumber(chapter) {
        return parseInt(chapter.header.number, 10);
    },
    render() {
        const chapter = this.props.chapter.toJS();
        const chapterNumber = this.getChapterNumber(chapter);

        let paragraphs = '';

        if (chapter.hasOwnProperty('paragraphs')) {
            paragraphs = chapter.paragraphs.map((paragraph, i) =>
                <ChapterParagraph
                    key={paragraph.id}
                    paragraph={paragraph}
                    isFirstParagraph={this.shouldMarkAsFirstParagraph(i, paragraph.content)}
                />
            );
        }

        return (
            <div className="Chapter" style={{paddingTop: 20}}>
                {chapter.hasOwnProperty('header') &&
                    <ChapterTitle number={chapterNumber} title={chapter.header.title} inChapter={true} />
                }

                {paragraphs}

                {chapter.image.length > 0 &&
                    <ChapterImage image={chapter.image} />
                }
            </div>
        );
    }
});

export default Chapter;