var React = require('react');

var Chapter = require('./chapter');

var Chapters = React.createClass({
    render() {
        return (
            <div className="Chapters">
                {chapters}
            </div>
        );
    }
});

module.exports = Chapters;