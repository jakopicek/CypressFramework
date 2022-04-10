/// <reference types="Cypress" />
import LayoutPage from '../../support/objectsMap/LayoutPage'
import HomePage from '../../support/objectsMap/HomePage'
import LoginPage from '../../support/objectsMap/LoginPage'

describe('Login test suite', function()
{    
    before(function() {
        // runs once before all tests in the block
        cy.fixture('account').then(function(accountData)
        {
            this.accountData = accountData
            this.emailAddress = this.accountData.firstName + '.' + this.accountData.lastName + getUniqueId() + '@gmail.com'
            this.password = this.accountData.password
            cy.createUserAndLogout(this.accountData.firstName, this.accountData.lastName,this.emailAddress, this.accountData.telephone, this.accountData.password)        
        })
        const getUniqueId = () => Cypress._.uniqueId(Date.now().toString())
      
    })
    it('TC_006_MyAccount_dropdown_Login_ReturningCustomer_MyAccount_dropdown_Logout', function()
    {
        const layoutPage = new LayoutPage()
        const homePage = new HomePage()
        const loginPage = new LoginPage()
        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLoginOption().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getEmailAddress().type(this.emailAddress).should('have.value', this.emailAddress)        
        loginPage.getPassword().type(this.password).should('have.value', this.password)

        loginPage.getLoginButton().should('be.visible').click()

        cy.url().should('include', 'route=account/account')

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLogoutOption().should('be.visible').click()

        cy.url().should('include', 'route=account/logout')        
    })

    it('TC_007_MyAccount_dropdown_Login_Login_link_Logout', function()
    {
        const layoutPage = new LayoutPage()
        const homePage = new HomePage()
        const loginPage = new LoginPage()
        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLoginOption().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getLoginLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getEmailAddress().type(this.emailAddress).should('have.value', this.emailAddress)        
        loginPage.getPassword().type(this.password).should('have.value', this.password)

        loginPage.getLoginButton().should('be.visible').click()

        cy.url().should('include', 'route=account/account')

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLogoutOption().should('be.visible').click()

        cy.url().should('include', 'route=account/logout')        
    })  

    it('TC_008_MyAccount_link_ReturningCustomer_MyAccount_dropdown_Logout', function()
    {        
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()
        const homePage = new HomePage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getEmailAddress().type(this.emailAddress).should('have.value', this.emailAddress)        
        loginPage.getPassword().type(this.password).should('have.value', this.password)

        loginPage.getLoginButton().should('be.visible').click()

        cy.url().should('include', 'route=account/account')

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLogoutOption().should('be.visible').click()

        cy.url().should('include', 'route=account/logout')        
    })

    it('TC_009_MyAccount_link_Login_link_MyAccount_dropdown_Logout', function()
    {
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()
        const homePage = new HomePage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getLoginLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getEmailAddress().type(this.emailAddress).should('have.value', this.emailAddress)        
        loginPage.getPassword().type(this.password).should('have.value', this.password)

        loginPage.getLoginButton().should('be.visible').click()

        cy.url().should('include', 'route=account/account')

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLogoutOption().should('be.visible').click()

        cy.url().should('include', 'route=account/logout')        
    })
})
