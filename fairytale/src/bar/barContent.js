import React from 'react';
import {addons} from 'react/addons';

const BarContent = React.createClass({
    mixins: [addons.PureRenderMixin],
    propTypes: {
        children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    },
    render() {
        const style = {
            padding: '8px 0',
        };

        return (
            <div className="BarContent" style={style}>
                {this.props.children}
            </div>
        );
    }
});

export default BarContent;