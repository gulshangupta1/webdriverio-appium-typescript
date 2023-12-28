import { LoginPage } from "../pages/loginPage";

describe('Test login scenarios', () => {
    it('Login Test', async () => {
        const username: string = 'bob@example.com';
        const password: string = '10203040';

        const loginPage = new LoginPage();
        await loginPage.login(username, password);
    });
});