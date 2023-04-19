import mongoose from "mongoose";
import qrCode from "qrcode-terminal";
import { Client, RemoteAuth } from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import "./db";
import config from "./config";
import { UserProfile } from "./models/profile.model";

(async () => {
	await mongoose.connect(config.DB.MONGO_URI!, {
		keepAlive: true,
	});
	const store = new MongoStore({ mongoose });
	const client = new Client({
		puppeteer: {
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		},
		authStrategy: new RemoteAuth({
			store: store,
			backupSyncIntervalMs: 60000,
		}),
	});
	client.initialize();

	client.on("qr", (qr) => {
		qrCode.generate(qr, { small: true });
	});

	client.on("ready", () => {
		console.log("Client is ready!");
		msgHandler(client);
	});
})().catch((error) => console.error(error));

const msgHandler = (client: Client) => {
	client.on("message", async (msg) => {
		let user = await UserProfile.findOne({ userId: msg.from });
		console.log("Received : ", msg.from, msg.body);
		if (!user) {
			if (msg.body.startsWith("!")) {
				msg.reply("Hi, whats your name");
				await UserProfile.create({
					userId: msg.from,
					state: "Name",
				});
			}
		} else {
			if (user.state == "Name") {
				user.name = msg.body;
				user.state = "None";
				await user.save();
			}
			msg.reply("Hi " + user.name + "!");
		}
	});
};
