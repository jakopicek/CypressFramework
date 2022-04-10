class RegisterPage
{
    getFirstNameTextBox()
    {
        return cy.get('#input-firstname')
    }
    getLastNameTextBox()
    {
        return cy.get('#input-lastname')
    }
    getEmailTextBox()
    {
        return cy.get('#input-email')
    }
    getTelephoneTextBox()
    {
        return cy.get('#input-telephone')
    }
    getPasswordTextBox()
    {
        return cy.get('#input-password')
    }
    getConfirmTextBox()
    {
        return cy.get('#input-confirm')
    }
    getPolicyCheckbox()
    {
        return cy.get('[type="checkbox"]')
    }
    getContinueButton()
    {
        return cy.get('input[value="Continue"]')
    }
}

export default RegisterPage;