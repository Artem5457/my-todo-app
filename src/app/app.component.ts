import { Component, DoCheck } from '@angular/core';
import { Todo } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  todos: Todo[] = [];

  ngDoCheck() {
    console.log(this.todos);
  }

  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
  }
}
