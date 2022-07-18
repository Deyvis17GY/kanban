import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { MainViewComponent } from "./pages/main-view/main-view.component";

const routes: Routes = [
  {
    path: "",
    component: MainViewComponent,
    children: [
      {
        path: "task/:id",
        component: EditTaskComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
