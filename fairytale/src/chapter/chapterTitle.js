import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

import ChapterNewParagraph from './chapterNewParagraph';

const ChapterTitle = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        inChapter: React.PropTypes.bool,
        newParagraphsCount: React.PropTypes.number,
        number: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
    },
    getDefaultProps() {
        return {
            inChapter: false,
            newPargraphsCount: 0,
        };
    },
    render() {
        let style = {
            textAlign: 'center',
            margin: '7px 0',
        };

        let showCount = false;

        if (this.props.inChapter) {
            style.fontSize = 40;
            style.color = Style.colors.title;
            style.textShadow = Style.shadow.title;
        } else if (this.props.newPargraphsCount > 0) {
            style.position = 'relative';
            showCount = true;
        }

        return (
            <h3 className="ChapterHeader" style={style}>
                <strong>{this.props.number}.</strong>{` ${this.props.title}`}

                {showCount &&
                    <ChapterNewParagraph count={this.props.newPargraphsCount} />
                }
            </h3>
        );
    }
});

export default ChapterTitle;