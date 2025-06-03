import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { finalize } from 'rxjs';

import { NzAlertComponent } from 'ng-zorro-antd/alert';

import { ToDoService } from '../../services/to-do/to-do.service';
import { ToDoItem } from '../../models/to-do.model';

import { LoaderComponent } from '../../components/loader/loader.component';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { ItemFormCardComponent } from '../../components/item-form-card/item-form-card.component';

@Component({
    selector: 'app-home',
    imports: [
        NzAlertComponent,
        LoaderComponent,
        ItemCardComponent,
        ItemFormCardComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    toDoService = inject(ToDoService);

    loadingItems = signal(false);
    items = signal<ToDoItem[] | undefined>(undefined);

    ngOnInit(): void {
        this.loadingItems.set(true);
        this.toDoService
            .getToDoList()
            .pipe(
                finalize(() => {
                    this.loadingItems.set(false);
                })
            )
            .subscribe((res) => {
                this.items.set(res.items);
            });
    }
}
