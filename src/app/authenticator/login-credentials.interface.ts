export interface LoginCredentialsProvider {
    userName: string;
    password: string;
    getCredentials(subcriber:LoginCredentialsSubscriber);
}
export interface UserSettingsProvider {
    show();
}
export interface LoginCredentialsSubscriber {
    gotCredentials(userName: string, password: string);
}