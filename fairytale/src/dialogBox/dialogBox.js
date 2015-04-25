import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

import DialogBoxClose from './dialogBoxClose';

const DialogBox = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        visible: React.PropTypes.bool,
        onClose: React.PropTypes.func.isRequired,
        marging: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },
    defaultProps() {
        return {
            visible: false,
            margin: 0,
        };
    },
    render() {
        const style = {
            dialogBox: {
                display: this.props.visible ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                position: 'absolute',
                padding: 10,
                border: '1px solid black',
                borderRadius: 10,
                boxShadow: '5px 5px 5px RGBA(0, 0, 0, 0.5)',
                zIndex: 1000,
                margin: this.props.margin,
            },
            dialogBoxLine: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingBottom: 10,
            },
        };

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

export default DialogBox;