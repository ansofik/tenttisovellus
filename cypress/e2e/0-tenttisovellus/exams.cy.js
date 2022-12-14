describe('test editing exam journey', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8080/testing/delete_exams')
    cy.visit('http://localhost:3000')
    cy.get("#username").type('admin')
    cy.get("#password").type('salasana')
    cy.get("#loginButton").click()
    cy.location("pathname").should("eq", "/opettaja/etusivu")
  })


  it('navigates to the exams page', () => {
    cy.get("[data-test='examsLink']").click()
    cy.location("pathname").should("eq", "/opettaja/tentit")
  })


  describe('when viewing exams page', () => {
    beforeEach(() => {
      cy.get("[data-test='examsLink']").click()
      cy.location("pathname").should("eq", "/opettaja/tentit")
    })


    it('adds a new exam and deletes it', () => {
      cy.get('[data-cy="testMenu"] li').should('not.exist')
      cy.contains("Lisää tentti").click()
      cy.get('[data-cy="testMenu"] li').should('have.length', 1)

      cy.get('[data-cy="deleteExamButton"]').click()
      cy.get('[data-cy="testMenu"] li').should('not.exist')
    })


    it('adds a new exam and selects it', () => {
      cy.get('[data-cy="addExamButton"]').click()
      cy.get('[data-cy="examButton"]').click()
      cy.contains('Tentin nimi')
      cy.contains('Lisää kysymys')
    })


    describe('when having added a new exam and selected to view it', () => {
      beforeEach(() => {
        cy.get('[data-cy="addExamButton"]').click()
        cy.get('[data-cy="examButton"]').click()
      })


      it('changes the exam name', () => {
        cy.get('#name').should('have.value', 'Uusi tentti')
        cy.get('#name').clear()
        cy.get('#name').type('Muutettu nimi', { delay: 50 })
        cy.get('#name').should('have.value', 'Muutettu nimi')
      })


      it('adds questions', () => {
        cy.contains("Lisää kysymys").click()
        cy.get('[data-cy="question"]').should('have.length', 1)

        cy.get('[data-cy="addQuestionButton"]').click()
        cy.get('[data-cy="question"]').should('have.length', 2)
      })


      it('adds question and options', () => {
        cy.get('[data-cy="addQuestionButton"]').click()
        cy.get('[data-cy="question"]').should('have.length', 1)
        cy.get('[data-cy="question"] input').type('Kysymysteksti', { delay: 50 })
        cy.get('[data-cy="question"] input').should('have.value', 'Kysymysteksti')

        cy.get('[data-cy="addOptionButton"]').click()
        cy.get('[data-cy="addOptionButton"]').click()
        cy.get('[data-cy="option"]').should('have.length', 2)

        cy.get('[data-cy="option"] input[type="text"]').eq(0).type('Vastausvaihtoehto 0')
        cy.get('[data-cy="option"] input[type="text"]').eq(0).should('have.value', 'Vastausvaihtoehto 0')
        cy.get('[data-cy="option"] input[type="text"]').eq(1).type('Vastausvaihtoehto 1')
        cy.get('[data-cy="option"] input[type="text"]').eq(1).should('have.value', 'Vastausvaihtoehto 1')
      })


      it('marks option correct and then incorrect', () => {
        cy.get('[data-cy="addQuestionButton"]').click()
        cy.get('[data-cy="addOptionButton"]').click()
        cy.get('[data-cy="addOptionButton"]').click()

        cy.get('[data-cy="option"] input[type="checkbox"]').eq(0).check()
        cy.get('[data-cy="option"] input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('[data-cy="option"] input[type="checkbox"]').eq(1).should('not.be.checked')

        cy.get('[data-cy="option"] input[type="checkbox"]').eq(0).uncheck()
        cy.get('[data-cy="option"] input[type="checkbox"]').eq(0).should('not.be.checked')
      })

    })
  })
})