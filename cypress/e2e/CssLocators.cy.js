describe('CSS Locators', () => {
    it('should search for "T-Shirts" and verify the result', () => {
      // First, open the application
      cy.visit("http://www.automationpractice.pl/index.php");
  
      // Enter "T-Shirts" in the search input
      cy.get("input#search_query_top")
        .type("T-Shirts");

      // Click the search button
      cy.get("[name='submit_search']")
        .click();
  
      // Verify that the search results contain "T-Shirts"
      cy.get('.lighter')
        .should('be.visible')
        .and('contain', 'T-Shirts');

        // use class and  attribute
      
    });
  });