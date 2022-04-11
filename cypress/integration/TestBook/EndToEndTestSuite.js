/// <reference types="Cypress" />
import LayoutPage from '../../support/objectsMap/LayoutPage'
import ProductDetailsPage from '../../support/objectsMap/ProductDetailsPage'
import SuccessPage from '../../support/objectsMap/SuccessPage'
import CheckOutPage from '../../support/objectsMap/CheckOutPage'
import SearchResultsPage from '../../support/objectsMap/SearchResultsPage'

describe('End To End test suite', function()
{    
    before(function() {
        // runs once before all tests in the block
        cy.fixture('account').then(function(accountData)
        {
            this.accountData = accountData
            this.emailAddress = this.accountData.firstName + '.' + this.accountData.lastName + getUniqueId() + '@gmail.com'
            this.password = this.accountData.password
            this.firstName = this.accountData.firstName
            this.lastName = this.accountData.lastName
            this.telephone = this.accountData.telephone
            this.password = this.accountData.password
            this.address = this.accountData.address
            this.city = this.accountData.city
            this.postCode = this.accountData.postCode
            this.country = this.accountData.country
            this.regionState = this.accountData.regionState

            cy.createUserAndLogout(this.accountData.firstName, this.accountData.lastName,this.emailAddress, this.accountData.telephone, this.accountData.password)        
        })
        cy.fixture('search').then(function(searchData)
        {
            this.searchData = searchData
            this.product = searchData.product                
            this.searchResultsMacbook = searchData.searchResultsMacbook
            this.pricesMacbook = searchData.pricesMacbook
        })
        const getUniqueId = () => Cypress._.uniqueId(Date.now().toString())
      
    })

    it('TC_018_Purchase_Product_View_Unauthorized', function()
    {        
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()
        const checkOutPage = new CheckOutPage()
        const successPage = new SuccessPage()

        cy.visit(Cypress.env('url'))
        layoutPage.getSearchTextbox().should('be.visible').type('hp').should('have.value', 'hp')
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=hp')

        cy.selectProduct('HP LP3065')


        productDetailsPage.getProductName().should('have.text', 'HP LP3065')
        productDetailsPage.getProductPrice().should('have.text', '$122.00')

        productDetailsPage.getAddToCartButton().should('be.visible').click()

        productDetailsPage.getSuccessMessage().should('be.visible').contains('Success')

        layoutPage.getCheckoutLink().should('be.visible').click()

        checkOutPage.getContinueButton().should('be.visible').click()

        checkOutPage.getFirstNameTextBox().should('be.visible').type(this.accountData.firstName).should('have.value', this.accountData.firstName)
        checkOutPage.getLastNameTextBox().should('be.visible').type(this.accountData.lastName).should('have.value', this.accountData.lastName)
        
        const getUniqueId = () => Cypress._.uniqueId(Date.now().toString())
        const emailAddress = this.accountData.firstName + '.' + this.accountData.lastName + getUniqueId() + '@gmail.com'
                
        checkOutPage.getEmailTextBox().should('be.visible').type(emailAddress).should('have.value', emailAddress)
        checkOutPage.getTelephoneTextBox().should('be.visible').type(this.accountData.telephone).should('have.value', this.accountData.telephone)
        checkOutPage.getPasswordTextBox().should('be.visible').type(this.accountData.password).should('have.value', this.accountData.password)
        checkOutPage.getConfirmTextBox().should('be.visible').type(this.accountData.password).should('have.value', this.accountData.password)
        
        checkOutPage.getAddres1TextBox().should('be.visible').type(this.accountData.address).should('have.value', this.accountData.address)
        checkOutPage.getCityTextBox().should('be.visible').type(this.accountData.city).should('have.value', this.accountData.city)
        checkOutPage.getPostCodeTextBox().should('be.visible').type(this.accountData.postCode).should('have.value', this.accountData.postCode)
        
        checkOutPage.getCountryDropdown().should('be.visible').select(this.accountData.country).should('have.value', 53)
        checkOutPage.getRegionStateDropdown().should('be.visible').select(this.accountData.regionState).should('have.value', 848)

        checkOutPage.getPolicyCheckbox().should('be.visible').check().should('be.checked')
        
        checkOutPage.getContinueRegistrationButton().should('be.visible').click()

        checkOutPage.getContinueShippingAddress().should('be.visible').click()

        checkOutPage.getContinueShippingMethod().should('be.visible').click()

        checkOutPage.getContinueTermsAgreeCheckbox().should('be.visible').check()

        checkOutPage.getContinuePaymentMethod().should('be.visible').click()

        checkOutPage.getConfirmOrderButton().should('be.visible').click()

        successPage.getMessage().should('have.text', 'Your order has been placed!')
    })

    it('TC_019_Purchase_Product_View_Authorized', function()
    {
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()
        const checkOutPage = new CheckOutPage()
        const successPage = new SuccessPage()

        cy.visit(Cypress.env('url'))
        cy.login(this.emailAddress, this.password)
        
        layoutPage.getSearchTextbox().should('be.visible').type('hp').should('have.value', 'hp')
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=hp')

        cy.selectProduct('HP LP3065')


        productDetailsPage.getProductName().should('have.text', 'HP LP3065')
        productDetailsPage.getProductPrice().should('have.text', '$100.00')

        productDetailsPage.getAddToCartButton().should('be.visible').click()

        productDetailsPage.getSuccessMessage().should('be.visible').contains('Success')

        layoutPage.getCheckoutLink().should('be.visible').click()

        checkOutPage.getContinueButton().should('be.visible').click()

        checkOutPage.getFirstNameTextBox().should('be.visible').type(this.firstName).should('have.value', this.firstName)
        checkOutPage.getLastNameTextBox().should('be.visible').type(this.lastName).should('have.value', this.lastName)
                
        checkOutPage.getAddres1TextBox().should('be.visible').type(this.address).should('have.value', this.address)
        checkOutPage.getCityTextBox().should('be.visible').type(this.city).should('have.value', this.city)
        checkOutPage.getPostCodeTextBox().should('be.visible').type(this.postCode).should('have.value', this.postCode)
        
        checkOutPage.getCountryDropdown().should('be.visible').select(this.country).should('have.value', 53)
        checkOutPage.getRegionStateDropdown().should('be.visible').select(this.regionState).should('have.value', 848)

        checkOutPage.getContinuePaymentAddress().should('be.visible').click()

        cy.debug()
        
        checkOutPage.getContinueShippingAddress().should('be.visible').click()

        checkOutPage.getContinueShippingMethod().should('be.visible').click()

        checkOutPage.getContinueTermsAgreeCheckbox().should('be.visible').check()

        checkOutPage.getContinuePaymentMethod().should('be.visible').click()

        checkOutPage.getConfirmOrderButton().should('be.visible').click()

        successPage.getMessage().should('have.text', 'Your order has been placed!')
    })  
})
