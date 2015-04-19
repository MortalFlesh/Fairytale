import React from 'react';

import CharacterInfoTitle from './characterInfoTitle';

const CharacterInfo = React.createClass({
    render() {
        const style = {
            info: {
                margin: '20px 0',
            },
            list: {
                marginTop: 0,
            },
            item: {
                lineHeight: '20px',
            },
        };

        const info = this.props.info;
        const infos = info.items.map((item, i) => <li key={i} style={style.item}>{item}</li>);

        return (
            <div className="CharacterInfo" style={style.info}>
                <CharacterInfoTitle name={info.name} />
                <ul style={style.list}>
                    {infos}
                </ul>
            </div>
        );
    }
});

export default CharacterInfo;