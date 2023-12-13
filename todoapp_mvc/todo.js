import { $ } from "./utils.js";

export class Todo {
  constructor(content) {
    this.item = {
      content: content,
      complete: false,
    };
  }

  toggle() {
    this.item = {
      ...this.item,
      complete: !this.item.complete,
    };
    this.label.classList.toggle("done");
  }

  setAttribute(className, type) {
    const obj = {
      add: this.li.classList.add,
      remove: this.li.classList.remove,
      toggle: this.li.classList.toggle,
    };
    obj[type](className);
  }

  remove() {
    this.li.parentNode.removeChild(this.li);
  }

  isCompleted() {
    return this.item.complete;
  }

  getContent() {
    return this.item.content;
  }

  createElement() {
    this.li = document.createElement("li");
    this.input = document.createElement("input");
    this.label = document.createElement("label");
    this.delBtn = document.createElement("button");
    this.input.addEventListener("change", this.toggle.bind(this));
    this.delBtn.addEventListener("click", this.remove.bind(this));
    this.delBtn.classList.add("del-btn");
    this.delBtn.textContent = "X";
    this.label.textContent = this.getContent();
    this.input.type = "checkbox";
    this.li.appendChild(this.input);
    this.li.appendChild(this.label);
    this.li.appendChild(this.delBtn);
    return this.li;
  }

  domRender() {
    return this.li;
  }

  render() {
    this.createElement();
    return this.domRender();
  }
}

export class TodoList {
  constructor() {
    this.todoList = [];
    $(".clear-btn").addEventListener("click", this.removeComplete.bind(this));
    $(".show-all-btn").addEventListener("click", this.toggleAll.bind(this));
    $(".show-active-btn").addEventListener(
      "click",
      this.toggleActive.bind(this)
    );
    $(".show-complete-btn").addEventListener(
      "click",
      this.toggleComplete.bind(this)
    );
  }

  add(item) {
    const todo = new Todo(item);
    this.todoList.push(todo);
    $(".todo-list-container").appendChild(todo.render());
  }

  toggleAll() {
    this.todoList.forEach((todo) => {
      todo.domRender().classList.remove("hidden");
    });
  }

  toggleActive() {
    this.todoList.forEach((todo) => {
      if (todo.isCompleted()) {
        todo.domRender().classList.add("hidden");
      } else {
        todo.domRender().classList.remove("hidden");
      }
    });
  }

  toggleComplete() {
    this.todoList.forEach((todo) => {
      if (!todo.isCompleted()) {
        todo.domRender().classList.add("hidden");
      } else {
        todo.domRender().classList.remove("hidden");
      }
    });
  }

  removeComplete() {
    this.todoList = this.todoList.filter((todo) => {
      if (todo.isCompleted()) {
        todo.remove();
        return false;
      }
      return true;
    });
  }
}
