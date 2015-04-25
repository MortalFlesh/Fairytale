import React from 'react';
import {getBook, getSelectedChapter, getFlashMessage} from './store';
import {setSelectedChapter, setFlashMessage} from './actions';

import Loader from './../services/loader';
import Scroller from './../services/scroller';

import BookHeader from './bookHeader';
import ChaptersMenu from './../chaptersMenu/chaptersMenu';
import Page from './../page/page';
import DialogBox from './../dialogBox/dialogBox';
import Ribbons from './../ribbon/ribbons';

const Book = React.createClass({
    propTypes: {
        rollForNewChaptersUrl: React.PropTypes.string.isRequired,
    },
    getCurrentChapter(chapters, selectedChapter) {
        return chapters
            .filter((chapter) => chapter.toJS().header.number == selectedChapter)
            .first();
    },
    onChapterChanged(chapterNumber) {
        setSelectedChapter(chapterNumber);
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
                } else if (response.status === 'nothing-to-publish') {
                    message = 'Hod byl sice správný, ale není už víc napsané :-(';
                } else if (response.status === 'hack') {
                    message = 'Dobrý pokus, ale zkus to až zítra!';
                }

                setFlashMessage(message);
            }
        );
    },
    onDialogBoxClose() {
        setFlashMessage('');
    },
    render() {
        const book = getBook();
        const selectedChapter = getSelectedChapter();
        const flashMessage = getFlashMessage();

        const currentChapter = this.getCurrentChapter(book.chapters, selectedChapter);

        const chapterHeaders = book.chapters
            .map(chapter => chapter.get('header'))
            .toJS();

        return (
            <div className="Book">
                <BookHeader title={book.title} subTitle={book.subTitle} />

                {chapterHeaders &&
                    <ChaptersMenu
                        chapters={chapterHeaders}
                        selectedChapter={selectedChapter}
                        onChapterChanged={this.onChapterChanged}
                    />
                }

                {flashMessage.length > 0 &&
                    <DialogBox visible={true} onClose={this.onDialogBoxClose} margin={'10px 0 0 10px'}>
                        <p>{flashMessage}</p>
                    </DialogBox>
                }

                <Ribbons
                    onDiceRibbonClick={this.onDiceRibbonClick}
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

export default Book;