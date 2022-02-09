import { TodoItemComponent } from "./todo-item.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let ngOnInit1eSpy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    component.todo = {
      id: 1,
      title: 'history',
      completed: false
    };
    ngOnInit1eSpy = spyOn(component, 'ngOnInit1');

    fixture.detectChanges();
  });

  it('create element', () => {
    console.log('create element');
    expect(component).toBeTruthy();
  });

  it('input value was drawn', () => {
    component.todo = {
      id: 5,
      title: 'symphony',
      completed: true
    }
    fixture.detectChanges();

    const inputTodo = fixture.debugElement.query(By.css('label'));

    expect(inputTodo.nativeElement.textContent.trim()).toEqual('symphony');
  });

  it('emits onRemove event on remove', () => {
    const onRemoveSpy = spyOn(component, 'removeItem');

    fixture.debugElement.query(By.css('.destroy')).triggerEventHandler('click', component.todo);
    fixture.detectChanges();

    // You have to apply this method
    expect(onRemoveSpy).toHaveBeenCalledOnceWith(component.todo);
  });

  it('emits onChange event on change', () => {

    const onChangeSpy = spyOn(component, 'completeChange');

    fixture.debugElement.query(By.css('.toggle')).triggerEventHandler('change', component.todo);
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledOnceWith(component.todo)
  });

  it('change editMode on click', () => {
    const viewTodo = fixture.debugElement.query(By.css('.view'));
    expect(viewTodo).not.toBeNull();

    component.changeMode();
    fixture.detectChanges();
    const editTodo = fixture.debugElement.query(By.css('.edit'));

    expect(editTodo).not.toBeNull();
    expect(component.editMode).toBeTrue();
  });

  // ----------------------------------------------------------------------------------------------
  it('change editTitle and emit it by click on key', () => {
    const onChangeTitleSpy = spyOn(component, 'onChangeTitle');
    // fixture.debugElement.query(By.css('li')).triggerEventHandler('dblclick', null);
    // fixture.detectChanges();
    //
    // // const title = 'Ukraine';
    // fixture.debugElement.query(By.css('.edit')).triggerEventHandler('keyup', {
    //   button: 13
    // });

    // expect(true).toBeTruthy()

    expect(ngOnInit1eSpy).toHaveBeenCalledOnceWith(component.todo);
  });
})


// export const todoMock = {
//   id: 1,
//   title: 'string',
//   completed: true,
// };
//
// let testFunc = (data): boolean => {
//   if (data.todo) {
//     return false;
//   }
//
//   if (!data) {
//     return true;
//   }
//
//   return true;
// }
//
// testFunc = () => true;
