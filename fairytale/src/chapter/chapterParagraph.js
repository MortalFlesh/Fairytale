import React from 'react';

import {setBookmark} from './actions';
import {getBookmark} from './store';

import Style from './../services/styleService';

import Cookies from './../services/cookieService';
import ParagraphService from './../services/paragraphService';

const ChapterParagraph = React.createClass({
    getDefaultProps() {
        return {
            isFirstParagraph: false
        }
    },
    getInitialState() {
        return {
            hover: false,
        };
    },
    getStyle(isBookmark, hover) {
        let bgColor = 'none';
        let borderColor = 'transparent';
        let textIdent = 30;

        if (this.props.paragraph.isNew == '1') {
            bgColor = Style.colors.newParagraph;
        }

        if (hover || isBookmark) {
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
        const bookmark = {
            chapter: parseInt(this.props.paragraph.chapter),
            paragraph: parseInt(this.props.paragraph.id),
        };

        Cookies.set('bookmark', bookmark);
        setBookmark(bookmark);
    },
    isBookmark() {
        const bookmark = getBookmark();
        const paragraph = this.props.paragraph;

        return (paragraph.chapter == bookmark.chapter && paragraph.id == bookmark.paragraph);
    },
    render() {
        const hover = this.state.hover;
        const isBookmark = this.isBookmark();
        const style = this.getStyle(isBookmark, hover);

        const content = ParagraphService.buildContent(
            this.props.children,
            isBookmark,
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

export default ChapterParagraph;
