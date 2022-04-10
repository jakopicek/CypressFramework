/// <reference types="Cypress" />
import RegisterPage from '../integration/pageObjects/RegisterPage'
import HomePage from '../integration/pageObjects/HomePage'

describe('Playground test suite', function()
{
    before(function() {
        // runs once before all tests in the block
        cy.fixture('playground').then(function(data)
        {
            this.data = data
        })
    })
    it('TC_000', function()
    {
        Cypress.config('defaultCommandTimeout', 8000)
        const registerPage = new RegisterPage()
        const homePage = new HomePage()

        cy.visit('https://demo.opencart.com/')
        homePage.getMyAccout().click()
        cy.get('.dropdown-menu > :nth-child(1) > a').click()               
        registerPage.getFirstNameTextBox().type(this.data.firstName)
        registerPage.getLastNameTextBox().type(this.data.lastName)
        registerPage.getEmailTextBox().type('agnus.young103@gmail.com')
        registerPage.getTelephoneTextBox().type(this.data.telephone)
        registerPage.getPasswordTextBox().type(this.data.password)
        registerPage.getConfirmTextBox().type(this.data.password)
        cy.pause()
        registerPage.getPolicyCheckbox().check().should('be.checked').debug()
        registerPage.getContinueButton().click()
        //cy.get('#content > h1').should('have.text', 'Your Account Has Been Created!')
        cy.get('#search > .form-control').type(this.data.searchTerm)
        cy.get('.input-group-btn > .btn > .fa').click({force:true})
        
        // search items are in product-thumb class
        //cy.selectProduct('MacBook Air')
        
        

        //if we want to select products from an array
        this.data.productNames.forEach(function(element){
            cy.selectProduct(element)
        })

        var sum=0
        cy.get('td').each(($el, index, $list) => {
        const amount = $el.text()
        var res = amount.split(" ")
        res = re[1].trim()
        sum = Number(sum) + Number(res)
        }).then(function(){        cy.log(res)
        })

        expect(Number(total)).to.equal(Number(sum))

    })
})
