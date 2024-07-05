const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authroute.js");
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(authRouter);
app.listen(3000, () => {
	console.log("Server is listening on port:3000");
});
