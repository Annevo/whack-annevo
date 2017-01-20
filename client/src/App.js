import React, { Component } from 'react'
import io from 'socket.io-client'

import Grid from './Grid'
import WhackList from './WhackList'

class App extends Component {
  // socket = io('http://localhost:' + 3000)
	socket = io('https://whack-annevo.herokuapp.com/')
	state = {
		status: 'connecting',
		targets: [],
		whacklist: [],
		whacks: []
	}
	componentWillMount() {
		this.socket.on('connect', () => this.setState({status: 'connected'}))
		this.socket.on('state', state => this.setState(state))
	}
	hit = ({id, pos}) =>
		this.socket.emit('action', {type: 'WHACK', payload: {id, pos}})

	render() {
		const {boardSize, status, targets, whacklist, whacks} = this.state
		console.log(this.state)
		return (
			<div>
				{status === 'connecting'
					? <pre>connecting...</pre>
					: (
						<div style={{display: 'flex'}}>
							<WhackList whacklist={whacklist}/>
							<Grid
								socketId={this.socket.id}
								targets={targets}
								whacks={whacks}
								photos={whacklist.reduce((photos, p) => ({...photos, [p.id]: p.photoURL}), {})}
								onClick={this.hit}
							/>
						</div>
					)
				}
			</div>
		)
	}
}

export default App
