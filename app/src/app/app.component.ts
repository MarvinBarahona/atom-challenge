import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = environment.apiUrl;
}
