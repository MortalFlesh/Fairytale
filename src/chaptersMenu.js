var React = require('react');

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
            selectedChapter: 1,
        };
    },
    componentDidUpdate() {
        var state = {};
        var stateChanged = false;

        if (this.state.selectedChapter === 1 && this.state.chapters !== this.props.chapters) {
            state.chapters = this.props.chapters;
            stateChanged = true;
        }
        if (this.state.selectedChapter !== this.props.selectedChapter) {
            state.selectedChapter = this.props.selectedChapter;
            stateChanged = true;
        }

        if (stateChanged) {
            this.setState(state);
        }
    },
    render() {
        var chapters = this.state.chapters.map(chapter =>
            <ChapterHeader number={chapter.number} title={chapter.title} />
        );

        return (
            <div className="ChaptersMenu">
                {chapters}
            </div>
        );
    }
});

module.exports = ChaptersMenu;