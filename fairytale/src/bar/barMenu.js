var React = require('react');

var BarMenuItem = require('./barMenuItem');
var BarMenuSeparator = require('./barMenuSeparator');

var Loader = require('./../services/loader.js');
var ReactComponentsService = require('./../services/reactComponentsService');

var BarMenu = React.createClass({
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
        var style = {
            float: 'right',
        };

        var state = this.state;
        var items = state.items.map((item, i) =>
            <BarMenuItem
                key={i}
                active={item.pathName === state.active}
                item={item}
                onClick={this.itemClickHandler} />
        );

        items = ReactComponentsService.join(items, key => <BarMenuSeparator key={key} />);

        return (
            <div className="BarMenu" style={style}>
                {items}
            </div>
        );
    }
});

module.exports = BarMenu;