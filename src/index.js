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
	state={
		currentPlayer: 'X',
		squares: Array(9).fill(null)
	}
	handleClick(i) {
		if(this.state.squares[i]!==null)
			return null;
		const squares = this.state.squares;
		squares[i] = this.state.currentPlayer;
		this.setState(prevState => ({
			currentPlayer: prevState.currentPlayer==='X' ? 'O' : 'X',
			squares: squares
		}));
	}
	renderSquare(i) {
		return (
			<Square 
				value={this.state.squares[i]} 
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		const status = 'Next player: ' + this.state.currentPlayer;

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
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
