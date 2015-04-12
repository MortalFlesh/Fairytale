import React from 'react';

import ChapterMenuItem from './chapterMenuItem';
import ChapterHeader from './chapterHeader';

var ChaptersMenu = React.createClass({
    getDefaultProps() {
        return {
            chapters: [
                {
                    number: 1,
                    title: '',
                    newPargraphsCount: 0,
                },
            ],
        }
    },
    getInitialState() {
        return {
            selectedChapter: this.props.defaultChapter,
        };
    },
    menuItemClick(chapterNumber) {
        var newChapter = parseInt(chapterNumber, 10);
        if (newChapter !== this.state.selectedChapter) {
            this.setState({selectedChapter: newChapter});
            this.props.onChapterChanged(chapterNumber);
        }
    },
    render() {
        var chapters = this.props.chapters.map(chapter =>
            <ChapterMenuItem
                key={chapter.number}
                isActive={this.state.selectedChapter == chapter.number}
                number={chapter.number}
                onClickHandler={this.menuItemClick}
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

module.exports = ChaptersMenu;
