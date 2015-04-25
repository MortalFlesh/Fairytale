import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

const ChapterMenuItem = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        number: React.PropTypes.number.isRequired,
        isActive: React.PropTypes.bool,
        children: React.PropTypes.element.isRequired,
    },
    getDefaultProps() {
        return {
            isActive: false,
        };
    },
    handleOnClick() {
        this.props.onClick(this.props.number);
    },
    getStyle() {
        let color = Style.colors.title;
        let textDecoration = 'none';

        if (this.props.isActive) {
            color = Style.colors.titleActive;
            textDecoration = 'underline';
        }

        return {
            display: 'inline-block',
            margin: '0 8px',
            cursor: 'pointer',
            color: color,
            textShadow: Style.shadow.title,
            textDecoration: textDecoration,
        };
    },
    render() {
        const style = this.getStyle();

        return (
            <div className="ChapterMenuItem" style={style} onClick={this.handleOnClick}>
                {this.props.children}
            </div>
        );
    }
});

export default ChapterMenuItem;