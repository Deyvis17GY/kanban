interface Task {
  id: string;
  task: string;
}
export class Column {
  constructor(public name: string, public tasks: Task[]) {}
}
