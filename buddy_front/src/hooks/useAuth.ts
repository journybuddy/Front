import { useState, useEffect } from 'react';
import { User } from '../types';
import { autorun } from 'mobx';
import authStore from '../stores/authStore';
//사용자 인증 상태를 관리하는 커스텀 훅
//Login 컴포넌트와 같은 컴포넌트에 사용되어 사용자 인증 상태 확인

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authStore.user);

  useEffect(() => {
    const disposer = autorun(() => {
      setUser(authStore.user);
    });
    return () => disposer();
  }, []);

  return { user, setUser: authStore.setUser, clearUser: authStore.clearUser };
};
export {};