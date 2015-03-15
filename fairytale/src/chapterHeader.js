var React = require('react');

var ChapterHeader = React.createClass({
    render() {
        return (
            <h3 style={{textAlign: 'center'}}>
                <strong>{this.props.number}.</strong>{' ' + this.props.title}
            </h3>
        );
    }
});

module.exports = ChapterHeader;