import React from 'react';
import {getBookmark} from './../chapter/store';

import Style from './../services/styleService';
import Json from './../services/jsonService';

import RibbonLink from './ribbonLink';

const Bookmark = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        baseStyle: React.PropTypes.object.isRequired,
    },
    onClickHandler() {
        const bookmark = getBookmark();
        this.props.onClick(bookmark.chapter);
    },
    render() {
        const bookmark = getBookmark();

        const style = Json.extendsJson(this.props.baseStyle, {
            backgroundImage: 'url("./fairytale/images/bookmark.png")',
            display: bookmark !== null && bookmark.chapter > 0 ? 'block' : 'none',
        });

        return (
            <div className="Bookmark" style={style}>
                <RibbonLink title="Přejít na uloženou kapitolu" onClick={this.onClickHandler} />
            </div>
        );
    }
});

export default Bookmark;
