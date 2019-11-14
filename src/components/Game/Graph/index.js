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
