require("dotenv").config();

let NODE_ENV = process.env.NODE_ENV || "development";

const config = {
	NODE_ENV,
	DB: {
		MONGO_URI: process.env.MONGO_URI,
	},
};

export default config;
