describe("login page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it("checks that the heading contains the correct text", () => {
    cy.get("[data-test='app-heading']").contains('Tenttisovellus')
  })

  it("logs in with credentials that match an existing user", () => {
    cy.get("#username").type('admin').should("have.value", "admin")
    cy.get("#password").type('salasana').should("have.value", "salasana")
    cy.get("#loginButton").click()
    cy.location("pathname").should("eq", "/opettaja/etusivu") 
  })

  it("tries to log in with wrong credentials", () => {
    cy.get("#username").type('admin')
    cy.get("#password").type('Salasana')
    cy.get("#loginButton").click()
    cy.location("pathname").should("eq", "/")
  })
})









