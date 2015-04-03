var React = require('react');

var CookiesService = require('./../services/cookieService');
var ParagraphService = require('./../services/paragraphService');

var ParagraphBookmark = require('./paragraphBookmark');

var ChapterParagraph = React.createClass({
    getDefaultProps() {
        return {
            bookmark: false,
            isFirstParagraph: false
        }
    },
    getInitialState() {
        return {
            hover: false,
        };
    },
    getStyle() {
        var bgColor = 'none';
        var borderColor = 'transparent';

        if (this.props.paragraph.isNew == '1') {
            bgColor = 'RGBA(0,255,0, 0.15)';
        }

        if (this.state.hover || this.props.bookmark) {
            borderColor = 'RGBA(149, 103, 34, 0.9)';
        }

        return {
            background: bgColor,
            lineHeight: '20px',
            textIndent: 30,
            textAlign: 'justify',
            padding: 5,
            border: '1px solid',
            borderColor: borderColor,
            borderRadius: 5,
            cursor: 'alias',
        };
    },
    mouseEnterHandler(event) {
        this.setState({hover: true});
    },
    mouseLeaveHandler(event) {
        this.setState({hover: false});
    },
    onClickHandler() {
        CookiesService.set('bookmark', {
            chapter: parseInt(this.props.paragraph.chapter),
            paragraph: parseInt(this.props.paragraph.id),
        });
        this.props.onBookmarked();
    },
    render() {
        var style = this.getStyle();
        var content = ParagraphService.buildContent(this.props.children);

        if (this.props.bookmark) {
            var newContent = [];
            newContent.push(<ParagraphBookmark />);

            for (var i in content) {
                newContent.push(content[i]);
            }

            content = newContent;
        }

        return (
            <p className="ChapterParagraph"
                title="Přidat záložku"
                style={style}
                onMouseEnter={this.mouseEnterHandler}
                onMouseLeave={this.mouseLeaveHandler}
                onClick={this.onClickHandler}
            >
                {content}
            </p>
        );
    }
});

module.exports = ChapterParagraph;
