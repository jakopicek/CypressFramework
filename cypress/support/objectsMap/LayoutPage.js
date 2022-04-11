class LayoutPage
{
    getMyAccoutDropdown()
    {
        return cy.get('a[title="My Account"]')
    }
    getMyAccoutLink()
    {
        return cy.get('footer a:contains("My Account")')
    }   
    getSearchTextbox()
    {
        return cy.get('div#search input')
    }   
    getSearchButton()
    {
        return cy.get('div#search button')
    }  
    getCheckoutLink()
    {
        return cy.get('a[title="Checkout"]')
    }
}

export default LayoutPage;