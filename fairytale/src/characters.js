var React = require('react');

var Loader = require('./services/loader');
var CharactersService = require('./services/charactersService');

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
            var characters = CharactersService.transformDataToCharacters(data);

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

        return (
            <div className="Characters">
                {characters}
            </div>
        );
    }
});

module.exports = Characters;