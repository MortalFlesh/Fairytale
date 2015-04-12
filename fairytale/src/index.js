import React from 'react';

import App from './app/app';

/*

App
    AppHeader
    AppContent

Book
    BookHeader
    [Chapters]
    Page
        Chapter
            [Paragraphs]

Characters
    CharacterName
    InfosContainer
        [infos]
 */

var appElement = document.getElementById('app');

React.render(
    <App/>,
    appElement
);