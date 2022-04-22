import React from "react"

export default function Die(props) {
	return (
		<div	key={props.num} 
				className={`grid-child  ${props.data.isHeld && 'grid-child-hold'}`} 
				onClick={() => props.holdDice(props.data.id)}
				>{props.data.value}</div>
	)
}
