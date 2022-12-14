describe('test navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get("#username").type('admin')
    cy.get("#password").type('salasana')
    cy.get("#loginButton").click()
    cy.location("pathname").should("eq", "/opettaja/etusivu")
  })

  // group related tests together for better readability by using context
  context("Navigation bar", () => {
    it("checks that navbar contains correct amount of links", () => {
      cy.get(".navbar li").should("have.length", 3)
    })

    it("clicks the logout button", () => {
      cy.get('button')
      cy.get("[data-test='logoutButton']").click()
      cy.location("pathname").should("eq", "/")
    })

    it("clicks the link to home page", () => {
      cy.get("[data-test='homeLink']").click()
      cy.location("pathname").should("eq", "/opettaja/etusivu")
    })

    it("clicks the link to exams page", () => {
      cy.get("[data-test='examsLink']").click()
      cy.location("pathname").should("eq", "/opettaja/tentit")
    })
  })

  context("Main content", () => {
    it("checks that the heading contains the correct text", () => {
      cy.get("[data-test='homeHeading']").contains('Etusivu')
    })
  })

})