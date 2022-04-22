import React from 'react'
import GameView from './components/GameView'

import './style.css'

export default function App() {
	return (
		<main>
			<GameView />	
			<div className="sign_div center">
				<p className="sign">BUILD BY: <a href="" className="sign_a">Abrar Ajaz Wani</a></p>
			</div>
		</main>
	)
}
