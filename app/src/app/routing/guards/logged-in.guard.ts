import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/auth.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    return authService.loggedIn();
};
