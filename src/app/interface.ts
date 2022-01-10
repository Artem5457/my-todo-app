export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
