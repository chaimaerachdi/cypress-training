//here write tests in the specification file 
//cypress will follow mocha frame work  to write all our tests
//?
//syntax -*cypress.io*

// End-to-end Testing-------------------------------
// Cypress was originally designed to run end-to-end
//  (E2E) tests on anything that runs in a browser. 
//  A typical E2E test visits the application in a 
//  browser and performs actions via the UI just
//   like a real user would.
// -----------------------------------------

describe('my first test ', () => {
    // mocha framework
    // ---run test-----------------
    // throw cypress app(npx cypress open) open the app but u have to  run it manually 
    // or cmd:1/-npx cypress  run
    // for this command it will run utr tests automalitically after lunching the app 
    it('possitive test',()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.title().should('eq','OrangeHRM')
    })

    it('negative test',()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.title().should('eq','OrangeHRM123')
    }) 
})

