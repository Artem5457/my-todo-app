import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onRemove: EventEmitter<Todo> = new EventEmitter<Todo>();
  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  changeMode() {
    this.editMode = true;
  }

  removeItem() {
    this.onRemove.emit(this.todo);
  }

}
