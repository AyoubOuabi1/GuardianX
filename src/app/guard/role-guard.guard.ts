import {CanActivateFn, Router} from '@angular/router';
import {ResponseDto} from "../models/user/responseDto.module";

export const roleGuard: CanActivateFn = (route, state) => {

  const router: Router = new Router();
  const responseString: string | null = localStorage.getItem('user');
  const response: ResponseDto = responseString ? JSON.parse(responseString) : {};

  if (response.role === 'ADMIN' && state.url.startsWith('/admin')) {
      return true;
  } else if (response.role === 'USER' && state.url.startsWith('/user')) {
      return true;
  } else {
      router.navigate(['/unauthorized']);
      return false;
  }

};
