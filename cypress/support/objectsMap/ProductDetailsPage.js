class ProductDetailsPage
{    
    getProductName()
    {
        return cy.get('div#content h1')
    }
    getProductPrice()
    {
        return cy.get('div#content ul li h2')
    }
    getAddToCartButton()
    {
        return cy.get('button#button-cart')
    }

    getSuccessMessage()
    {
        return cy.get('#product-product div.alert')
    }

    
}

export default ProductDetailsPage;