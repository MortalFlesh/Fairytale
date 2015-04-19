import React from 'react';

const Clear = React.createClass({
    render() {
        const style = {
            clear: 'both',
            height: 1,
        };

        return (
            <br className="Clear" style={style} />
        );
    }
});

export default Clear;