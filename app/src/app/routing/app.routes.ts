import { Routes } from '@angular/router';

import {loggedInGuard} from "./guards/logged-in.guard";
import {notLoggedInGuard} from "./guards/not-logged-in.guard";

import {LoginComponent} from "../pages/login/login.component";
import {HomeComponent} from "../pages/home/home.component";

import {UserService} from "../services/user/user.service";
import {ToDoService} from "../services/to-do/to-do.service";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [notLoggedInGuard],
        providers: [UserService],
    },
    {
        path: 'home',
        loadComponent: () => import('../layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        canActivate: [loggedInGuard],
        providers: [ToDoService],
        children: [
            {
                path: '',
                component: HomeComponent,
            }
        ]
    }
];
