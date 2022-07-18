import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainViewComponent } from "./pages/main-view/main-view.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { ClickOutsideModule } from "ng4-click-outside";

@NgModule({
  declarations: [AppComponent, MainViewComponent, EditTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    FontAwesomeModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
