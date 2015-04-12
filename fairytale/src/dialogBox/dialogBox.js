import React from 'react';

import Style from './../services/styleService';

import DialogBoxClose from './dialogBoxClose';

var DialogBox = React.createClass({
    defaultProps() {
        return {
            visible: false,
        }
    },
    render() {
        let style = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'absolute',
            padding: 10,
            border: '1px solid black',
            borderRadius: 10,
            background: Style.colors.titleActive,
            boxShadow: '5px 5px 5px RGBA(0, 0, 0, 0.5)',
            zIndex: 1000,
        };

        if (!this.props.visible) {
            style.display = 'none';
        }

        let lineStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingBottom: 10,
        };

        return (
            <div className="DialogBox" style={style}>
                <div style={lineStyle}>
                    <DialogBoxClose onClick={this.props.onClose}/>
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = DialogBox;