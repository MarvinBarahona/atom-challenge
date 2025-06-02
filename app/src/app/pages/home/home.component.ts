import {Component, inject, OnInit, signal} from '@angular/core';
import {ToDoService} from "../../services/to-do/to-do.service";
import {ToDoItem} from "../../models/to-do.model";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {
    toDoService = inject(ToDoService);

    loadingItems = signal(false);
    items = signal<ToDoItem[] | undefined>(undefined);

    ngOnInit(): void {
        this.loadingItems.set(true);
        this.toDoService.getToDoList().subscribe(res => {
            this.items.set(res.items);
        });
    }
}
