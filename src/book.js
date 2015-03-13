var React = require('react');

var Loader = require('./services/loader');

var Header = require('./header');
var ChaptersMenu = require('./chaptersMenu');
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
        Loader.loadBook(this.props.url, function (data) {
            this.setState({book: data});
        }.bind(this));
    },
    componentDidMount() {
        this.loadBook();
    },
    getCurrentChapter() {
        var currentChapterIndex = this.state.currentChapter - 1;
        return this.state.book.chapters[currentChapterIndex];
    },
    render() {
        var book = this.state.book;
        var currentChapter = this.getCurrentChapter();
        var chapterHeaders = book.chapters.map(chapter => chapter.header);

        var style = {
            maxWidth: 800,
            margin: '0 auto',
        };

        return (
            <div className="Book" style={style}>
                <Header title={book.title} subTitle={book.subTitle} />

                <ChaptersMenu chapters={chapterHeaders} selectedChapter={this.state.currentChapter} />

                <Page chapter={currentChapter} background={'./images/background.jpg'} />
            </div>
        );
    }
});

module.exports = Book;