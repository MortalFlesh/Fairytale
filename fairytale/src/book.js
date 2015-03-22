var React = require('react');

var Loader = require('./services/loader');

var BookHeader = require('./bookHeader');
var ChaptersMenu = require('./chapter/chaptersMenu');
var Page = require('./page');

var Book = React.createClass({
    getInitialState() {
        return {
            book: {
                title: '',
                subTitle: '',
                cover: '',
                chapters: [
                    {
                        header: {
                            number: 1,
                            title: '',
                        },
                        paragraphs: [],
                    },
                ],
            },
            currentChapter: 1
        }
    },
    loadBook() {
        Loader.loadJson(this.props.url, function (data) {
            this.setState({book: data});
        }.bind(this));
    },
    componentDidMount() {
        this.loadBook();
        setInterval(this.loadBook, this.props.interval);
    },
    getCurrentChapter() {
        var currentChapterIndex = this.state.currentChapter - 1;
        return this.state.book.chapters[currentChapterIndex];
    },
    onChapterChanged(chapterNumber) {
        this.setState({currentChapter: chapterNumber});
    },
    render() {
        var book = this.state.book;
        var currentChapter = this.getCurrentChapter();
        var chapterHeaders = book.chapters.map(chapter => chapter.header);

        return (
            <div className="Book">
                <BookHeader title={book.title} subTitle={book.subTitle} />

                <ChaptersMenu chapters={chapterHeaders} defaultChapter={this.state.currentChapter} onChapterChanged={this.onChapterChanged} />

                <Page chapter={currentChapter} background={'./fairytale/images/background.jpg'} />
            </div>
        );
    }
});

module.exports = Book;