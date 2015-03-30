var React = require('react');

var CharacterInfoTitle = require('./characterInfoTitle');

var CharacterInfo = React.createClass({
    render() {
        var style = {
            margin: '20px 0',
        };

        var itemStyle = {
            lineHeight: '20px',
        };

        var info = this.props.info;
        var infos = info.items.map((item, i) => <li key={i} style={itemStyle}>{item}</li>);

        return (
            <div className="CharacterInfo" style={style}>
                <CharacterInfoTitle name={info.name} />
                <ul style={{marginTop: 0,}}>
                    {infos}
                </ul>
            </div>
        );
    }
});

module.exports = CharacterInfo;