import React from 'react';

import {getMenuItems} from './../app/store';

import BarMenuItem from './barMenuItem';
import BarMenuSeparator from './barMenuSeparator';

import ReactComponentsService from './../services/reactComponentsService';

const BarMenu = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            active: false,
        };
    },
    render() {
        const style = {
            float: 'right',
        };

        const menuItems = getMenuItems().toJS();

        let items = menuItems.map((item, i) =>
            <BarMenuItem
                key={i}
                active={item.pathName === this.props.active}
                item={item}
            />
        );

        items = ReactComponentsService.join(items, (key) => <BarMenuSeparator key={key} />);

        return (
            <div className="BarMenu" style={style}>
                {items}
            </div>
        );
    }
});

export default BarMenu;