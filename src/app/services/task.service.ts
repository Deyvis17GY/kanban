import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private isEdit = new Subject<boolean>();
  private task = new Subject<string>();

  value: string;

  constructor() {}

  getEditStatus(): Observable<any> {
    return this.isEdit.asObservable();
  }

  setEditStatus(status: boolean) {
    this.isEdit.next(status);
  }

  getTask(): Observable<any> {
    return this.task.asObservable();
  }

  setTask(task: string) {
    this.value = task;
    this.task.next(task);
  }
}
