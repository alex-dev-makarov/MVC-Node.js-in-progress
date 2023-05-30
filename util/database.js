const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
	MongoClient.connect(
		"mongodb+srv://sashamakarov28:sashamakarov2823@cluster0.6ux7xyh.mongodb.net/shop?retryWrites=true&w=majority"
	)
		.then((client) => {
			console.log("Connected!");
			_db = client.db();
			cb();
		})
		.catch((err) => console.log(err));
};
const getDB = () => {
	if (_db) {
		return _db;
	}
	throw "no database";
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
