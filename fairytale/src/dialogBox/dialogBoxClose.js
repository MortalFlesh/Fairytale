import React from 'react';

import Style from './../services/styleService';

var DialogBoxClose = React.createClass({
    render() {
        let closeStyle = {
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
            <a style={closeStyle} onClick={this.props.onClick}>X</a>
        );
    }
});

export default DialogBoxClose;