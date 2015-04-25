import React from 'react';
import {addons} from 'react/addons';

import Bar from './../bar/bar';

const AppHeader = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        active: React.PropTypes.string.isRequired,
        menuItems: React.PropTypes.array.isRequired,
    },
    render() {
        const style = {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            height: 42,
            width: '100%',
            borderBottom: '1px solid black',
            backgroundColor: '#fdd9ae',
            zIndex: 1000,
        };

        return (
            <div className="AppHeader gradient-background" style={style}>
                <Bar {...this.props}/>
            </div>
        );
    }
});

export default AppHeader;