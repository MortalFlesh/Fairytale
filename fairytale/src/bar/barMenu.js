import React from 'react';

import {getMenuItems} from './../app/store';

import BarMenuItem from './barMenuItem';
import BarMenuSeparator from './barMenuSeparator';

import ReactComponentsService from './../services/reactComponentsService';

const BarMenu = React.createClass({
    getInitialState() {
        return {
            active: this.props.active,
        };
    },
    itemClickHandler(pathName) {
        this.setState({active: pathName});
    },
    render() {
        const style = {
            float: 'right',
        };

        let items = getMenuItems().map((item, i) =>
            <BarMenuItem
                key={i}
                active={item.get('pathName') === this.state.active}
                item={item.toJS()}
                onClick={this.itemClickHandler}
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