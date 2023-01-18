import { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

export function deleteCookie(name: string): void {
    const cookies = new Cookies();
    cookies.remove(name, { path: '/' });
}

export function getCookie(name: string): any {
    const cookies = new Cookies();
    return cookies.get('auth');

}

export const setAuthCookies = (responseAfterLogin: AxiosResponse<any>, loginedUserStatus: string) => {
    const cookies = new Cookies();
    let auth = {
        "currentUserStatus": loginedUserStatus,
        "token": responseAfterLogin.data.accessToken,
        "currentUserId": responseAfterLogin.data.userId,
        "currentUserRole": responseAfterLogin.data.role,
    }
    cookies.set('auth', auth, { path: '/' });
}

