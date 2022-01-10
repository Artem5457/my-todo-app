import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  notCompletedTodos: Todo[] = this.todos.filter(todo => !todo.completed);
  // visibleTodos!: Todo[];
  buttonStatus: boolean = false;
  // filter: string = 'all';
  // filter!: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngDoCheck() {
    console.log('Todos: ', this.todos);
    // console.log('visibleTodos: ', this.visibleTodos);
    this.notCompletedTodos = this.todos.filter(todo => !todo.completed);
    this.buttonStatus = this.todos.some(el => el.completed);
  }

  // This method filters todolist by click
  onFilterChange(value: string) {
    // this.router.navigate([''], { queryParams: { filter: value}});

    // const filter = this.route.snapshot.queryParamMap.get('filter');

    // console.log('Filter: ', filter);

    // -----------------------------------------------------------------------------------------

    // My second trial
    // this.filter = value;

    // this.visibleTodos = this.filter === 'all' 
    //   ? this.todos
    //   : this.todos.filter(item => {
    //     if (this.filter === 'active') {
    //       return !item.completed;
    //     }

    //     return item.completed;
    //   });
  }

  // Next methods transform list
  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  updateTodos(todos: Todo[]) {
    this.todos = todos;
  }

  completedRemove() {
    this.todos = this.todos.filter(item => !item.completed);
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(item => todo.id !== item.id);
  }

  changeStatus(todo: Todo) {
    this.todos = this.todos.map(item => {
      if ( item.id === todo.id ) {
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item;
    });
  }

  changeTitle(todo: Todo) {
    this.todos = this.todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...todo
        }
      }

      return item;
    });
  }
}
