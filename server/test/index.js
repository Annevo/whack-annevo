import test from 'ava'

test(t => {
		const socket = require('socket.io-client')(`http://localhost:8090`)
		socket.emit('action', {
			type: 'WHACK',
			payload: 3
		})

		socket.on('state', state => {
			console.log('STATE', state)
		})

	socket.on('connect', () => {
		console.log('connected')
	})
	// t.deepEqual([1, 2], [1, 2])
})
