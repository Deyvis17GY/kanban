import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Board } from "src/app/models/board.model";
import { Column } from "src/app/models/column.model";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-main-view",
  templateUrl: "./main-view.component.html",
  styleUrls: ["./main-view.component.scss"],
})
export class MainViewComponent implements OnInit {
  subscriptionStatus: Subscription;
  constructor(private router: Router, private _taskService: TaskService) {
    this.subscriptionStatus = this._taskService
      .getEditStatus()
      .subscribe((f) => {
        this.isEdit = f;
      });
  }

  ngOnDestroy() {
    this.subscriptionStatus.unsubscribe();
  }

  faCoffee = faX;
  isEdit = false;

  newTask: string = "";

  board: Board = new Board("Test Board", [
    new Column("Ideas", [
      {
        id: this.uniqueId(),
        task: "Some random idea",
      },
      {
        id: this.uniqueId(),
        task: "Another random idea",
      },
    ]),
    new Column("Research", [
      {
        id: this.uniqueId(),
        task: "Lorem ipsum",
      },
      {
        id: this.uniqueId(),
        task: "Dolor sit amet",
      },
      {
        id: this.uniqueId(),
        task: "Consectetur adipiscing elit",
      },
    ]),
    new Column("Todo", [
      {
        id: this.uniqueId(),
        task: "Praesent commodo cursus magna",
      },
      {
        id: this.uniqueId(),
        task: "Praesent commodo cursus magna",
      },
    ]),
    new Column("Done", [
      {
        id: this.uniqueId(),
        task: "Praesent commodo cursus magna",
      },
    ]),
  ]);

  ngOnInit() {
    if (localStorage.getItem("board")) {
      this.board = JSON.parse(localStorage.getItem("board"));
    }

    if (this.router.url !== "/") {
      this.isEdit = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.saveBoard();
  }

  saveBoard() {
    localStorage.setItem("board", JSON.stringify(this.board));
  }

  enterTask($event, name) {
    if ($event.keyCode !== 13) return;
    this.createTask($event, name);
  }

  blurTask($event, name) {
    this.createTask($event, name);
  }

  createTask($event, e) {
    const { value } = $event.target;
    if (!value) return;
    return this.board.columns.filter((col) => {
      if (col.name === e) {
        col.tasks.push({
          id: this.uniqueId(),
          task: value,
        });
        $event.target.value = "";
        this.saveBoard();
      }
    });
  }

  deleteTask(id) {
    const searchColum: Column[] = this.board.columns.map((col) => {
      const TaskSelected = col.tasks.filter((task) => {
        return task.id !== id;
      });

      return { ...col, tasks: TaskSelected };
    });

    this.board.columns = searchColum;
    this.saveBoard();
  }

  editTask(id, name) {
    const searchColumn = this.board.columns.find((col) => col.name === name);
    const searchTask = searchColumn.tasks.find((task) => task.id === id);

    this._taskService.setTask(searchTask.task);
    this._taskService.setEditStatus(true);
    this.router.navigate(["/task", id]);
  }

  goHome() {
    this.router.navigate(["/"]);
  }

  UpdateTask(props) {
    const copy = this.board.columns.map((col) => {
      const TaskSelected = col.tasks.map((task) => {
        if (task.id === props.id) {
          return { ...task, task: props.task };
        }
        return task;
      });

      return { ...col, tasks: TaskSelected };
    });

    this.board.columns = copy;

    this.saveBoard();
  }

  uniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
