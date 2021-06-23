import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    let classes = "square";
    if(props.iswinningTile){
      classes = "winning-square"
    }
      return (
        <button className={classes} onClick={props.onClick}>
          {props.value}
        </button>
      );
}
  
class Board extends React.Component {
    renderSquare(i,iswinningTile) {
      return (<Square key={i}
      value={this.props.squares[i]} 
      iswinningTile={iswinningTile}
      onClick={()=>this.props.onClick(i)}
      />);
    }
  
    render() {
      let squares =[];
      let count=0;
      for(let i=0;i<3;i++){
        let children=[];
        for(let j=0;j<3;j++){
          if(this.props.winningTiles.includes(count)){
            children.push(this.renderSquare(count,true));
          }else{
            children.push(this.renderSquare(count,false));
          }
          
          count++;
        }
        squares.push(<div className="board-row" key={i}>{children}</div>);
      }
    return (
        <div>
          {squares}
        </div>
      );
    }
}
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares:Array(9).fill(null),
                clickPosition:Array(9).fill(null)
            }],
            stepNumber:0,
            xIsNext:true,
            lastStepClicked:-1,
            sortAsc: true
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            lastStepClicked:step
        })
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(this.calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext?'X':'O';
        //const clickPosition = current.clickPosition.slice();
        this.setState({
            history: history.concat([{
                squares:squares,
                clickPosition:i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            lastStepClicked:-1
        })
    }
    handleToggleClick(){
      this.setState({
        sortAsc: !this.state.sortAsc,
      })
    }
    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    isDraw(squares){
      if(this.calculateWinner(squares)===null && !squares.includes(null)){
        return true;
      }
      return false;
    }
    getWinningTiles(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { 
          return lines[i];
        }
      }
      return [-1,-1,-1]
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        let sort = "Sort Desc ↓";
        const moves = history.map((step,move)=>{
          const clickPosition = this.state.history[move].clickPosition;
          const row = Math.floor(clickPosition / 3);
          const col = clickPosition % 3;
            const desc = move?
            move===this.state.lastStepClicked?
            <b>Go to step #{move}. Position: ({row},{col})</b>:
            <span>Go to step #{move}. Position: ({row},{col})</span>:
            'Go to game start';
            return (<li key={move}>
                <button onClick={()=>this.jumpTo(move)}>{desc}</button>
            </li>)
        });
        if(!this.state.sortAsc){
          sort = "Sort Asc ↑";
          moves.reverse();
        }

        let status;
        let winningTiles = [-1,-1,-1];
        if (winner) {
          status = "Winner: " + winner;
          winningTiles =  this.getWinningTiles(current.squares);
        } else if (this.isDraw(current.squares)) {
          status = "Match Draw";
        } else {
          status = "Next Turn: " + (this.state.xIsNext ? "X" : "O");
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                winningTiles={winningTiles}
                onClick={(i)=> this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <button onClick={()=>this.handleToggleClick()}>{sort}</button>
            <button onClick={()=>window.location.reload()}>Restart ↺</button>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );