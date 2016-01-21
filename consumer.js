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

RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
var queueName = "myqueue";


/**
 * Function to consume the queue messages
 * @param {SimpleQueue} queue : The queue where objects will be processed
 */
function Consumer() {

    var self = this;
    
    this.process = function() {

        rsmq.receiveMessage({qname : queueName}, function (err, resp) {

          
            if (resp.id) {
                var message = JSON.parse(resp.message);
                console.log(message.messageName);
                deleteMessage(resp);
            }
            else {
                console.log("No messages for me...")
            }


            setTimeout(self.process, 100);
        });
    }
}

function deleteMessage(pMessage) {

    rsmq.deleteMessage({qname : queueName, id:pMessage.id}, function (err, resp) {

        if (resp===1) {
            //console.log("Message deleted.") 
        }
        else {
            //console.log("Message not found.")
        }
    });
}

(new Consumer()).process();


// Get the queue reference and initialize consumer process