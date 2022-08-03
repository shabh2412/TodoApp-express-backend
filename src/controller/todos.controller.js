const fs = require("fs");
let todoString = fs.readFileSync(`${__dirname}/../data/todo.json`, {
	encoding: "utf8",
});
let todos = JSON.parse(todoString);

const updateDB = (data) => {
	fs.writeFileSync(`${__dirname}/../data/todo.json`, JSON.stringify(data));
};

const express = require("express");

const todosRouter = express.Router();

todosRouter.use(express.json());

todosRouter.get("/", (req, res) => {
	res.send(todos);
});

todosRouter.post("/", (req, res) => {
	let body = req.body;
	let id = todos.length + 1;
	body.id = id;
	todos.push(body);
	updateDB(todos);
	res.status(200).send(body);
});

todosRouter.put("/:id", (req, res) => {
	let id = +req.params.id;
	let body = req.body;
	console.log(body);
	todos = todos.map((todo) => {
		if (todo.id === id) {
			return body;
		}
		return todo;
	});
	updateDB(todos);
	res.status(200).send(body);
});

todosRouter.delete("/:id", (req, res) => {
	const id = +req.params.id;
	const newTodos = todos.filter((todo) => todo.id !== id);
	if (todos.length === newTodos.length) {
		return res.status(404).send(`Invalid ID`);
	}
	todos = newTodos;
	updateDB(todos);
	res.status(200).send(`Task ${id} deleted successfully`);
});

module.exports = todosRouter;
