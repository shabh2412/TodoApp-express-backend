const express = require("express");
const todosRouter = require("./controller/todos.controller");

const cors = require("cors");

const app = express();
app.use(
	cors({
		origin: [
			`http://localhost:3000`,
			"http://192.168.0.103:3000",
			"https://todo-react-express-shabh2412.vercel.app",
			"https://todo-react-express.vercel.app"
		],
	})
);
app.use("/todos", todosRouter);
app.get("/", (req, res) => {
	res.send("Hello from express app");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server running in port: ${PORT}`);
});
