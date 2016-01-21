/**
 * Copyright 2009 Intelligent Sense.
 * All Rights Reserved.
 * 
 * This software is the propietary information of 
 * Intelligent Sense.
 * Use this subject to license terms.
 *
 * Filename: producer.js
 */

// Global variables declaration
RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
var threads = require('webworker-threads');
var maxProducts = 30;
var maxThreads = 8;
var queueName = 'myqueue';

/**
 * Gets a random number in the specified range
 * @param  {Integer} from : The start number range
 * @param  {Integer} to : The end number range
 * @return {Integer} The random number obtained
 */
function getRandomInteger(from, to) {
    return from + Math.floor(Math.random()*(to-from));
}

/**
 * Producer function that sends objects to the simple queue
 * @param {SimpleQueue} pQueue : The queue where the messages will be sent
 * @param {String} pName  [description]
 */
function Producer(pName) {

    var self = this;
    var productNo = 0;

    this.process = function() {


        var messageName = pName +  ", product: " + productNo;

        // Metrix test object
        var message = { 
            messageName : messageName,
            _id : "54cbc587f2697ce40a56d1d3",
            relatedClientsTags : [ "#bac" ],
            relatedClientsNames : [ "Bac San Jose" ],
            nameSpace : "Noticias Repretel",
            tagSpace : "#noticiasrepretel",
            mediaType : "Televisión",
            title : "CR7 v5",
            description : "descripcion de la nota",
            date : "2015-01-30T17:54:50.258+0000",
            publicity : 0,
            noticeType : "Publicidad",
            Alcance : 0,
            link : "",
            Edicion : "Matutina", 
            Duración : { 
                seconds : 30,
                minutes : 1,
                hours : 0 
            },
            Sentimiento : "Positivo",
            sendedAlmostOnce : false,
            userModifications : { 
                tag : "#josue",
                timestamp : { 
                    date : "2015-01-30T17:55:19.394+0000" 
                } 
            },
            state : "Completo",
            sectorsNames : [ "Futbol" ],
            sectorsTags : [ "#futbol" ],
            clientsTags : [ "#cr7" ],
            clientsNames : [ "CR7" ],
            clients : [ 
                { 
                    fields : 
                    [
                        { 
                            options : [ "Positivo", "Neutro", "Negativo" ],
                            open : false,
                            measurable : false,
                            required : true,
                            fieldType : "Lista de items", 
                            defaultValue : "Positivo,Neutro,Negativo",
                            name : "Sentimiento",
                            value : "Positivo",
                            disabled : false 
                        } 
                    ],
                    tag : "#cr7",
                    name : "CR7" } 
            ],
            __v : 0 
        }

        // Send a message to the created queue, message can only be a string
        rsmq.sendMessage({qname: queueName, message: JSON.stringify(message)}, function (err, resp) {
                
            if(err)
            {
                console.log(err);
                process.exit();
            }

            if (resp) {
                console.log(message.messageName);
            }
        });

        productNo++;
        if(productNo < maxProducts) {
            setTimeout(self.process, getRandomInteger(500, 700));
        }
    }
}



// Initialize threads
for (threadNo = 0; threadNo < maxThreads; threadNo++) { 
    (new Producer("Producer: " + threadNo)).process();
}

