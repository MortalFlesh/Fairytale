var React = require('react');

var Character = React.createClass({
    render() {
        var character = this.props.character;

        return (
            <div className="Character">
                <h1>{character.name}</h1>
            </div>
        );
    }
});

module.exports = Character;