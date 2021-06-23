import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import logo from './logo.jpg'

function Square(props){
    let classes = "bg-cyan-100 rounded-2xl md:p-6 text-2xl cursor-pointer";
    if(props.iswinningTile){
      classes = "bg-green-200 rounded-2xl md:p-6 text-2xl cursor-pointer"
    }
    let datatoShow = props.value===null? "✎":props.value;
      return (
        <div className={classes} onClick={props.onClick}>
          <span className="font-bold">{datatoShow}</span>
        </div>
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
      //let count=0;
      // for(let i=0;i<3;i++){
      //   let children=[];
      //   for(let j=0;j<3;j++){
      //     if(this.props.winningTiles.includes(count)){
      //       children.push(this.renderSquare(count,true));
      //     }else{
      //       children.push(this.renderSquare(count,false));
      //     }
          
      //     count++;
      //   }
      //   squares.push(<div key={i}>{children}</div>);
      // }
      for(let i=0;i<9;i++){
          if(this.props.winningTiles.includes(i)){
            squares.push(this.renderSquare(i,true));
          }else{
            squares.push(this.renderSquare(i,false));
          }
        }

    return (
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
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
            <b>[Selected] Step #{move}. Position: ({row},{col})</b>:
            <span>Step #{move}. Position: ({row},{col})</span>:''
            return (<li key={move} className="">
                <span onClick={()=>this.jumpTo(move)}>{desc}</span>
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
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
      <div className="mx-auto">
          <img src={logo} alt="logo" className="h-12 my-0 mx-auto" />
      </div>
      <div className="w-full overflow-hidden text-center">
      <p className="text-lg py-2 px-4 my-3">{status}</p>
            <Board 
                squares={current.squares}
                winningTiles={winningTiles}
                onClick={(i)=> this.handleClick(i)}
            />
        </div>
        <div className="my-3 mx-auto">
           <button className="py-2 px-0 m-2 mx-auto focus:outline-none text-black font-semibold cursor-default" >Move History:</button>
           <button className="py-2 px-4 m-2 mx-auto float-right bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75" onClick={()=>this.handleToggleClick()}>{sort}</button>
          </div>
          <div className="text-center">
          <ol className="list-none cursor-pointer list-inside">{moves}</ol>
          {/* <button className="py-2 px-4 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75" onClick={()=>window.location.reload()}>Restart ↺</button> */}
          </div>
        </div>
      </div>
      
    </div>
    <div className="my-10 bottom-5 text-center">
    <a className="text-xs text-sky-900" href="https://www.linkedin.com/in/prakash1994/">by Prakash Chakraborty</a>
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