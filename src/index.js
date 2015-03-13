
var React = require('react');

var Book = require('./book');

React.render(
    <Book url={"api.php"} />,
    document.getElementById('content')
);