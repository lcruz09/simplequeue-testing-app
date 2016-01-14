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
var simplequeue = require('simplequeue');
simplequeue.createRemoteServer().listen(3000);
console.log('Listening at 3000');
