/**
 * Copyright 2009 Intelligent Sense.
 * All Rights Reserved.
 * 
 * This software is the propietary information of 
 * Intelligent Sense.
 * Use this subject to license terms.
 *
 * Filename: server.js
 */

// Starts the Queue remote server
RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
var queueName = "myqueue";


rsmq.createQueue({qname:queueName}, function (err, resp) {
		if (resp===1) {
			console.log("queue created")
		}
});

