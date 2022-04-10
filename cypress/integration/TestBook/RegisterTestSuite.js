/// <reference types="Cypress" />
import LayoutPage from '../../support/objectsMap/LayoutPage'
import HomePage from '../../support/objectsMap/HomePage'
import RegisterPage from '../../support/objectsMap/RegisterPage'
import SuccessPage from '../../support/objectsMap/SuccessPage'
import LoginPage from '../../support/objectsMap/LoginPage'

describe('Register test suite', function()
{
    before(function() {
        // runs once before all tests in the block
        cy.fixture('account').then(function(accountData)
        {
            this.accountData = accountData
        })
    })
    it('TC_001_MyAccount_dropdown_RegisterAccount', function()
    {
        const layoutPage = new LayoutPage()
        const homePage = new HomePage()
        const registerPage = new RegisterPage()
        const successPage = new SuccessPage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getRegisterOption().should('be.visible').click()  

        
        cy.url().should('include', 'route=account/register')

        registerPage.getFirstNameTextBox().should('be.visible').type(this.accountData.firstName).should('have.value', this.accountData.firstName)
        registerPage.getLastNameTextBox().should('be.visible').type(this.accountData.lastName).should('have.value', this.accountData.lastName)
        
        const getUniqueId = () => Cypress._.uniqueId(Date.now().toString())
        const emailAddress = this.accountData.firstName + '.' + this.accountData.lastName + getUniqueId() + '@gmail.com'
                
        registerPage.getEmailTextBox().should('be.visible').type(emailAddress).should('have.value', emailAddress)
        registerPage.getTelephoneTextBox().should('be.visible').type(this.accountData.telephone).should('have.value', this.accountData.telephone)
        registerPage.getPasswordTextBox().should('be.visible').type(this.accountData.password).should('have.value', this.accountData.password)
        registerPage.getConfirmTextBox().should('be.visible').type(this.accountData.password).should('have.value', this.accountData.password)

        registerPage.getPolicyCheckbox().should('be.visible').check().should('be.checked')

        registerPage.getContinueButton().should('be.visible').click()

        cy.url().should('include', 'route=account/success')
        successPage.getMessage().should('have.text', 'Your Account Has Been Created!')      
    })

    it('TC_002_MyAccount_dropdown_Login_NewCustomer', function()
    {
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()
        const homePage = new HomePage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLoginOption().should('be.visible').click()  

        cy.url().should('include', 'route=account/login')

        loginPage.getContinueButton().should('be.visible').click()  

        cy.url().should('include', 'route=account/register')
    })

    it('TC_003_MyAccount_dropdown_Login_Register_link', function()
    {
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()
        const homePage = new HomePage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutDropdown().should('be.visible').click()
        homePage.getLoginOption().should('be.visible').click()  

        cy.url().should('include', 'route=account/login')

        loginPage.getRegisterLink().should('be.visible').click()  

        cy.url().should('include', 'route=account/register')
    })

    it('TC_004_MyAccount_link_NewCustomer', function()
    {
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getContinueButton().should('be.visible').click()  

        cy.url().should('include', 'route=account/register')

    })

    it('TC_005_MyAccount_link_Register_link', function()
    {
        const layoutPage = new LayoutPage()
        const loginPage = new LoginPage()

        cy.visit(Cypress.env('url'))
        cy.url().should('include', Cypress.env('url'))

        layoutPage.getMyAccoutLink().should('be.visible').click()

        cy.url().should('include', 'route=account/login')

        loginPage.getRegisterLink().should('be.visible').click()  

        cy.url().should('include', 'route=account/register')
    })
})
