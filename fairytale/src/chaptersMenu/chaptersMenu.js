import React from 'react';
import {addons} from 'react/addons';

import ChapterMenuItem from './chapterMenuItem';
import ChapterTitle from './../chapter/chapterTitle';

const ChaptersMenu = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        selectedChapter: React.PropTypes.number,
        chapters: React.PropTypes.array,
        onChapterChanged: React.PropTypes.func.isRequired,
    },
    getDefaultProps() {
        return {
            selectedChapter: 1,
            chapters: [
                {
                    number: 1,
                    title: '',
                    newPargraphsCount: 0,
                },
            ],
        }
    },
    menuItemClick(chapterNumber) {
        if (chapterNumber !== this.props.selectedChapter) {
            this.props.onChapterChanged(chapterNumber);
        }
    },
    getChapterNumber(chapter) {
       return parseInt(chapter.number, 10);
    },
    render() {
        const selectedChapter = this.props.selectedChapter;

        const chapters = this.props.chapters.map((chapter) => {
            const chapterNumber = this.getChapterNumber(chapter);

            return (
                <ChapterMenuItem
                    key={chapterNumber}
                    isActive={chapterNumber === selectedChapter}
                    number={chapterNumber}
                    onClick={this.menuItemClick}
                >
                    <ChapterTitle
                        number={chapterNumber}
                        title={chapter.title}
                        newPargraphsCount={chapter.newPargraphsCount}
                    />
                </ChapterMenuItem>
            );
        });

        return (
            <div className="ChaptersMenu">
                {chapters}
            </div>
        );
    }
});

export default ChaptersMenu;
