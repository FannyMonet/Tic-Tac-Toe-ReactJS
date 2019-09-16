/* eslint-disable no-unused-vars */
import React from 'react';
import Board from './Board';

class Game extends React.Component {
	state={
		currentPlayer: 'X',
		history: [Array(9).fill(null)],
		step: 0
	}
	calculateWinner() {
		const squares = this.state.history[this.state.step];
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
		const history = this.state.history;
		const squares = history[this.state.step].slice();
		if(squares[i]!==null)
			return null;
		const step = this.state.step + 1;
		squares[i] = this.state.currentPlayer;
		history.splice(step);
		history[step] = squares;
		this.setState(prevState => ({
			currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
			step: step,
			history: history
		}));
	}
	handleHistoryClick(step) {
		this.setState({
			step:step,
			currentPlayer: (step % 2) === 0 ? 'X' : 'O'
		});
	}
	render() {
		const winner = this.calculateWinner();
		const history = this.state.history;
		const squares = history[this.state.step];
		const info = winner ?
			<p>Winner : {winner}</p> :
			<p>Next Player: {this.state.currentPlayer}</p>;
		const historyMenu = history.map((move, step) => {
			const description = step === 0 ? 'Go to game start' : 'Go to move #' + step;
			return(
				<li key={step}>
					<button onClick={() => this.handleHistoryClick(step)}>{description}</button>
				</li>
			);
		});
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={squares} currentPlayer={this.state.currentPlayer} handleClick={i => this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<div>{info}</div>
					<ol>{historyMenu}</ol>
				</div>
			</div>
		);
	}
}

export default Game;
