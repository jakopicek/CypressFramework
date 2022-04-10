/// <reference types="Cypress" />
import LayoutPage from '../../support/objectsMap/LayoutPage'
import ProductDetailsPage from '../../support/objectsMap/ProductDetailsPage'

describe('Products test suite', function()
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
        cy.fixture('search').then(function(searchData)
        {
            this.searchData = searchData
            this.product = searchData.product                
            this.searchResultsMacbook = searchData.searchResultsMacbook
            this.pricesMacbook = searchData.pricesMacbook
        })
        const getUniqueId = () => Cypress._.uniqueId(Date.now().toString())
      
    })
    
    it('TC_010_Search_Products_Unauthorized', function()
    {
        const layoutPage = new LayoutPage()

        cy.visit(Cypress.env('url'))
        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        let count = cy.getAllDisplayedProductsCount()
        .then((returned_value) => {
            count = Number(returned_value)
        })

        cy.getProductsCount(this.product)
                .then((returned_value) => {
                    expect(Number(returned_value)).to.equal(count)
                })
    })

    it('TC_011_Search_Products_Authorized', function()
    {
        const layoutPage = new LayoutPage()

        cy.visit(Cypress.env('url'))
        cy.login(this.emailAddress, this.password)

        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        let count = cy.getAllDisplayedProductsCount()
        .then((returned_value) => {
            count = Number(returned_value)
        })

        cy.getProductsCount(this.product)
                .then((returned_value) => {
                    expect(Number(returned_value)).to.equal(count)
                })

        cy.logout()

        cy.url().should('include', 'route=account/logout')
    })  

    it('TC_012_View_Product_Unauthorized', function()
    {        
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()

        cy.visit(Cypress.env('url'))
        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        cy.selectProduct(this.product)

        productDetailsPage.getProductName().should('have.text', 'MacBook')
        productDetailsPage.getProductPrice().should('have.text', '$500.00')

    })

    it('TC_013_View_Product_Authorized', function()
    {
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()

        cy.visit(Cypress.env('url'))
        cy.login(this.emailAddress, this.password)

        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        cy.selectProduct(this.product)

        productDetailsPage.getProductName().should('have.text', 'MacBook')
        productDetailsPage.getProductPrice().should('have.text', '$500.00')
        
    })

    it('TC_012_Add_Product_Unauthorized', function()
    {        
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()

        cy.visit(Cypress.env('url'))
        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        cy.selectProduct(this.product)

        productDetailsPage.getProductName().should('have.text', 'MacBook')
        productDetailsPage.getProductPrice().should('have.text', '$500.00')

        productDetailsPage.getAddToCartButton().should('not.be.visible').click()


        productDetailsPage.getSuccessMessage().should('be.visible').contains('Success')
    })

    it('TC_013_Add_Product_Authorized', function()
    {
        const layoutPage = new LayoutPage()
        const productDetailsPage = new ProductDetailsPage()

        cy.visit(Cypress.env('url'))
        cy.login(this.emailAddress, this.password)

        layoutPage.getSearchTextbox().should('be.visible').type(this.product).should('have.value', this.product)
        layoutPage.getSearchButton().should('be.visible').click()

        cy.url().should('include', 'product/search&search=' + this.product)

        cy.selectProduct(this.product)

        productDetailsPage.getProductName().should('have.text', 'MacBook')
        productDetailsPage.getProductPrice().should('have.text', '$500.00')
        
        productDetailsPage.getAddToCartButton().should('not.be.visible').click()

        productDetailsPage.getSuccessMessage().should('be.visible').contains('Success')
    })
})
