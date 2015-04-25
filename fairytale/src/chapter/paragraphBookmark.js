import React from 'react';
import {addons} from 'react/addons';

const ParagraphBookmark = React.createClass({
    mixins: [addons.PureRenderMixin],
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