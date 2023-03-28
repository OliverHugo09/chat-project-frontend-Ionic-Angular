export class AppUser {
    id: number;
    username: string;
    password: string;
    socket_id: number;
    online: number;
    avatar: string;
    token: string = '';
    isAuthenticated: number;
    query: string;
}
