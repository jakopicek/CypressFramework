class SuccessPage
{
    getMessage()
    {
        return cy.get('#content h1')
    }    
    getContinueButton(){
        return cy.get('.buttons a:contains("Continue")')
    }
}

export default SuccessPage;