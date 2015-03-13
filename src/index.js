
var React = require('react');

var Book = require('./book');

/*
Book
    Header
    [Chapters]
    Page
        Chapter
            [Paragraphs]
 */

React.render(
    <Book url={"api.php"} />,
    document.getElementById('content')
);