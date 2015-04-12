import React from 'react';

import Style from './../services/styleService';
import ChapterNewParagraph from './chapterNewParagraph';

var ChapterHeader = React.createClass({
    getDefaultProps() {
        return {
            inChapter: false,
            newPargraphsCount: 0,
        };
    },
    render() {
        var style = {
            textAlign: 'center',
            margin: '7px 0',
        };

        var content = [];
        content.push(<strong>{this.props.number}.</strong>);
        content.push(' ' + this.props.title);

        if (this.props.inChapter) {
            style.fontSize = 40;
            style.color = Style.colors.title;
            style.textShadow = Style.shadow.title;
        } else if (this.props.newPargraphsCount > 0) {
            content.push(<ChapterNewParagraph count={this.props.newPargraphsCount} />)
        }

        return (
            <h3 className="ChapterHeader" style={style}>
                {content}
            </h3>
        );
    }
});

module.exports = ChapterHeader;