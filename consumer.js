/**
 * Copyright 2009 Intelligent Sense.
 * All Rights Reserved.
 * 
 * This software is the propietary information of 
 * Intelligent Sense.
 * Use this subject to license terms.
 *
 * Filename: consumer.js
 */

// Global variables declaration
var sq = require('simplequeue');
var client = sq.createRemoteClient();


/**
 * Function to consume the queue messages
 * @param {SimpleQueue} queue : The queue where objects will be processed
 */
function Consumer(pQueue) {

    var self = this;
    
    this.process = function() {
        pQueue.getMessage(function (err, msg) {
            if (err) {
                console.log(err);
            }
            else if (msg != null) {
                console.log(msg.messageName);
            }
            else {
                console.log("Null message");

            }
            
            setTimeout(self.process, 100);
        });
    }
}

// Get the queue reference and initialize consumer process
client.on('remote', function(remote) {
    remote.createQueue('queue', function(err, queue) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        
        (new Consumer(queue)).process();
    });
});

// Connect to the client
client.connect(3000);