describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

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

