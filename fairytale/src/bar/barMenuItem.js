import React from 'react';

import Style from './../services/styleService';

const BarMenuItem = React.createClass({
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
    clickHandler() {
        this.props.onClick(this.props.item.pathName);
    },
    render() {
        const item = this.props.item;
        const style = this.getStyle();

        return (
            <a className="BarMenuItem gradient-background" href={item.link} style={style} onClick={this.clickHandler}>
                {item.name}
            </a>
        );
    }
});

export default BarMenuItem;