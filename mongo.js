var MongoClient = require('mongodb').MongoClient,
	settings = require('./settings');
MongoClient.connect("mongodb://"+settings.db_host+"/"+settings.db, (err, client) => {
	if (err) { return console.dir(err); }
	console.log("connected to db!!!");

	const db = client.db("nodedb");
	db.collection("users", (err, collection) => {
		var docs = [
			{name: "shuya", score: 40},
			{name: "hogeman", score: 30},
			{name: "fugakun", score: 50},
		];
		collection.insert(docs, (err, result) => {
			console.dir(result);
			client.close();
		});
		// collection.find({name: "shuya"}).toArray((err, items) => {
		// 	console.log(items);
		// });
		
		//データが多すぎるときはfindよりもstreamが好ましい
		var stream = collection.find().stream();
		stream.on("data", item => {
			console.log(item);
		});
		stream.on("end", () => {
			console.log("finished");
		})
	});
});