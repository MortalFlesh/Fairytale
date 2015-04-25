import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

const BookHeader = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        title: React.PropTypes.string.isRequired,
        subTitle: React.PropTypes.string.isRequired,
    },
    render() {
        const style = {
            header: {
                padding: '20px 0',
                borderBottom: '1px solid black',
            },
            title: {
                textAlign: 'center',
                color: Style.colors.titleActive,
                fontSize: 50,
                textShadow: Style.shadow.title,
                margin: 0,
            },
            subTitle: {
                textAlign: 'center',
                color: Style.colors.titleActive,
                fontSize: 30,
                textShadow: Style.shadow.title,
                margin: 0,
            },
        };

        return (
            <div className="BookHeader" style={style.header}>
                <h1 style={style.title}>
                    {this.props.title}
                </h1>
                <h2 style={style.subTitle}>
                    {this.props.subTitle}
                </h2>
            </div>
        );
    }
});

export default BookHeader;