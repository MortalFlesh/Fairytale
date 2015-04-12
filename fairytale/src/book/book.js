import React from 'react';
import jQuery from 'jquery-browserify';

import Loader from './../services/loader';

import BookHeader from './bookHeader';

import ChaptersMenu from './../chapter/chaptersMenu';
import Page from './../page/page';

import EmptyRibbonSpace from './../ribbon/emptyRibbonSpace';
import DiceRibbon from './../ribbon/diceRibbon';
import Bookmark from "./../ribbon/bookmark";

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

        setTimeout(function () {
            var pageContent = jQuery('.PageContent_Scroll');

            jQuery('html, body').animate({
                scrollTop: pageContent.offset().top - 150
            }, 1000);

            var bookmarkedParagraph = jQuery('.ParagraphBookmark');
            setTimeout(function () {
                jQuery('.PageContent_Scroll').animate({
                    scrollTop: bookmarkedParagraph.offset().top - 500
                }, 1000);
            }, 1000);
        }, 200);
    },
    onDiceRibbonClick(roll) {
        Loader.loadJsonWithData(
            this.props.rollForNewChaptersUrl,
            {
                roll: roll,
            },
            response => {
                var message = 'Hod bohužel nebyl správný :-(';

                if (response.status === 'ok') {
                    var count = parseInt(response.publishedCount, 10);
                    var publishedMessage = '';

                    if (count === 1) {
                        publishedMessage += '1 nový odstavec';
                    } else if (count >= 2 && count <= 4) {
                        publishedMessage += count + ' nové odstavce';
                    } else if (count >= 5) {
                        publishedMessage += count + ' nových odstavců';
                    }

                    message = 'Hod byl správný! Máš navíc ' + publishedMessage + ' :-)';

                    this.loadBook();
                } else if (response.status === 'nothing-to-publish') {
                    message = 'Hod byl sice správný, ale není už víc napsané :-(';
                } else if (response.status === 'hack') {
                    message = 'Dobrý pokus, ale zkus to až zítra!';
                }

                alert(message);
            }
        );
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
                    onChapterChanged={this.onChapterChanged}
                />

                <EmptyRibbonSpace width={470} />
                <DiceRibbon onClick={this.onDiceRibbonClick} refreshRate={this.props.interval} />
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