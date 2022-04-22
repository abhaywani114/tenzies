import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function GameView() {
	const [diceArr, setDiceArr]	= React.useState( () => allNewDice());
	const [tenzies, setTenzies] = React.useState(false);
	const [rollCount, setRollCount] = React.useState(0);

	function allNewDice() {
		const randomNumbers = [];
		for (let i = 0; i < 10; i++)
			randomNumbers.push({
				value:Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid()
			})
		return randomNumbers;
	}


	function rollDice() {
		const newDiceArr = allNewDice();
		setDiceArr(prevArray => prevArray.map((p) => {
			if (p.isHeld && !tenzies)
				return p;
			else
				return newDiceArr.pop();
		}));

		setRollCount(c => tenzies ? 0:++c);

		if (tenzies) { 
			setTenzies(false); 
		}
	}

	function holdDice(id) {
		setDiceArr(prevArray => prevArray.map( (d) => {
			if (d.id === id)
				d.isHeld = !d.isHeld;
			return d;
		}));
	}

	const diceElement = diceArr.map( i => {
		return <Die key={i.id} data={i} holdDice={holdDice} />
	});

	React.useEffect( () => {
		let win = true, prevNum, misc = false;
		diceArr.forEach( dice => {
			if (misc == false && dice.isHeld) {
				prevNum = dice.value;
				misc = true;
			}

			win = win && dice.isHeld && prevNum === dice.value;
			prevNum = dice.value;
		});
	
		if (win) {
			setTenzies(true);
		}
	}, [diceArr]);

	return (
		<div className="main--contianer">
			{tenzies && <Confetti />}
			<div className="">
				<h1 className="main--headding">Tenzies</h1>
				<h2 
					className="main--sub-headding">
						Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
				</h2>
			</div>
			<div className="grid-container">
				{diceElement}
			</div>
			<div className="center">
				<button onClick={rollDice} className="roll-btn">{tenzies ? "New Game":"Roll"} ({rollCount})</button>
			</div>

		</div>
	)
} 
