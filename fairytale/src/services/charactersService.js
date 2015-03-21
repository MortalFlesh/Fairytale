var $ = require('jquery-browserify');

var CharactersService = {
    transformDataToCharacters(response) {
        var characters = [];

        if (response instanceof Array || !response instanceof Object || !response.pohadka instanceof Object) {
            return response;
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
        $.each(infosData, (infoName, items) => {
            infos.push({
                name: infoName,
                items: items,
            });
        });
        return infos;
    },
};

module.exports = CharactersService;