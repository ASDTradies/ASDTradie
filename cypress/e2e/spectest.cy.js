
describe('Testing View Details button for Service Requested', () => {
  it('Tests to see if customer can click on the View Details button and get redirected to an existing serviceRequest page', () => {

    cy.visit('http://localhost:3000/customerDashboard.html')
    cy.contains('View Details')
    cy.contains('View Details').click()
    cy.url().should('include', 'serviceRequestDP?id=')

  })
})


describe('Testing if tradie can view detail of an existing Service', () => {
  it('Tests to see if tradie can click on the View Details button and get redirected to an existing Service page', () => {
    cy.visit('http://localhost:3000/tradieDashboard.html')
    cy.contains('View Details')
    cy.contains('View Details').click()
    cy.url().should('include', 'serviceDP?id=')

  })
})



