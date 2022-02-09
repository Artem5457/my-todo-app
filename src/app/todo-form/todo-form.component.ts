import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  inputValue: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.ngOnInit1({
      id: 1,
      title: 'history',
      completed: false
    });
  }

  ngOnInit1(a: any): void {
    console.log('ngOnInit1', a);
  }

  onSubmit(): void {
    if (this.inputValue.length > 0) {
      const newId = +new Date();
      const newTodo = {
        id: newId,
        title: this.inputValue,
        completed: false
      }

      this.addTodo.emit(newTodo);
    }

    this.inputValue = '';
  }

}
