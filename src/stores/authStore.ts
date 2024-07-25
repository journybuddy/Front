import { makeAutoObservable } from 'mobx';
import { User } from '../types';

class AuthStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }
}

const authStore = new AuthStore();
export default authStore;
export {};