import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

import { ToDoItem } from '../../models/to-do.model';

@Component({
    selector: 'app-item-card',
    imports: [
        FormsModule,
        DatePipe,
        NzCardComponent,
        NzSwitchComponent,
        NzButtonComponent,
        NzPopconfirmDirective,
    ],
    templateUrl: './item-card.component.html',
    styleUrl: './item-card.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
    item = input.required<ToDoItem>();

    toggleDone = output<boolean>();
    edit = output<void>();
    delete = output<void>();

    onToggleDone(value: boolean): void {
        this.toggleDone.emit(value);
    }

    onEdit(): void {
        this.edit.emit();
    }

    onDelete(): void {
        this.delete.emit();
    }
}
