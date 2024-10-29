import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatatableTestComponent } from "./datatable-test/datatable-test.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, DatatableTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-tz-datatable-1-core-workspace';
}
