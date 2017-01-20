'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _redux = require('redux');

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var index = _path2.default.join(__dirname, 'index.html');

var server = (0, _express2.default)().use(function (req, res) {
  return res.sendFile(index);
}).listen(port, function () {
  return console.log('Listening on ' + port);
});

var io = (0, _socket2.default)(server);
var store = (0, _redux.createStore)(_reducers2.default);
var botCount = process.env.NODE_ENV === 'production' ? 0 : 3;

var bots = (0, _bot2.default)(botCount, port);

(0, _server2.default)({ io: io, store: store, bots: bots });