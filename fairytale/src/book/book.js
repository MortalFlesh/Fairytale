import React from 'react';

import Loader from './../services/loader';
import Scroller from './../services/scroller';

import BookHeader from './bookHeader';

import ChaptersMenu from './../chapter/chaptersMenu';
import Page from './../page/page';

import DialogBox from './../dialogBox/dialogBox';
import Ribbons from './../ribbon/ribbons';

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
            currentChapter: 1,
            flashMessage: '',
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
        const currentChapterIndex = this.state.currentChapter - 1;
        return this.state.book.chapters[currentChapterIndex];
    },
    onChapterChanged(chapterNumber) {
        this.setState({currentChapter: chapterNumber});
    },
    onBookmarkClick(chapterNumber) {
        this.onChapterChanged(chapterNumber);

        setTimeout(() => {
            Scroller.scroll('.PageContent_Scroll', -150, 1000);

            setTimeout(() => {
                Scroller.scroll('.ParagraphBookmark', -500, 1000, '.PageContent_Scroll');
            }, 1000);

            setTimeout(() => {
                Scroller.scroll('.ParagraphBookmark', -250, 1000);
            }, 1800);
        }, 200);
    },
    onDiceRibbonClick(roll) {
        Loader.loadJsonWithData(
            this.props.rollForNewChaptersUrl,
            {
                roll: roll,
            },
            (response) => {
                let message = 'Hod bohužel nebyl správný :-(';

                if (response.status === 'ok') {
                    const count = parseInt(response.publishedCount, 10);
                    let publishedMessage = '';

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

                this.setState({flashMessage: message});
            }
        );
    },
    onDialogBoxClose() {
        this.setState({flashMessage: ''});
    },
    render() {
        const book = this.state.book;
        const currentChapter = this.getCurrentChapter();
        const chapterHeaders = book.chapters.map(chapter => chapter.header);

        const dialogBoxOpen = (this.state.flashMessage.length > 0);

        return (
            <div className="Book">
                <BookHeader title={book.title} subTitle={book.subTitle} />

                <ChaptersMenu
                    chapters={chapterHeaders}
                    selectedChapter={this.state.currentChapter}
                    onChapterChanged={this.onChapterChanged}
                />

                <DialogBox visible={dialogBoxOpen} onClose={this.onDialogBoxClose} margin={'10px 0 0 10px'}>
                    <p>{this.state.flashMessage}</p>
                </DialogBox>

                <Ribbons
                    onDiceRibbonClick={this.onDiceRibbonClick}
                    refreshRate={this.props.interval}
                    onBookmarkClick={this.onBookmarkClick}
                />

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