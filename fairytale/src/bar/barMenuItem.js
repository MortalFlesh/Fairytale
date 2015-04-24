import React from 'react';
import {addons} from 'react/addons';

import Style from './../services/styleService';

const BarMenuItem = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        active: React.PropTypes.bool,
        item: React.PropTypes.object.isRequired,
    },
    getDefaultProps() {
        return {
            active: false,
        };
    },
    getStyle() {
        let color = Style.colors.title;
        let textDecoration = 'none';

        if (this.props.active) {
            color = Style.colors.titleActive;
            textDecoration = 'underline';
        }

        return {
            display: 'inline-block',
            padding: '0 15px',
            lineHeight: '26px',
            color: color,
            textShadow: Style.shadow.title,
            border: '1px solid black',
            borderRadius: 3,
            verticalAlign: 'top',

            textDecoration: textDecoration,
        };
    },
    render() {
        const item = this.props.item;
        const style = this.getStyle();

        return (
            <a className="BarMenuItem gradient-background" href={item.link} style={style}>
                {item.name}
            </a>
        );
    }
});

export default BarMenuItem;