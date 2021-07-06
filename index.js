const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url).then((client) => {
    // assert.equal(err, null);
   
    console.log('Connected corectly to the server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {"name":"Vadonut", "description":"test"}, "dishes")
    .then((result) => {
        console.log("Insert document:\n ", result.ops);
    
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        console.log("Found documents:\n ", docs);
    
        return dboper.updateDocument(db, {"name" : "Vadonut"}, {"description" : "Updated test"}, "dishes");
    })
    .then((result) => {
        console.log("Updated document:\n ", result.result);
    
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        console.log("Found Updated document:\n ", docs);
    
        return db.dropCollection("dishes");
    })
    .then((result) => {
        console.log("Droped collection: ", result);
        return client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));