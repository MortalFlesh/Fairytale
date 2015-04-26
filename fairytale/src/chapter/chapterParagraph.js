import React from 'react';
import {setBookmark} from './actions';
import {getBookmark} from './store';

import Style from './../services/styleService';

import ParagraphService from './../services/paragraphService';

const ChapterParagraph = React.createClass({
    propTypes: {
        isFirstParagraph: React.PropTypes.bool,
        paragraph: React.PropTypes.object.isRequired,
    },
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
        let background = 'none';
        let textIndent = 30;
        let borderColor = 'transparent';
        let boxShadow = 'none';

        if (this.props.paragraph.isNew == '1') {
            background = Style.colors.newParagraph;
        }

        if (hover || isBookmark) {
            borderColor = Style.colors.bookmarkParagraphBorder;
            boxShadow = `${Style.colors.title} 2px 2px 10px`;
        }

        if (this.props.isFirstParagraph) {
            textIndent = 0;
        }

        return {
            background,
            textIndent,
            boxShadow,
            border: '1px solid',
            borderColor,
            lineHeight: '20px',
            textAlign: 'justify',
            padding: 5,
            borderRadius: 5,
            cursor: 'alias',
            marginLeft: 6,
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
            this.props.paragraph.content,
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
