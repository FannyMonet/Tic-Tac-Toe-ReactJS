/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square 
				value={this.props.squares[i]} 
				onClick={() => this.props.handleClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	state={
		squares: Array(9).fill(null),
		currentPlayer: 'X',
	}
	calculateWinner() {
		const squares = this.state.squares;
		const lines=[
			[0, 1, 2],
			[2, 3, 4],
			[5, 6, 7],
			[0, 4, 8],
			[2, 4, 6],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8]
		];
		for(let i=0; i<lines.length; i++){
			const[a, b, c] = lines[i];
			if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c])
				return squares[a];
		}
		return null;
	}
	handleClick(i) {
		const squares = this.state.squares;
		if(squares[i]!==null)
			return null;
		squares[i] = this.state.currentPlayer;
		this.setState(prevState => ({
			squares: squares,
			currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X'
		}));
	}
	render() {
		const winner = this.calculateWinner();
		const info = winner ?
			<p>Winner : {winner}</p> :
			<p>Next Player: {this.state.currentPlayer}</p>;
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={this.state.squares} currentPlayer={this.state.currentPlayer} handleClick={i => this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<div>{info}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
