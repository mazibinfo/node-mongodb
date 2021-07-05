const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
   
    console.log('Connected corectly to the server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name":"Uthapizza","description":"test"},(err,result) => {
        assert.equal(err, null);
        console.log('After inserting:\n');
        console.log(result.ops);
        
        collection.find({}).toArray((err,doc) => {
            assert.equal(err, null);
            console.log('Found:\n');
            console.log(doc);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        })
    })

})