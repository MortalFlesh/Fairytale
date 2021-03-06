import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

const ChapterFirstLetter = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        children: React.PropTypes.string.isRequired,
    },
    render() {
        const style = {
            color: Style.colors.title,
            textShadow: Style.shadow.title,
            float: 'left',
            fontSize: 80,
            fontWeight: 'bold',
            margin: '20px 0',
        };

        return (
            <span className="ChapterFirstLetter" style={style}>
                {this.props.children}
            </span>
        );
    }
});

export default ChapterFirstLetter;