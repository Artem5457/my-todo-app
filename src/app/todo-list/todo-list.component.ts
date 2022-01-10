import { Component, DoCheck, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent implements DoCheck {
  @Input() todos!: Todo[];
  @Output() sendTodos: EventEmitter<Todo[]> = new EventEmitter<Todo[]>();
  allTodosStatus: boolean = false;

  constructor() { }

  ngDoCheck(): void {
    // console.log('Todo-list: ', this.todos);
  }

  //  Спросить за правильное изменение todos
  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;
    this.todos = this.todos.map(item => {
      return {
        ...item,
        completed: this.allTodosStatus
      }
    });

    this.sendTodos.emit(this.todos);
  }
}
