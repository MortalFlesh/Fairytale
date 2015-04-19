import React from 'react';

import Style from './../services/styleService';

var ChapterFirstLetter = React.createClass({
    render() {
        var style = {
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