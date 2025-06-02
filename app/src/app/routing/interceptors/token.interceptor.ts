import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!req.url.includes("users") && authService.loggedIn()) {
    const clonedRequest = req.clone({
        setHeaders: {
            'Authorization': authService.userId!
        }
    });

    return next(clonedRequest);
  } else {
      return next(req);
  }
};
