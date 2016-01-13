/**
 * Created by svenlee on 15/12/18.
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;


module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe:true});


