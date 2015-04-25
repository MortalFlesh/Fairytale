import React from 'react';
import {addons} from 'react/addons';

const ChapterNewParagraph = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        count: React.PropTypes.number.isRequired,
    },
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

export default ChapterNewParagraph;