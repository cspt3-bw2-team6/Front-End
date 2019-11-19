import React, { Component } from 'react'
import Controls from './Controls'
import TextBox from './TextBox'
import Graph from './Graph/'
import RoomInfo from './RoomInfo'
import axiosWithAuth from '../../utilities/axiosWithAuth'
import './Game.css'
import traverse from '../../functions/traverseRooms'

export default class Game extends Component {
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

	// save map object to local storage
	saveMap = map => {
		const yourMap = JSON.stringify({ ...map })
		localStorage.setItem('map', yourMap)
	}

	// load map object to state from local storage
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
      .post("/api/adv/move", { direction })
      .then(res => {
        console.log(res);
        const { room_id } = res.data;
        if (!Object.keys(this.state.map).includes(room_id)) {
          // add new room to map
          this.mapNewRoom(res.data);
        }
        // add relevant exit data to last room and this room on map
        this.mapLastRoom(this.state, res.data, direction);

        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

	// Add new room entry to map
	mapNewRoom = roomInfo => {
		const mapCopy = { ...this.state.map }
		const exits = {}
		for (let exit of roomInfo.exits) {
			exits[exit] = '?'
		}
		mapCopy[roomInfo.room_id] = {
			name: roomInfo.name,
			title: roomInfo.title,
			exits: exits,
			coordinates: roomInfo.coordinates,
			terrains: roomInfo.terrain,
			elevation: roomInfo.elevation
		}
		this.saveMap(mapCopy)
		this.setState({ map: { ...mapCopy } })
	}

	// Add relevant exit relationships between lastRoom and thisRoom
	mapLastRoom = (lastRoom, thisRoom, direction) => {
		const oppDir = {
			n: 's',
			s: 'n',
			e: 'w',
			w: 'e'
		}
		const mapCopy = { ...this.state.map }
		const lastRoomDir = oppDir[direction]
		mapCopy[thisRoom.room_id]['exits'][lastRoomDir] = lastRoom.room_id
		mapCopy[lastRoom.room_id]['exits'][direction] = thisRoom.room_id
		this.saveMap(mapCopy)
		this.setState({ map: { ...mapCopy } })
	}

	//Treasure functions
	take = takeit => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/take', { name: takeit })
			.then(res => {
				console.log(res)
				return this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	drop = dropit => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/drop', { name: dropit })
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

	wear = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/wear', { name: `${item}` })
			.then(res => {
				console.log(res)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	undress = item => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/undress', { name: `${item}` })
			.then(res => {
				console.log(res)
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


	fly = direction => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/api/adv/fly', { direction: `${direction}` })
			.then(res => {
				console.log('FLIGHT', res)
				this.refresh(res.data)
			})
			.catch(err => console.log(err))
	}

	changeName = newName => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/adv/change_name', { name: `${newName}` })
			.then(res => {
				console.log('NEW NAME',res)
			})
			.catch(err => console.log(err))
	}

	mine = newProof => {
		axiosWithAuth
			.axiosHeaders()
			.post('/api/bc/mine', { proof: `${newProof}` })
			.then(res => {
				console.log('NEW PROOF',res)
			})
			.catch(err => console.log(err))
	}

	proof = () => {
		axiosWithAuth
			.axiosHeaders()
			.get('/api/bc/last_proof/')
			.then(res => {
				console.log('GET PROOF',res.data)
			})
			.catch(err => console.log(err))
	}

	

	logout = () => {
		this.saveMap(this.state.map)
		localStorage.removeItem('key')
		this.props.history.push('/')
	}

	componentDidMount() {
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
      <div className="game-wrapper">
        <div className="logout-wrapper">
          <button
            className="nes-btn"
            id="logout-button"
            type="button"
            onClick={this.logout}
          >
            <i className="nes-icon close" />
          </button>
        </div>
        <div className="player-panel">
          <div className="controls-wrapper">
            <Controls
              data={this.state}
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
			  fly={this.fly}
			  changeName={this.changeName}
            />
          </div>
          <div className="textbox-wrapper">
            <TextBox info={this.state} />
          </div>
        </div>
        <Graph />
        <RoomInfo {...this.state} />
      </div>
    );
  }

}
