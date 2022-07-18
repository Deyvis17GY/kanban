import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Board } from "src/app/models/board.model";
import { Column } from "src/app/models/column.model";
import { faCoffee, faX } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-main-view",
  templateUrl: "./main-view.component.html",
  styleUrls: ["./main-view.component.scss"],
})
export class MainViewComponent implements OnInit {
  constructor() {}

  faCoffee = faX;

  newTask: string = "";

  board: Board = new Board("Test Board", [
    new Column("Ideas", [
      {
        id: 1,
        task: "Some random idea",
      },
      {
        id: 2,
        task: "Another random idea",
      },
      {
        id: 3,
        task: "Yet another random idea",
      },
    ]),
    new Column("Research", [
      {
        id: 4,
        task: "Lorem ipsum",
      },
      {
        id: 5,
        task: "Dolor sit amet",
      },
      {
        id: 6,
        task: "Consectetur adipiscing elit",
      },
    ]),
    new Column("Todo", [
      {
        id: 7,
        task: "Praesent commodo cursus magna",
      },
      {
        id: 8,
        task: "Praesent commodo cursus magna",
      },
      {
        id: 9,
        task: "Praesent commodo cursus magna",
      },
      {
        id: 10,
        task: "Praesent commodo cursus magna",
      },
    ]),
    new Column("Done", [
      {
        id: 11,
        task: "Praesent commodo cursus magna",
      },
      {
        id: 12,
        task: "Praesent commodo cursus magna",
      },
    ]),
  ]);

  ngOnInit() {
    if (localStorage.getItem("board")) {
      this.board = JSON.parse(localStorage.getItem("board"));
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

  // save list columns in local Storage
  saveBoard() {
    localStorage.setItem("board", JSON.stringify(this.board));
  }

  createTask($event, e) {
    const { value } = $event.target;
    if ($event.keyCode !== 13) return;
    if (!value) return;

    return this.board.columns.filter((f) => {
      if (f.name === e) {
        console.debug("f", f);
        f.tasks.push({
          id: this.uniqueId(),
          task: value,
        });
        $event.target.value = "";
        this.saveBoard();
      }
    });
  }

  deleteTask(id) {
    const searchColum: Column[] = this.board.columns.map((f) => {
      const TaskSelected = f.tasks.filter((t) => {
        return t.id !== id;
      });

      return { ...f, tasks: TaskSelected };
    });

    this.board.columns = searchColum;
    this.saveBoard();
  }

  uniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
