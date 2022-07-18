import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  @Output() updateTask = new EventEmitter();

  task = "";

  constructor(private router: Router, private _taskService: TaskService) {}

  ngOnInit() {
    this.task = this._taskService.value;
  }

  goHome($event) {
    if ($event.target.id === "edit") {
      this._taskService.setEditStatus(false);
      this.router.navigate(["/"]);
    }
  }

  changeTask($event) {
    const { value } = $event.target;
    if (!value.length) return;
    this.updateTask.emit({
      id: this.router.url.split("/")[2],
      task: this.task,
    });
    this._taskService.setEditStatus(false);
    this.router.navigate(["/"]);
  }
}
