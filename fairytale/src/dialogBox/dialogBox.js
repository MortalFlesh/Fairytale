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
            dialogBox: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                position: 'absolute',
                padding: 10,
                border: '1px solid black',
                borderRadius: 10,
                boxShadow: '5px 5px 5px RGBA(0, 0, 0, 0.5)',
                zIndex: 1000,
            },
            dialogBoxLine: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingBottom: 10,
            },
        };

        if (!this.props.visible) {
            style.dialogBox.display = 'none';
        }

        return (
            <div className="DialogBox gradient-background" style={style.dialogBox}>
                <div style={style.dialogBoxLine}>
                    <DialogBoxClose onClick={this.props.onClose}/>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = DialogBox;