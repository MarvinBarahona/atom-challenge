import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import {
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';

import { ToDoUpsertRequest } from '../../models/to-do.model';

@Component({
    selector: 'app-item-form-card',
    imports: [
        ReactiveFormsModule,
        NzCardComponent,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzInputDirective,
        NzCheckboxComponent,
        NzButtonComponent,
    ],
    templateUrl: './item-form-card.component.html',
    styleUrl: './item-form-card.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormCardComponent {
    private fb = inject(FormBuilder);

    title = input.required<string>();
    saveLabel = input.required<string>();
    item = input<ToDoUpsertRequest>();

    cancel = output<void>();
    save = output<ToDoUpsertRequest>();

    itemForm = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        isDone: [false],
    });

    constructor() {
        effect(() => {
            const _item = this.item();

            if (_item) {
                this.itemForm.patchValue(_item);
            }
        });
    }

    onCancel(): void {
        this.itemForm.reset();
        this.cancel.emit();
    }

    onSave(): void {
        if (this.itemForm.valid) {
            this.save.emit(this.itemForm.getRawValue());
        }
    }
}
