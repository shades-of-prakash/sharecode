const bcrypt = require("bcrypt");
const db = require("../config/db.js");
async function signup(req, res) {
	const { email, hashedPassword } = req.body;
	try {
		const sucess = await db.execute(
			"insert into users (email,hashed_password) values(?,?)",
			[email, hashedPassword]
		);
		if (sucess[0].affectedRows == 1) {
			res.json({ sucess: "user is sucessfully created" });
		} else {
			res.json({ error: "bhjsuhv" });
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
}
async function signin(req, res) {
	const { email, password } = req.body;
	try {
		const [rows] = await db.execute(
			"SELECT email,hashed_password FROM users where email = ?",
			[email]
		);
		const isMatch = await bcrypt.compare(password, rows[0].hashed_password);
		if (rows.length === 0) {
			// User not found
			return res.status(400).json({ message: "email-is-not-found" });
		}
		if (rows.length === 0 && !isMatch) {
			return res
				.status(400)
				.json({ message: "email-and-password-are-incorrect" });
		}
		if (isMatch) {
			// Password matches
			return res.status(200).json({ message: "password-is-correct" });
		} else {
			// Password does not match
			return res.status(401).json({ message: "password-is-incorrect" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
}
module.exports = {
	signup,
	signin,
};
