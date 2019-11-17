import React from 'react'
import './Graph.css'


class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.canvasRef = React.createRef()
	}

	componentDidMount() {
		const canvas = this.canvasRef.current
		const context = canvas.getContext('2d')
		context.rect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < 20; i++) {
			for (let j = 0; j < 20; j++) {
				context.beginPath();
				context.fillStyle = ["#FFFFFF", "#343434"][(i + j) % 2];
				context.fillRect(j * 30, i * 30, 30, 30);
				context.closePath();
			}
		}
	}

	render() {
		return (
			<div>
				<canvas className = 'canvas' ref={this.canvasRef} />
			</div>
		)
	}
}

export default Graph
