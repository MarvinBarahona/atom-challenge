import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
    signal,
} from '@angular/core';

import { ItemFormCardComponent } from '../item-form-card/item-form-card.component';
import { ItemCardComponent } from '../item-card/item-card.component';

import { ToDoItem, ToDoUpsertRequest } from '../../models/to-do.model';

@Component({
    selector: 'app-item',
    imports: [ItemFormCardComponent, ItemCardComponent],
    templateUrl: './item.component.html',
    styleUrl: './item.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    item = input<ToDoItem>();

    create = output<ToDoUpsertRequest>();
    update = output<ToDoUpsertRequest>();
    delete = output<void>();

    isShowingForm = signal(false);

    toggleForm(): void {
        this.isShowingForm.update((value) => !value);
    }

    onCreate(value: ToDoUpsertRequest): void {
        this.create.emit(value);
    }

    onUpdate(value: ToDoUpsertRequest): void {
        this.toggleForm();
        this.update.emit(value);
    }

    onDelete(): void {
        this.delete.emit();
    }

    onToggleDone(item: ToDoItem, isDone: boolean): void {
        this.update.emit({
            ...item,
            isDone,
        });
    }
}
