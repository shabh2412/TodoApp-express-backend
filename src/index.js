const express = require("express");
const todosRouter = require("./controller/todos.controller");

const cors = require("cors");

const app = express();
app.use(
	cors({
		origin: [`http://localhost:3000`, "http://192.168.0.103:3000"],
	})
);
app.use("/todos", todosRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server running in port: ${PORT}`);
});
