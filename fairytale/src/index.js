
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
    <Book url={"./api/api.php"} interval={60 * 1000} />,
    document.getElementById('content')
);