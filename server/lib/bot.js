'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = BotSwam;
var bots = [{
	name: 'Sven',
	accuracy: .6, reaction: 1500
}, {
	name: 'Erik',
	accuracy: .4, reaction: 1100
}, {
	name: 'Göran',
	accuracy: .5, reaction: 1400
}];

function BotSwam(count, port) {
	return bots.slice(0, count).map(function (bot) {
		return {
			connect: function connect() {
				var socket = require('socket.io-client')('http://localhost:' + port);
				console.log('Connecting bot: ' + bot.name + '...');

				socket.on('connect', function () {
					return console.log(bot.name + ' with id: ' + socket.id + ' connected.');
				});
				socket.on('state', function (state) {
					state.targets.forEach(function (_ref) {
						var id = _ref.id,
						    pos = _ref.pos;

						if (Math.random() > bot.accuracy) {
							console.log(bot.name + ' missed target: ' + id + ' at position: ' + pos);
						} else {
							setTimeout(function () {
								var action = {
									type: 'WHACK',
									payload: { id: id, pos: pos }
								};
								console.log(bot.name + ' whacking target: ' + id + ' at position: ' + pos);
								socket.emit('action', action);
							}, bot.reaction);
						}
					});

					state.whacks.forEach(function (_ref2) {
						var id = _ref2.id,
						    client = _ref2.client;

						if (client === socket.id) {
							console.log(bot.name + ' hit: ' + id);
						}
					});
				});
			}
		};
	});
}