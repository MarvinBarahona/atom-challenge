import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { finalize, tap } from 'rxjs';

import { NzAlertComponent } from 'ng-zorro-antd/alert';

import { ToDoService } from '../../services/to-do/to-do.service';
import { ToDoItem, ToDoUpsertRequest } from '../../models/to-do.model';

import { LoaderComponent } from '../../components/loader/loader.component';
import { ItemComponent } from '../../components/item/item.component';

@Component({
    selector: 'app-home',
    imports: [NzAlertComponent, LoaderComponent, ItemComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    toDoService = inject(ToDoService);

    loadingItems = signal(false);
    items = signal<ToDoItem[] | undefined>(undefined);

    tempId = 1;

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

    onCreateItem(value: ToDoUpsertRequest): void {
        const tempId = String(this.tempId++);
        const newDate = new Date();
        this.items.update(
            (items) =>
                items && [
                    ...items,
                    { ...value, id: tempId, createdAt: newDate },
                ]
        );

        this.toDoService
            .createToDoItem(value)
            .pipe(
                tap({
                    error: () => {
                        this.items.update(
                            (items) =>
                                items &&
                                items.filter((item) => item.id !== tempId)
                        );
                    },
                })
            )
            .subscribe((itemId) => {
                this.items.update((items) =>
                    this.updateSingleItem(items, tempId, {
                        id: itemId,
                    })
                );
            });
    }

    onUpdateItem(itemToUpdate: ToDoItem, value: ToDoUpsertRequest): void {
        this.items.update((items) =>
            this.updateSingleItem(items, itemToUpdate.id, value)
        );

        this.toDoService
            .updateToDoItem(itemToUpdate.id, value)
            .pipe(
                tap({
                    error: () => {
                        this.items.update((items) =>
                            this.updateSingleItem(
                                items,
                                itemToUpdate.id,
                                itemToUpdate
                            )
                        );
                    },
                })
            )
            .subscribe();
    }

    onDeleteItem(itemToDelete: ToDoItem): void {
        const items = this.items();
        if (items && items.length > 0) {
            const index = items.findIndex(
                (item) => item.id === itemToDelete.id
            );

            this.items.update(
                (items) =>
                    items && items.filter((item) => item.id !== itemToDelete.id)
            );

            this.toDoService
                .deleteToDoItem(itemToDelete.id)
                .pipe(
                    tap({
                        error: () => {
                            this.items.set([
                                ...items.slice(0, index),
                                itemToDelete,
                                ...items.slice(index),
                            ]);
                        },
                    })
                )
                .subscribe();
        }
    }

    private updateSingleItem(
        items: ToDoItem[] | undefined,
        itemId: string,
        newValue: Partial<ToDoItem>
    ): ToDoItem[] | undefined {
        if (!items) {
            return undefined;
        }

        const index = items.findIndex((item) => item.id === itemId);

        if (index !== -1) {
            return [
                ...items.slice(0, index),
                {
                    ...items[index],
                    ...newValue,
                },
                ...items.slice(index + 1),
            ];
        } else {
            return items;
        }
    }
}
