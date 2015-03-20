var React = require('react');

var App = require('./app');

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

React.render(
    <App/>,
    document.getElementById('app')
);