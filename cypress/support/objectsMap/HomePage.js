class HomePage
{    
    getRegisterOption()
    {
        return cy.get('.dropdown.open a:contains("Register")')
    }
    getLoginOption()
    {
        return cy.get('.dropdown.open a:contains("Login")')
    }
    getLogoutOption()
    {
        return cy.get('.dropdown.open a:contains("Logout")')
    }
}

export default HomePage;