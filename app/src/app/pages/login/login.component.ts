import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../shared/auth.service';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        NzLayoutComponent,
        NzContentComponent,
        NzRowDirective,
        NzColDirective,
        NzFormDirective,
        NzInputGroupComponent,
        NzInputDirective,
        NzButtonComponent,
        NzDividerComponent,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    private loginService = inject(UserService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    userForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    loadingCheckUser = signal(false);
    loadingRegisterUser = signal(false);
    showRegisterUser = signal(false);

    disabledLogin = computed(() => {
        return this.loadingCheckUser() || this.showRegisterUser();
    });

    checkUser(): void {
        const email = this.userForm.value.email;

        if (!email) {
            return;
        }

        this.loadingCheckUser.set(true);

        this.loginService.checkUser(email).subscribe((userId) => {
            this.loadingCheckUser.set(false);
            if (userId) {
                this.login(userId);
            } else {
                this.showRegisterUser.set(true);
            }
        });
    }

    resetLogin(): void {
        this.showRegisterUser.set(false);
    }

    registerUser(): void {
        const email = this.userForm.value.email;

        if (!email) {
            return;
        }

        this.loadingRegisterUser.set(true);
        this.loginService.createUser({ email }).subscribe((userId) => {
            this.loadingRegisterUser.set(false);
            this.login(userId);
        });
    }

    login(userId: string): void {
        this.authService.login(userId);
        this.router.navigate(['home']);
    }
}
