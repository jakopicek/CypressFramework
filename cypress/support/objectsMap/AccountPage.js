class AccountPage
{    
    getMyAccountHeader()
    {
        return cy.get('div#content h2')
    }   
    
}

export default AccountPage;