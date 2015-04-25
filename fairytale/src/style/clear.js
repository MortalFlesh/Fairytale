import React from 'react';
import {addons} from 'react/addons';

const Clear = React.createClass({
    mixins: [addons.PureRenderMixin],
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