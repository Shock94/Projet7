import { BehaviorSubject } from 'rxjs';

const USER_TOKEN_KEY_IN_STORAGE = 'userToken';

const getUserTokenInStorage = () => sessionStorage.getItem(USER_TOKEN_KEY_IN_STORAGE);
const setUserTokenInStorage = token => sessionStorage.setItem(USER_TOKEN_KEY_IN_STORAGE, token);
const unsetUserTokenInStorage = () => sessionStorage.removeItem(USER_TOKEN_KEY_IN_STORAGE);

export const userToken$ = new BehaviorSubject(getUserTokenInStorage());
export const hasUserToken$ = new BehaviorSubject(userToken$.getValue());

export const getUserToken = () => userToken$.getValue();

export const getUserTokenPayload = () => {
  const userToken = getUserToken();

  if (!userToken) {
    return;
  }

  return JSON.parse(atob(userToken.split('.')[1]));
};

export const hasUserToken = () => hasUserToken$.getValue();

export const setUserToken = token => {
  setUserTokenInStorage(token);

  userToken$.next(token);
  hasUserToken$.next(true);
};

export const unsetUserToken = () => {
  unsetUserTokenInStorage();

  userToken$.next('');
  hasUserToken$.next(false);
};
