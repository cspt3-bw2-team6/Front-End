import React, { Component } from 'react'
import Controls from './Controls'
import TextBox from './TextBox'
import Graph from './Graph/'
import RoomInfo from './RoomInfo'
import axiosWithAuth from '../../utilities/axiosWithAuth'
import './Game.css'
import traverse from '../../functions/traverseRooms'

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.canvasRef = React.createRef()
	}
	state = {
		uuid: '',
		room_id: 0,
		name: '',
		title: '',
		exits: [],
		description: '',
		coordinates: '',
		terrain: '',
		elevation: '',
		cooldown: 0,
		items: [],
		messages: [],
		players: [],
		error_msg: '',
		map: {}
	}

	refresh(data) {
		return this.setState({
			...data
		})
	}

	saveMap = map => {
		const yourMap = JSON.stringify({ ...map })
		localStorage.setItem('map', yourMap)
	}

	loadMap = () => {
		const yourMap = localStorage.getItem('map')
		if (!!yourMap) {
			this.setState({
				map: JSON.parse(yourMap)
			})
		}
	}

	autoTraversal() {
		traverse()
	}

	movePlayer = direction => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/move', { direction })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	//Treasure functions
	take = takeit => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/take', { takeit })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	drop = dropit => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/drop', { dropit })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	sell = treasure => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/sell', { name: `${treasure}` })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	status = checkStatus => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/status', { checkStatus })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	examine = subject => {
		// subject parameter is string with name of object or player
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/examine', { name: `${subject}` })
			.then(res => {
				console.log('examine response', res.data)
				this.refresh(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

  //Equipement 
	wear = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/wear', { name: `${item}` })
			.then(res => {
				console.log('WEAR',res.data)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
  }
  
  undress = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/undress', { name: `${item}` })
			.then(res => {
				console.log('UNDRESS', res.data)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	change = name => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/change_name', { name: `${name}` })
			.then(res => {
				console.log('NEW NAME',res)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	

	ghostCarry = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/carry/', { name: item })
			.then(res => {
				console.log('ghost carry res', res.data)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	ghostReceive = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/receive')
			.then(res => {
				console.log('ghost receive res', res.data)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
  }
  
  fly = direction => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/api/adv/fly', { direction: `${direction}` })
			.then(res => {
				console.log('FLIGHT',res)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	shrine = () => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/pray')
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	logout = () => {
		this.saveMap(this.state.map)
		localStorage.removeItem('key')
		this.props.history.push('/')
	}

	componentDidMount() {
		const canvas = this.canvasRef.current
		const context = canvas.getContext('2d')
		context.rect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < 20; i++) {
			for (let j = 0; j < 20; j++) {
				context.beginPath()
				context.fillStyle = ['#FFFFFF', '#343434'][(i + j) % 2]
				context.fillRect(j * 30, i * 30, 30, 30)
				context.closePath()
			}
		}
		this.loadMap()
		axiosWithAuth
			.axiosHeaders()
			.get('/api/adv/init/')
			.then(res => {
				console.log(res)
				this.setState({
					...res.data
				})
			})
	}

	render() {
		return (
			<div className='game-wrapper'>
				<div className='logout-wrapper'>
					<button
						className='nes-btn'
						id='logout-button'
						type='button'
						onClick={this.logout}
					>
						<i className='nes-icon close' />
					</button>
				</div>
				<div className='player-panel'>
					<div className='controls-wrapper'>
						<Controls
							takeit={this.take}
							dropit={this.drop}
							sellit={this.sell}
							status={this.status}
							move={this.movePlayer}
							examine={this.examine}
							autoTraversal={this.autoTraversal}
							ghostCarry={this.ghostCarry}
							ghostReceive={this.ghostReceive}
							praying={this.shrine}
							wear={this.wear}
							undress={this.undress}
              nameChange={this.change}
              fly={this.fly}
						/>
					</div>
					<div className='textbox-wrapper'>
						<TextBox info={this.state} />
					</div>
				</div>
				<Graph />
				<RoomInfo {...this.state} />
			</div>
		)
	}
}
