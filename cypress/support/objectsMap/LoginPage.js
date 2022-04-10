class LoginPage
{
    getContinueButton()
    {
        return cy.get('a:contains("Continue")')
    }
    getLoginButton()
    {
        return cy.get('#content input[value="Login"]')
    }
    getLoginLink()
    {
        return cy.get('aside a:contains("Login")')
    }
    getRegisterLink()
    {
        return cy.get('aside a:contains("Register")')
    }
    getEmailAddress()
    {
        return cy.get('#input-email')
    }
    getPassword()
    {
        return cy.get('#input-password')
    }

}

export default LoginPage;