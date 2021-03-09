import React from 'react';
import './board.css'
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        
        this.generateGame = this.generateGame.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.addNumbers = this.addNumbers.bind(this);
        this.checkBoard = this.checkBoard.bind(this);
        const newBoard = this.generateGame(this.props.size.rows, this.props.size.columns);

        this.state = {
            board: newBoard,
            playing: this.props.playing, // if false, show bombs or win msg
            exploded: false, 
            showMessage: this.props.showMessage,
        }
        
    }

    chunk(arr, size) {
        const matrix = [];
        for (let i = 0; i < arr.length; i+= size) {
            matrix.push(arr.slice(i, i + size));
        }
        return matrix;
    }

    addNumbers(board) {
        for (let i = 0; i < board.length; i++) { // loop through each row
            for (let j = 0; j < board[i].length; j++) {
                const current = board[i][j];
                let total = 0;

                if (i - 1 >= 0) {
                    //top left
                    if (j - 1 >= 0 && board[i - 1][j-1].bomb) total++;
                    //top
                    if (board[i-1][j].bomb) total++;
                    //top right
                    if (j + 1 < board[i].length && board[i-1][j+1].bomb) total++;
                }

                //left
                if (j - 1 >= 0 && board[i][j-1].bomb) total++; 
                //right
                if (j + 1 < board[i].length && board[i][j+1].bomb) total++;
                
                if (i + 1 < board.length) {
                    //bottom left
                    if (j - 1 >= 0 && board[i + 1][j-1].bomb) total++;
                    //bottom
                    if (board[i + 1][j].bomb) total++;
                    //bottom right
                    if (j+1 < board[i].length && board[i+1][j+1].bomb) total++;
                }
                if (!current.bomb) {
                    current.nearBombs = total;
                }
            }
        }
        return board;
    }

    generateGame(rows, cols) {
        let newBoard = [];
        const bombs = Math.floor(rows * cols/5);
        let j;

        for (j = 0; j < rows * cols - bombs; j++){
            newBoard.push({id: j, seen: false, bomb: false, flag: false, nearBombs: 0});
        }

        for (let i = 0; i < bombs; i++) {
            newBoard.push({id: j + i, seen: false, bomb: true, flag: false});
        }
        newBoard.sort(() => Math.random() - 0.5);
        this.setState({playing: true, exploded: false, bombs});
        return this.addNumbers(this.chunk(newBoard, cols));
    }

    componentDidUpdate(prevProps) {
        if(this.props.size !== prevProps.size) {
            this.setState({board: this.generateGame(this.props.size.rows, this.props.size.columns)})
        }
        if(this.props.restart !== prevProps.restart) {
            this.setState({playing: true});
        }
    }

    clickHandler(e, square) {
        let board = this.state.board;
        let column;
        let row;
        let rightClick;
        if (e.button=== 2 || e.which === 3) {
            rightClick = true
            e.preventDefault();
        };
        board.forEach((col, index, array) => {
            col.forEach((item, idx) => {
                if (rightClick) {
                    if (item.id === square) {
                        array[index][idx].flag = !array[index][idx].flag;
                    }
                } else {
                    if (e.target.classList.contains('bomb')) {
                        this.setState({playing: false});
                    }
                    if (item.id === square) {
                        //open adjacent too
                        if (index - 1 >= 0) {
                            //top
                            if (!board[index-1][idx].bomb && !board[index-1][idx].flag) board[index-1][idx].seen = true;
                        }
        
                        //left
                        if (idx - 1 >= 0 && !board[index][idx-1].bomb && !board[index][idx-1].flag) board[index][idx-1].seen = true; 
                        //right
                        if (idx + 1 < board[index].length && !board[index][idx+1].bomb && !board[index][idx+1].flag) board[index][idx+1].seen = true;
                        
                        if (index + 1 < board.length) {
                            //bottom
                            if (!board[index + 1][idx].bomb && !board[index + 1][idx].flag) board[index + 1][idx].seen = true;
                        }
                        array[index][idx].seen = true;
                    }
                }
            })
        });
        this.setState({board});
        this.checkBoard();
    }

    checkBoard() {
        // win condition, all squares except bombs are "seen"
        const board = this.state.board;
        const squares = this.props.size.rows * this.props.size.columns;
        const bombs = Math.floor(squares/5);
        let seen = 0;
        board.forEach(row => {
            row.forEach(square => {
                if (square.seen && !square.bomb) {
                    seen++;
                }
                if (square.bomb && square.seen) {
                    this.setState({exploded: true, showMessage: true, playing: false});
                    return;
                }
            });
        });
        if (squares > (seen + bombs)) { // game is not over
            console.log("Keep going!", squares, seen, bombs)
        } else if (squares === (seen + bombs)){ // all squares are accounted for
            this.setState({showMessage: true, playing: false});
        }
    }

    get showMessage() {
        if (this.state.showMessage && !this.state.playing) {
            if (this.state.exploded) {
                return (<>
                <div className={"message"}><span>Sorry, you followed your natural instincts after all :(</span><button 
                onClick={() => {
                    this.setState({showMessage: false, exploded: false});
                    this.props.restart();
                }}>My bad. Try again</button></div>
                </>)
            } else {
                return (<>
                    <div className={"message"}><span>Hooray! You did it! You ignored the human's demands and didn't catch the mice :)</span>
                <button onClick={() => {
                    this.setState({showMessage: false, exploded: false})
                this.props.restart()}}>Thank goodness!</button></div>
                </>)
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <>
            <div id="board">
                {this.state.board.map(row => {
                    return <div className="column" key={Math.random() + 'row'}> 
                    {row.map((square, index) => <Square key={Date.now() + index} clickHandler={this.clickHandler} playing={this.state.playing} {...square}/>)}
                    </div>
                })}
                </div>
                {this.showMessage}
            </>
        )
    }
}