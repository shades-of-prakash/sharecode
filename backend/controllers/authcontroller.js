const bcrypt = require("bcrypt");
const db = require("../config/db.js");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
	const { username, hashedPassword } = req.body;
	try {
		const success = await db.execute(
			"INSERT INTO users (username, hashed_password) VALUES (?, ?)",
			[username, hashedPassword]
		);
		if (success[0].affectedRows === 1) {
			res.json({ success: "User is successfully created" });
		} else {
			res.json({ error: "User creation failed" });
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
}

async function signin(req, res) {
	const { username, password } = req.body;
	try {
		const [rows] = await db.execute(
			"SELECT username, hashed_password FROM users WHERE username = ?",
			[username]
		);
		if (rows.length === 0) {
			return res.status(401).send({
				accessToken: null,
			});
		}
		const isMatch = await bcrypt.compare(password, rows[0].hashed_password);
		if (!isMatch) {
			return res.status(401).send({
				accessToken: null,
				password: false,
			});
		}
		const token = jwt.sign({ id: rows[0].username }, "shadesofprakash", {
			expiresIn: 86400,
		});

		res.status(200).send({
			accessToken: token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
}
async function checkUser(req, res) {
	const { username } = req.body;
	console.log(req.body);
	try {
		const [rows] = await db.execute("select * from users where username=?", [
			username,
		]);
		if (rows && rows[0]?.username) {
			res.status(401).json({ user: true });
		} else {
			res.status(200).json({ user: false });
		}
	} catch (error) {
		console.log(error);
		res.send({ error: error });
	}
}
module.exports = {
	signup,
	signin,
	checkUser,
};
