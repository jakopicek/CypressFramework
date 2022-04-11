class CheckOutPage
{    
    getFirstNameTextBox()
    {
        return cy.get('#input-payment-firstname')
    }
    getLastNameTextBox()
    {
        return cy.get('#input-payment-lastname')
    }
    getEmailTextBox()
    {
        return cy.get('#input-payment-email')
    }
    getTelephoneTextBox()
    {
        return cy.get('#input-payment-telephone')
    }
    getPasswordTextBox()
    {
        return cy.get('#input-payment-password')
    }
    getConfirmTextBox()
    {
        return cy.get('#input-payment-confirm')
    }
    getAddres1TextBox()
    {
        return cy.get('#input-payment-address-1')
    }
    getCityTextBox()
    {
        return cy.get('#input-payment-city')
    }
    getPostCodeTextBox()
    {
        return cy.get('#input-payment-postcode')
    }    
    getConfirmTextBox()
    {
        return cy.get('#input-payment-confirm')
    }
    getCountryDropdown()
    {
        return cy.get('#input-payment-country')
    }
    getRegionStateDropdown()
    {
        return cy.get('#input-payment-zone')
    }
    getPolicyCheckbox()
    {
        return cy.get('input[name="agree"]')
    }
    getContinueButton()
    {
        return cy.get('input[value="Continue"]')
    }
    getContinueRegistrationButton()
    {
        return cy.get('#button-register')
    }
    getContinuePaymentAddress()
    {
        return cy.get('#button-payment-address')
    }
    getContinueShippingAddress()
    {
        return cy.get('#button-shipping-address')
    }

    getContinueShippingMethod()
    {
        return cy.get('#button-shipping-method')
    }
    getContinuePaymentMethod()
    {
        return cy.get('#button-payment-method')
    }
    getContinueTermsAgreeCheckbox()
    {
        return cy.get('input[type="checkbox"]')
    }
    getConfirmOrderButton()
    {
        return cy.get('#button-confirm')
    }    
}

export default CheckOutPage;