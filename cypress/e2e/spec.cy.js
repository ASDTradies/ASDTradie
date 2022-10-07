describe('Testing Invoice Generation', () => {
  it('Tests if an invoice is generated successfully', () => {
    cy.visit('http://localhost:3000/invoice/billingForm')

    cy.get('#first_name').click({force:true}).get('#first_name')
    .type('Test1')
    .should('have.value', 'Test1')

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
