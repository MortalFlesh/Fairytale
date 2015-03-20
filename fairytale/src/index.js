var React = require('react');

var App = require('./app');
var AppHeader = require('./appHeader');
var AppContent = require('./appContent');

var Book = require('./book');
var Characters = require('./characters');

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

var app = {};

switch (window.location.hash) {
    case '#characters':
    case '#characters/':
    {
        app.active = 'characters';
        app.content = <Characters/>;
        break;
    }
    case '#book':
    case '#book/':
    default:
    {
        app.active = 'book';
        app.content = <Book url={"./api/api.php"} interval={60 * 1000} />;
        break;
    }
}

React.render(
    <App>
        <AppHeader active={app.active} />
        <AppContent>
            {app.content}
        </AppContent>
    </App>,
    document.getElementById('app')
);