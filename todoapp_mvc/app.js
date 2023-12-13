import { $ } from "./utils.js";
import { TodoList } from "./todo.js";

class App {
  constructor() {
    this.todo = new TodoList();
    $(".todo-name").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.todo.add(e.target.value);
        e.target.value = "";
      }
    });
  }

  render() {}
}

window.onload = () => {
  const app = new App();
  app.render();
};
