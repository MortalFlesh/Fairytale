import React from 'react';

import ChapterMenuItem from './chapterMenuItem';
import ChapterHeader from './chapterHeader';

const ChaptersMenu = React.createClass({
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
        const newChapter = parseInt(chapterNumber, 10);

        if (newChapter !== this.props.selectedChapter) {
            this.forceUpdate();
            this.props.onChapterChanged(newChapter);
        }
    },
    render() {
        const selectedChapter = this.props.selectedChapter;

        const chapters = this.props.chapters.map((chapter) =>
            <ChapterMenuItem
                key={chapter.number}
                isActive={chapter.number == selectedChapter}
                number={chapter.number}
                onClick={this.menuItemClick}
            >
                <ChapterHeader
                    number={chapter.number}
                    title={chapter.title}
                    newPargraphsCount={chapter.newPargraphsCount}
                />
            </ChapterMenuItem>
        );

        return (
            <div className="ChaptersMenu">
                {chapters}
            </div>
        );
    }
});

export default ChaptersMenu;
