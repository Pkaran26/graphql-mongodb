const MongoClient = require('mongodb').MongoClient;

const connection = ()=>{
  return new Promise((resolve, reject)=>{
    MongoClient.connect(
      'mongodb://localhost:27017/',
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if(err)
         reject('')
        const db = client.db('blog');
        resolve(db)
    });
  })
}

module.exports = connection
