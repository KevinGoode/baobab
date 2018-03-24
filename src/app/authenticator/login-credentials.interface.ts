export interface LoginCredentialsProvider {
    userName: string;
    password: string;
    getCredentials(subcriber:LoginCredentialsSubscriber);
}
export interface LoginCredentialsSubscriber {
    gotCredentials();
}