var React = require('react');

var ChapterMenuItem = require('./chapterMenuItem');
var ChapterHeader = require('./chapterHeader');

var ChaptersMenu = React.createClass({
    getInitialState() {
        return {
            chapters: [
                {
                    number: 1,
                    title: ''
                },
            ],
            selectedChapter: this.props.defaultChapter,
        };
    },
    componentDidUpdate() {
        var state = {};
        var stateChanged = false;

        if (this.state.selectedChapter === 1 && this.state.chapters !== this.props.chapters) {
            state.chapters = this.props.chapters;
            stateChanged = true;
        }

        if (stateChanged) {
            this.setState(state);
        }
    },
    menuItemClick(chapterNumber) {
        var newChapter = parseInt(chapterNumber, 10);
        if (newChapter !== this.state.selectedChapter) {
            this.setState({selectedChapter: newChapter});
        }

    },
    render() {
        var state = this.state;

        var chapters = this.state.chapters.map(chapter =>
            <ChapterMenuItem isActive={state.selectedChapter == chapter.number} number={chapter.number} onClickHandler={this.menuItemClick}>
                <ChapterHeader number={chapter.number} title={chapter.title} />
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
