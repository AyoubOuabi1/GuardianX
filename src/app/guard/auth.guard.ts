import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router : Router = new Router();
  return !!localStorage.getItem("token");

};
