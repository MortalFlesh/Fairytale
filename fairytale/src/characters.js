var React = require('react');

var Loader = require('./services/loader');

var Character = require('./character');

var Characters = React.createClass({
    getInitialState() {
        return {
            characters: [],
            selected: this.props.selected || '',
        }
    },
    loadCharacters() {
        Loader.loadJson(this.props.url, function (data) {
            var characters = data;

            if (characters instanceof Array) {
                this.setState({characters: characters});
            }
        }.bind(this));
    },
    componentDidMount() {
        this.loadCharacters();
    },
    isSelected(characterName) {
        var selected = this.state.selected.toLocaleLowerCase();
        var name = characterName.toLocaleLowerCase();

        return (selected === '' || selected === name);
    },
    render() {
        var characters = this.state.characters.map(character => {
            if (this.isSelected(character.name)) {
                return <Character character={character} />;
            }
        });

        var style = {
            paddingTop: 1,
        };

        return (
            <div className="Characters" style={style}>
                {characters}
            </div>
        );
    }
});

module.exports = Characters;