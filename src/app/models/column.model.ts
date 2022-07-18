interface Task {
  id: number | string;
  task: string;
}
export class Column {
  constructor(public name: string, public tasks: Task[]) {}
}
