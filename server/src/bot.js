const bots = [{
	name: 'Sven',
	accuracy: .6, reaction: 1500
}, {
	name: 'Erik',
	accuracy: .4, reaction: 1100
}, {
	name: 'Göran',
	accuracy: .5, reaction: 1400
}]

export default function BotSwam(count, port) {
	return bots.slice(0, count).map(bot => ({
			connect() {
				const socket = require('socket.io-client')(`http://localhost:${port}`)
				console.log(`Connecting bot: ${bot.name}...`)

				socket.on('connect', () => console.log(`${bot.name} with id: ${socket.id} connected.`))
				socket.on('state', state => {
					state.targets.forEach(({id, pos}) => {
						if (Math.random() > bot.accuracy) {
							console.log(`${bot.name} missed target: ${id} at position: ${pos}`)
						} else {
							setTimeout(() => {
								const action = {
									type: 'WHACK',
									payload: {id, pos}
								}
								console.log(`${bot.name} whacking target: ${id} at position: ${pos}`)
								socket.emit('action', action)
							}, bot.reaction)
						}
					})

					state.whacks.forEach(({id, client}) => {
						if (client === socket.id) {
							console.log(`${bot.name} hit: ${id}`)
						}
					})
				})
			}
		}))
}
