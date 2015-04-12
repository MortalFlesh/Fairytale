import React from 'react';

import Style from './../services/styleService';

import CookiesService from './../services/cookieService';
import ParagraphService from './../services/paragraphService';

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
        var textIdent = 30;

        if (this.props.paragraph.isNew == '1') {
            bgColor = Style.colors.newParagraph;
        }

        if (this.state.hover || this.props.bookmark) {
            borderColor = Style.colors.bookmarkParagraphBorder;
        }

        if (this.props.isFirstParagraph) {
            textIdent = 0;
        }

        return {
            background: bgColor,
            lineHeight: '20px',
            textIndent: textIdent,
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
        var content = ParagraphService.buildContent(
            this.props.children,
            this.props.bookmark,
            this.props.isFirstParagraph
        );

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
