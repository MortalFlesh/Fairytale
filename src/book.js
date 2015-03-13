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
                background: '',
                chapters: [
                    {
                        chapter: {
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
        var currentChapterNumber = this.state.currentChapter - 1;
        return this.state.book.chapters[currentChapterNumber];
    },
    render() {
        var book = this.state.book;
        var currentChapter = this.getCurrentChapter();

        var style = {
            width: 800,
            margin: '0 auto',
        };

        return (
            <div className="Book" style={style}>
                <Header title={book.title} subTitle={book.subTitle} />

                <ChaptersMenu chapters={book.chapters} />

                <Page chapter={currentChapter} />
            </div>
        );
    }
});

module.exports = Book;