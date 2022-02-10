import { TodoItemComponent } from "./todo-item.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent
      ],
      imports: [FormsModule]
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

    fixture.detectChanges();
  });

  it('create element', () => {
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
    const onRemoveSpy = spyOn(component.onRemove, 'emit');

    fixture.nativeElement.querySelector('.destroy').click();

    // You have to apply this method
    expect(onRemoveSpy).toHaveBeenCalledOnceWith(component.todo);
  });

  it('emits onChange event on change', () => {
    const onChangeSpy = spyOn(component.onChange, 'emit');

    fixture.nativeElement.querySelector('.toggle').click();

    expect(onChangeSpy).toHaveBeenCalledOnceWith( component.todo);
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
    const onChangeTitleSpy = spyOn(component.onChangeTitle, 'emit');
    component.changeMode();
    fixture.detectChanges();
    component.editTitle = '122'

    fixture.debugElement.query(By.css('.edit')).triggerEventHandler('keyup', {
      keyCode: 13
    });

    fixture.detectChanges();

    expect(onChangeTitleSpy).toHaveBeenCalledOnceWith({ id: 1, title: '122', completed: false });
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
