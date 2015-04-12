import React from 'react';

import Cookie from './../services/cookieService';
import Style from './../services/styleService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';

var Bookmark = React.createClass({
    getDefaultProps() {
        return {
            baseStyle: {},
        };
    },
    onClickHandler() {
        var bookmark = Cookie.get('bookmark');
        this.props.onClick(bookmark.chapter);
    },
    render() {
        var bookmark = Cookie.get('bookmark');

        var style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/bookmark.png")',
            display: 'none',
        });

        if (bookmark !== null) {
            style.display = 'block';
        }

        return (
            <div className="Bookmark" style={style}>
                <RibbonLink title="Přejít na uloženou kapitolu" onClickHandler={this.onClickHandler} />
            </div>
        );
    }
});

module.exports = Bookmark;
