'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _route = require('./routes/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// const port = parseInt(process.env.PORT, 10) || 8000;
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev'));
app.use('/api/v1', _route2.default);

app.all('*', function (req, res) {
  return res.status(404).send({
    status: 'error',
    messsage: 'Not found'
  });
});
// app.listen(port, () => console.log(`listening on ${port}`) );

exports.default = app;