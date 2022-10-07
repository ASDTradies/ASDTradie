describe('Testing Invoice Generation', () => {
  it('Tests if an invoice is generated successfully', () => {
    cy.visit('http://localhost:3000/invoice/billingForm')

    cy.get('#first_name').click({force:true}).get('#first_name')
    .type('Test1')
    .should('have.value', 'Test1')

    cy.get('#last_name').click({force:true}).get('#last_name')
    .type('Test2')
    .should('have.value', 'Test2')

    cy.get('#street_address').click({force:true}).get('#street_address')
    .type('123 Test')
    .should('have.value', '123 Test')

    cy.get('#city').click({force:true}).get('#city')
    .type('HelloWorld')
    .should('have.value', 'HelloWorld')

    cy.get('#payBtn').click()
    cy.get('#FirstName').should('have.value', '')
  })
})

describe('Testing OrderHistory', () => {
  it('Tests if OrderHistory page generates anything', () => {
    cy.visit('http://localhost:3000/invoice/orderHistory')

    cy.get('#invoiceList')
    .should('have.value', '')
  })
})

describe('Testing workHistory', () => {
  it('Tests if workHistory page generates anything', () => {
    cy.visit('http://localhost:3000/invoice/workHistory')

    cy.get('#invoiceList')
    .should('have.value', '')
  })
})
