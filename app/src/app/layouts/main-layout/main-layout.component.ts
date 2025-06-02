import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
} from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-main-layout',
    imports: [
        RouterOutlet,
        NzLayoutComponent,
        NzHeaderComponent,
        NzContentComponent,
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.sass',
})
export class MainLayoutComponent {}
