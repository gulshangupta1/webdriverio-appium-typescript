import { LoginScreen } from "../screens/loginScreen";

describe('Test login scenarios', () => {
    it('Login Test', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';

        const loginScreen = new LoginScreen();
        await loginScreen.login(username, password);

        
    });
});