import { AppComponent } from "./app.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalStorageService} from "./localStorage.service";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Todo} from "./interface";

// 1) Write all classes here with Outputs;
// 2) Get this element by tag-name;
@Component({
  selector: 'app-todo-list',
  template: '',
})
export class TodoListComponent {
  @Output() sendToggleAllStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
}

@Component({
  selector: 'app-todo-form',
  template: ''
})
export class TodoFormComponent {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Output() onRemove: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onChange: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onChangeTitle: EventEmitter<Todo> = new EventEmitter<Todo>();
}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const storageStub: LocalStorageService = { getLocalStorage: () => [{
        id: 3,
        title: 'gg',
        completed: true,}],
    setLocalStorage: () => {} // Question
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoFormComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: LocalStorageService,
          useValue: storageStub
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    component.todos = [
      {
        id: 1,
        title: '',
        completed: false
      },
      {
        id: 2,
        title: '',
        completed: false
      },
      {
        id: 3,
        title: '',
        completed: false
      }
    ];

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
})

  it('should create AppComponent', () => {
    // spy.toHaveBeenCalledWith('todo', [])

    // // instance.onChangeTitle.emit({
    // //   id: 1,
    // //   title: 'history',
    // //   completed: false
    // });
    expect(component).toBeTruthy();
  });
})
