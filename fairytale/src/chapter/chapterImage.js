import React from 'react';
import {addons} from 'react/addons';

const ChapterImage = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        image: React.PropTypes.string.isRequired,
    },
    render() {
        const style = {
            padding: '40px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        };

        return (
            <div className="ChapterImage" style={style}>
                <img src={`./fairytale/images/chapters/${this.props.image}`} alt="" />
            </div>
        );
    }
});

export default ChapterImage;
