var React = require('react');
var jQuery = require('jquery-browserify');

var Loader = require('./../services/loader');
var CookiesService = require('./../services/cookieService');

var BookHeader = require('./bookHeader');

var ChaptersMenu = require('./../chapter/chaptersMenu');
var Page = require('./../page/page');
var Bookmark = require('./../book/bookmark');

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
        Loader.loadJson(this.props.url, response => {
            this.setState({book: response});
        });
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
    onBookmarkClick(chapterNumber) {
        this.onChapterChanged(chapterNumber);
        setTimeout(function() {
            var bookmark = CookiesService.get('bookmark');
            var target = jQuery('#paragraph-' + bookmark.paragraph);

            jQuery('.PageContent_Scroll').animate({
                scrollTop: target.offset().top
            }, 1000);
        }, 200);
    },
    render() {
        var book = this.state.book;
        var currentChapter = this.getCurrentChapter();
        var chapterHeaders = book.chapters.map(chapter => chapter.header);

        return (
            <div className="Book">
                <BookHeader title={book.title} subTitle={book.subTitle} />

                <ChaptersMenu
                    chapters={chapterHeaders}
                    defaultChapter={this.state.currentChapter}
                    onChapterChanged={this.onChapterChanged} />

                <Bookmark onClick={this.onBookmarkClick} />

                <Page
                    chapter={currentChapter}
                    background={'./fairytale/images/background.jpg'}
                    onChapterChanged={this.onChapterChanged}
                />
            </div>
        );
    }
});

module.exports = Book;