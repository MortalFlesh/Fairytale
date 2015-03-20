var $ = require('jquery-browserify');

var CharactersService = {
    transformDataToCharacters(response) {
        var characters = [];

        if (!response instanceof Object || !response.pohadka instanceof Object) {
            return characters;
        }

        var data = response.pohadka;
        $.each(data, (key, characterData) => {
            characters.push(this.transformCharacter(characterData));
        });
        return characters;
    },
    transformCharacter(characterData) {
        return {
            name: characterData.Name,
            infos: this.transformInfos(characterData.Infos),
        }
    },
    transformInfos(infosData) {
        var infos = [];
        $.each(infosData, (infoName, values) => {
            infos.push({
                name: infoName,
                data: values,
            });
        });
        return infos;
    },
};

module.exports = CharactersService;