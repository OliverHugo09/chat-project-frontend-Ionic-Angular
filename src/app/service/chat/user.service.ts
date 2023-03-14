import { Injectable } from '@angular/core';

const ACTIVE_USER_KEY = 'activeUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  setActiveUser(userId: string) {
    localStorage.setItem(ACTIVE_USER_KEY, userId);
  }

  getActiveUserId(): string | null {
    return localStorage.getItem(ACTIVE_USER_KEY);
  }
}
