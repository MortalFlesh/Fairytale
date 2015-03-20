var React = require('react');

var Characters = React.createClass({
    render() {
        return (
            <div className="Characters">
                ... characters (selected: {this.props.selected}) ...
            </div>
        );
    }
});

module.exports = Characters;