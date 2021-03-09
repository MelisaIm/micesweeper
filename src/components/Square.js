import React from 'react';
import classnames from 'classnames';
import './board.css'

export default class Square extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id, 
            seen: this.props.seen, 
            bomb: this.props.bomb, 
            flag: this.props.flag, 
            nearBombs: this.props.nearBombs
        }
        this.clickHandlerSquare = this.clickHandlerSquare.bind(this);
    }

    clickHandlerSquare(e) {
        this.props.clickHandler(e, this.state.id);
    }

    render() {
        return (<div className={
            classnames("square", 
            this.state.bomb && "bomb", 
            this.state.seen && !this.state.bomb && "seen", 
            !this.props.playing && "showBombs", 
            this.state.flag && "flag")}
            key={Math.random()} 
            id={this.props.id} 
            onClick={(e) => this.clickHandlerSquare(e)} 
            onContextMenu={this.clickHandlerSquare}>{(this.state.seen && this.state.nearBombs) || ''}</div>)
    }
}