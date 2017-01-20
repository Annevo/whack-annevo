'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = startServer;
function startServer(_ref) {
	var io = _ref.io,
	    store = _ref.store,
	    bots = _ref.bots;

	setInterval(function () {
		return store.dispatch({ type: 'SPAWN' });
	}, 2000);

	bots.forEach(function (bot) {
		return bot.connect();
	});

	// Push state to clients on change
	store.subscribe(function () {
		return io.emit('state', store.getState());
	});

	io.on('connection', function (socket) {
		// Send current state on connection
		socket.emit(store.getState());

		// Handle incoming actions
		socket.on('action', function (action) {
			return store.dispatch(_extends({}, action, { client: socket.id }));
		});
	});
}