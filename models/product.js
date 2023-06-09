const getDB = require("../util/database").getDB;
const mongoDb = require("mongodb");
class Product {
	constructor(title, price, description, imageUrl, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id ? new mongoDb.ObjectId(id) : null;
	}
	save() {
		const db = getDB();
		let dbOperation;
		if (this._id) {
			dbOperation = db
				.collection("products")
				.updateOne({ _id: this._id }, { $set: this });
		} else {
			dbOperation = db.collection("products").insertOne(this);
		}
		return dbOperation
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static fetchAll() {
		const db = getDB();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => products)
			.catch((err) => console.log(err, "s"));
	}
	static fetchById(id) {
		const db = getDB();
		return db
			.collection("products")
			.find({ _id: new mongoDb.ObjectId(id) })
			.next()
			.then((product) => {
				return product;
			})
			.catch((err) => console.log(err));
	}
	static deleteById(id) {
		const db = getDB();
		return db
			.collection("products")
			.deleteOne({ _id: new mongoDb.ObjectId(id) })
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	}
}
module.exports = Product;
// // const fs = require("fs");
// // const path = require("path");
// const db = require("../util/database");
// const Cart = require("./cart");

// // const p = path.join(
// // 	path.dirname(process.mainModule.filename),
// // 	"data",
// // 	"products.json"
// // );

// const getProductsFromFile = (cb) => {
// 	// fs.readFile(p, (err, fileContent) => {
// 	// 	if (err) {
// 	// 		cb([]);
// 	// 	} else {
// 	// 		cb(JSON.parse(fileContent));
// 	// 	}
// 	// });
// };

// module.exports = class Product {
// 	constructor(id, title, imageUrl, description, price) {
// 		this.id = id;
// 		this.title = title;
// 		this.imageUrl = imageUrl;
// 		this.description = description;
// 		this.price = price;
// 	}

// 	save() {
// 		return db.execute(
// 			"INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)",
// 			[this.title, this.imageUrl, this.description, this.price]
// 		);
// 		// getProductsFromFile((products) => {
// 		// 	if (this.id) {
// 		// 		const existingProductIndex = products.findIndex(
// 		// 			(prod) => prod.id === this.id
// 		// 		);
// 		// 		const updatedProducts = [...products];
// 		// 		updatedProducts[existingProductIndex] = this;
// 		// 		fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// 		// 			console.log(err);
// 		// 		});
// 		// 	} else {
// 		// 		this.id = Math.random().toString();
// 		// 		products.push(this);
// 		// 		fs.writeFile(p, JSON.stringify(products), (err) => {
// 		// 			console.log(err);
// 		// 		});
// 		// 	}
// 		// });
// 	}

// 	static deleteById(id) {
// 		// getProductsFromFile((products) => {
// 		// 	const product = products.find((prod) => prod.id === id);
// 		// 	const updatedProducts = products.filter((prod) => prod.id !== id);
// 		// 	fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// 		// 		if (!err) {
// 		// 			Cart.deleteProduct(id, product.price);
// 		// 		}
// 		// 	});
// 		// });
// 	}

// 	static fetchAll() {
// 		return db.execute("SELECT * FROM products");
// 		// getProductsFromFile(cb);
// 	}

// 	static findById(id) {
// 		return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
// 		// getProductsFromFile((products) => {
// 		// 	const product = products.find((p) => p.id === id);
// 		// 	cb(product);
// 		// });
// 	}
// };

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Product = sequelize.define("product", {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		allowNull: false,
// 		primaryKey: true,
// 	},
// 	title: Sequelize.STRING,
// 	price: {
// 		type: Sequelize.DOUBLE,
// 		allowNull: false,
// 	},
// 	imageUrl: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	description: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// });
