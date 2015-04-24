import dispatcher from './../lib/dispatcher';

export function setTitle(title: string) {
    dispatcher.dispatch(setTitle, title);
}

export function setSubTitle(subTitle: string) {
    dispatcher.dispatch(setSubTitle, subTitle);
}

export function setCover(cover: string) {
    dispatcher.dispatch(setCover, cover);
}

export function setChapters(chapters: array) {
    dispatcher.dispatch(setChapters, chapters);
}

export function setSelectedChapter(chapter: number) {
    dispatcher.dispatch(setSelectedChapter, chapter);
}

export function setFlashMessage(message: string) {
    dispatcher.dispatch(setFlashMessage, message);
}
