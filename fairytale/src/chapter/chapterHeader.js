var React = require('react');

var Style = require('./../services/styleService');

var ChapterHeader = React.createClass({
    getDefaultProps() {
        return {
            inChapter: false,
        };
    },
    render() {
        var style = {
            textAlign: 'center',
            margin: '7px 0',
        };

        if (this.props.inChapter) {
            style.fontSize = 40;
            style.color = Style.colors.title;
            style.textShadow = Style.shadow.title;
        }

        return (
            <h3 style={style}>
                <strong>{this.props.number}.</strong>{' ' + this.props.title}
            </h3>
        );
    }
});

module.exports = ChapterHeader;