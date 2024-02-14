import {CanActivateFn, Router} from '@angular/router';
import {ResponseDto} from "../../models/user/responseDto.module";

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  const responseString: string | null = localStorage.getItem('user');

  if (!responseString) {
    router.navigate(['/login']);
    return false;
  }
  const response: ResponseDto = JSON.parse(responseString);

  if (response.accessToken) {
      return true;
  }else {
    router.navigate(['/login']);
    return false;
  }

};
