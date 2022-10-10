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

describe('Testing Tradie Login', () => {
  it('Tests tradie login', () =>{
    cy.visit('http://localhost:3000/users/login')
    cy.get('#email')
    .type('admin@admin.com')
    .should('have.value', 'admin@admin.com')

    cy.get('#password')
    .type('admin')
    .should('have.value', 'admin')
    cy.get('#loginBtn').click()
    cy.url().should('include', '/tradieDashboard')
  })
})

describe('Testing Customer Login', () => {
  it('Tests customer login', () =>{
    cy.visit('http://localhost:3000/users/login')
    cy.get('#email')
    .type('customer@trades.com')
    .should('have.value', 'customer@trades.com')

    cy.get('#password')
    .type('customer')
    .should('have.value', 'customer')
    cy.get('#loginBtn').click()
    cy.url().should('include', '/customerDashboard')
  })

})

describe('Testing View Details button for Service Requested for Customer Dashboard', () => {
  it('Tests to see if customer can click on the View Details button and get redirected to an existing serviceRequest page', () => {

    cy.visit('http://localhost:3000/customerDashboard.html')
    cy.contains('View Details')
    cy.contains('View Details').click()
    cy.url().should('include', 'serviceRequestDP?id=')

  })
})

describe('Testing if tradie can view detail of an existing Service on Tradie Dashboard', () => {
  it('Tests to see if tradie can click on the View Details button and get redirected to an existing Service page', () => {
    cy.visit('http://localhost:3000/tradieDashboard.html')
    cy.contains('View Details')
    cy.contains('View Details').click()
    cy.url().should('include', 'serviceDP?id=')

  })
})

/*
describe('Testing Review', ( => {
  it('Tests if review is successfully submitted', () => {
    cy.visit('http://localhost:3000/reviews')
    cy.get(#reviewList).should('have.value', 'Good')
  })
  })

  describe('Testing dublicates reviews, ( => {
  it('Tests if review is successfully submitted', () => {
    cy.visit('http://localhost:3000/reviews')
    cy.remove((#review).type('id',01))
    cy.get(#reviewList).get(have.value, '01) == null;
  })
  })
*/