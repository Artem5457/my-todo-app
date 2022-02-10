import { AppComponent } from "./app.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalStorageService} from "./localStorage.service";
import {Component, DoCheck, EventEmitter, InjectionToken, Input, Output, ViewEncapsulation} from "@angular/core";
import {Todo} from "./interface";

@Component({
  selector: 'app-todo-list',
  template: '',
})

// 1) Write all classes here with Outputs;
// 2) Get this element by tag-name;

export class TodoListComponent {
  @Output() sendToggleAllStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  allTodosStatus: boolean = false;}


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
    ]
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
