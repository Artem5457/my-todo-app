import {Injectable, Injector} from '@angular/core';
import { Todo } from './interface';
import {ActivatedRoute, Router} from "@angular/router";
//
// const stub: LocalStorageService = {
//   getLocalStorage: () => [],
//   setLocalStorage: () => {},
// }

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getLocalStorage(key: string): Todo[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  setLocalStorage(key: string, value: Todo[]): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
