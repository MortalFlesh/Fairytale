import React from 'react';

const DiceIcon = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        number: React.PropTypes.number.isRequired,
    },
    onClickHandler(event) {
        event.preventDefault();

        this.props.onClick(this.props.number)
    },
    render() {
        const number = this.props.number;

        const style = {
            display: 'inline-block',
            width: 70,
            height: 70,
            padding: '10px 10px 0 0',
        };

        return (
            <a href="#" className="DiceIcon" onClick={this.onClickHandler} style={style}>
                <img src={'./fairytale/images/dice/' + number + '.png'} alt={number} />
            </a>
        );
    }
});

export default DiceIcon;