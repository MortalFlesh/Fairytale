import React from 'react';

import BarMenuItem from './barMenuItem';
import BarMenuSeparator from './barMenuSeparator';

import Loader from './../services/loader.js';
import ReactComponentsService from './../services/reactComponentsService';

const BarMenu = React.createClass({
    getInitialState() {
        return {
            items: [],
            active: this.props.active,
        };
    },
    componentDidMount() {
        Loader.loadJson(this.props.url, response => {
            this.setState({items: response});
        });
    },
    itemClickHandler(pathName) {
        this.setState({active: pathName});
    },
    render() {
        const style = {
            float: 'right',
        };

        const state = this.state;
        let items = state.items.map((item, i) =>
            <BarMenuItem
                key={i}
                active={item.pathName === state.active}
                item={item}
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