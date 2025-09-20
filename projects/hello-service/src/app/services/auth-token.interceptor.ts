import { 
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn
} from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = 
(req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: 'Bearer I am a happy token'
    }
  });

  return next(cloned);
};


