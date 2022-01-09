import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent implements OnInit {
  @Input() todos!: Todo[];
  allTodosStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(item => todo.id !== item.id);
  }

  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;
    this.todos = this.todos.map(item => {
      return {
        ...item,
        completed: this.allTodosStatus
      }
    });
  }

}
