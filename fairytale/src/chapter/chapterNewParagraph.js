import React from 'react';

var ChapterNewParagraph = React.createClass({
    render() {
        const style = {
            position: 'relative',
            color: 'green',
            float: 'right',
            fontSize: 12,
            margin: '-5px 2px',
            zIndex: 20,
        };

        return (
            <div className="ChapterNewParagraph" style={style}>
                {this.props.count}
            </div>
        );
    }
});

module.exports = ChapterNewParagraph;