var React = require('react');

var BarMenuItem = require('./barMenuItem');

var Loader = require('./../services/loader.js');

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
    render() {
        var style = {
            float: 'right',
        };

        var state = this.state;
        var items = state.items.map(item =>
            <BarMenuItem active={item.pathName === state.active} href={item.link}>
                {item.name}
            </BarMenuItem>
        );

        return (
            <div className="BarMenu" style={style}>
                {items}
            </div>
        );
    }
});

module.exports = BarMenu;