import React from 'react';

const ParagraphBookmark = React.createClass({
    render() {
        const style = {
            display: 'inline-block',
            background: 'url("./fairytale/images/bookmark-paragraph.png") no-repeat top right',
            float: 'right',
            margin: '-8px -9px 0 0',
            width: 40,
            height: 45,
        };

        return (
            <span className="ParagraphBookmark" style={style} />
        );
    }
});

export default ParagraphBookmark;