import React from 'react';
import {addons} from 'react/addons';

import ReactComponentsService from './../services/reactComponentsService';

import BarMenuItem from './barMenuItem';
import BarMenuSeparator from './barMenuSeparator';

const BarMenu = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        active: React.PropTypes.string,
        menuItems: React.PropTypes.array.isRequired,
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

        let items = this.props.menuItems.map((item, i) =>
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