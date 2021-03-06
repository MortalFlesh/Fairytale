import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

const DialogBoxClose = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
    },
    render() {
        const style = {
            display: 'block',
            background: Style.colors.title,
            border: '1px solid black',
            borderRadius: 6,
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: 16,
            height: 13,
            paddingTop: 3,
            cursor: 'pointer',
        };

        return (
            <a style={style} onClick={this.props.onClick}>X</a>
        );
    }
});

export default DialogBoxClose;