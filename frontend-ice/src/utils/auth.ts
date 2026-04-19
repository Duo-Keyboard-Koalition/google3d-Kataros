export const AUTH_KEY = 'ice_demo_auth';
export const USER_KEY = 'ice_demo_user';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(AUTH_KEY) === 'true';
}

export function getStoredUser(): string {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(USER_KEY) || 'User';
}

export function signIn(name: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_KEY, 'true');
  window.localStorage.setItem(USER_KEY, name || 'User');
}

export function signOut(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_KEY);
  window.localStorage.removeItem(USER_KEY);
}
