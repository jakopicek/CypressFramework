// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LayoutPage from './objectsMap/LayoutPage'
import HomePage from './objectsMap/HomePage'
import RegisterPage from './objectsMap/RegisterPage'
import LoginPage from './objectsMap/LoginPage'

Cypress.Commands.add("selectProduct", (productName) => {
cy.get('.product-thumb').each(($el, index, $list) => 
    {
        if($el.text().includes(productName))
        {
            cy.get('.caption a').eq(index).click()
            return false
        }
    })
})

Cypress.Commands.add("getProductsCount", (productName) => {
    var sum=0
    cy.get('.product-thumb').each(($el, index, $list) => 
        {
            if($el.text().includes(productName))
            {
                sum = sum + 1
            }
        }).then(function(){ return sum
    })
})

Cypress.Commands.add("getAllDisplayedProductsCount", () => {
    var sum=0
    cy.get('.product-thumb').each(($el, index, $list) => 
        {
            sum = sum + 1
        }).then(function(){ return sum
    })
})


Cypress.Commands.add("createUserAndLogout", (firstName, lastName, email, telephone, password) => {
    const layoutPage = new LayoutPage()
    const homePage = new HomePage()
    const registerPage = new RegisterPage()

    cy.visit(Cypress.env('url'))
    
    layoutPage.getMyAccoutDropdown().click()
    homePage.getRegisterOption().click()  

    
    registerPage.getFirstNameTextBox().type(firstName)
    registerPage.getLastNameTextBox().type(lastName)

    registerPage.getEmailTextBox().type(email)
    registerPage.getTelephoneTextBox().type(telephone)
    registerPage.getPasswordTextBox().type(password)
    registerPage.getConfirmTextBox().type(password)

    registerPage.getPolicyCheckbox().check()

    registerPage.getContinueButton().click()   

    layoutPage.getMyAccoutDropdown().click()
    homePage.getLogoutOption().click()

    cy.url().should('include', 'route=account/logout')   
})

Cypress.Commands.add("login", (email, password) => {
    const layoutPage = new LayoutPage()
    const homePage = new HomePage()
    const loginPage = new LoginPage()

    layoutPage.getMyAccoutDropdown().click()
    homePage.getLoginOption().click()
        
    loginPage.getEmailAddress().type(email)        
    loginPage.getPassword().type(password)

    loginPage.getLoginButton().click()

    cy.url().should('include', 'route=account/account')          
})

Cypress.Commands.add("logout", () => {
    const layoutPage = new LayoutPage()
    const homePage = new HomePage()
     
    layoutPage.getMyAccoutDropdown().should('be.visible').click()
    homePage.getLogoutOption().should('be.visible').click()
    
    cy.url().should('include', 'route=account/logout')      
})
    
    