export default function startServer({io, store, bots}) {
	setInterval(() => store.dispatch({type: 'SPAWN'}), 2000)

	bots.forEach(bot => bot.connect())

	// Push state to clients on change
	store.subscribe(() => io.emit('state', store.getState()))

	io.on('connection', socket => {
		// Send current state on connection
		socket.emit(store.getState())

		// Handle incoming actions
		socket.on('action', action => store.dispatch({...action, client: socket.id}))
	})
}
