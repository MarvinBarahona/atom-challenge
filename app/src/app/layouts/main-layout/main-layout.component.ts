import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from "../../shared/auth.service";

@Component({
    selector: 'app-main-layout',
    imports: [
        RouterOutlet,
        NzLayoutComponent,
        NzHeaderComponent,
        NzContentComponent,
        NzButtonComponent,
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.sass',
})
export class MainLayoutComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
