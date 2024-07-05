const bcrypt = require("bcrypt");
async function hashThePassword(req, res, next) {
	const { password } = req.body;
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.hashedPassword = hashedPassword;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
}
module.exports = {
	hashThePassword,
};
