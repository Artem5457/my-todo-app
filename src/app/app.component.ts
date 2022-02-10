import { Component, DoCheck, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Todo } from './interface';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  // todos$ = new BehaviorSubject<Todo[]>([]);
  todos: Todo[] = this.locStorage.getLocalStorage('todos');
  notCompletedTodos: Todo[] = this.todos.filter(todo => !todo.completed);
  buttonStatus: boolean = false;
  filter: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    // const filter = this.route.snapshot.queryParamMap.get('filter');
    this.route.queryParams.subscribe((value) => {
      console.log('Filter: from subscribe', value);
      this.filter = value['filter'];
      console.log('Filter: ', this.filter);
    });

    // this.todos$.next([{
    //   id: 12,
    //   title: 'fdjklg',
    //   completed: false
    // }])


    // this.todos$.subscribe((todos) => {
    //   console.log('todos from Subject', todos)
    // })
  }

  ngDoCheck() {
    console.log('Todos: ', this.todos);
    this.notCompletedTodos = this.todos.filter(todo => !todo.completed);
    this.buttonStatus = this.todos.some(el => el.completed);
  }

  // This method filters todolist by click
  onFilterChange(value: string) {
    this.router.navigate([''], { queryParams: { filter: value}});
  }

  // Next methods transform list
  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
    // this.todos$.next(this.todos);
    this.locStorage.setLocalStorage('todos', this.todos);
  }

  updateTodos(allTodosStatus: boolean) {
    this.todos = this.todos.map(item => {
      return {
        ...item,
        completed: allTodosStatus
      }
    });

    this.locStorage.setLocalStorage('todos', this.todos);
  }

  completedRemove() {
    this.router.navigate([''], { queryParams: null});
    this.todos = this.todos.filter(item => !item.completed);
    this.locStorage.setLocalStorage('todos', this.todos);
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(item => todo.id !== item.id);
    this.locStorage.setLocalStorage('todos', this.todos);
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

    this.locStorage.setLocalStorage('todos', this.todos);
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

    this.locStorage.setLocalStorage('todos', this.todos);
  }

  todoFilter() {
    console.log('todoFilter');
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(item => item.completed === false);
    }

    return this.todos.filter(item => item.completed === true);

  }
}
