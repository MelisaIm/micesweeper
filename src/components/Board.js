import React from 'react';
import './board.css'

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        
        this.generateGame = this.generateGame.bind(this);
        const newBoard = this.generateGame(this.props.size.rows, this.props.size.columns);

        this.state = {
            board: newBoard
        }
    }

    generateGame(rows, cols) {
        let newBoard = [];
        let row = []
        for (let i = 0; i < rows; i++) {
            row.push({seen: false, bomb: false, flag: false})
        }
        for (let j = 0; j < cols; j++){
            newBoard.push(row);
        }
        return newBoard;
    }

    componentDidUpdate(prevProps) {
        if(this.props.size !== prevProps.size) {
            this.setState({board: this.generateGame(this.props.size.rows, this.props.size.columns)})
        }
    }

    render() {
        console.log(this.state)
        return (<div id="board">
            {this.state.board.map(row => {
                return <div className="column" key={Math.random() + 'row'}> 
                {row.map((square, index) => <div className="square" key={Math.random() + index}></div>)}
                </div>
            })}
        </div>)
    }
}