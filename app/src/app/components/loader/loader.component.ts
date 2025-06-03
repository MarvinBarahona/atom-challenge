import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
    selector: 'app-loader',
    imports: [NzSpinComponent],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    tip = input<string>('Loading...');
}
