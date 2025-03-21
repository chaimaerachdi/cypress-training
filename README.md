describe('TestApecil', () => {
  beforeEach(() => {
    cy.visit('https://front-recette3.intencial.fr/connexion#/');
  });

  it('should handle cookie popup and login', () => {
   cy.intercept('GET', '**/menu').as('getMenu');
   cy.wait('@getMenu').its('response.statusCode', {timeout:1000}).should('eq', 200);

   cy.wait(1000);
   cy.get("#tarteaucitronPersonalize2").should("be.visible").click();
  //  cy.get('div#tarteaucitronAlertBig').should('be.visible')
  // cy.wait(1000);
  // cy.get('button#tarteaucitronPersonalize2', { timeout: 10000 }).click({force:true});
// username 
  cy.get('input#username', { timeout: 10000 })
    .should('be.visible')
    .type('40114869-1665707', { force: true });
// next
  cy.contains('button', 'Suivant')
     .should('be.visible')
     .click({ force: true});
// password
  cy.get('input#password', { timeout: 10000 })
    .should('be.visible')
    .type('test', {force: true});
// connexion
  cy.contains('button', 'Connexion')
    .should('be.visible')
    .click({ force: true });

  cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Cannot read properties of undefined')) {
          return false;
      }
      return true;
  });

    cy.get('#univers-intencial', { timeout: 10000 }).click({force:true});

    cy.visit('https://front-recette3.intencial.fr/demarrer-projet-souscription?referrer=https%3A%2F%2Ffront-recette3.intencial.fr%2Faccueil-connect#/');
  // choisir personne physique 
    cy.get('button[data-testid="personne-physique-btn"]',{ timeout: 10000 }).click({force:true});
  // cin---> non  
    cy.get('button[data-testid="piece-identite-numerique-Non"]',{ timeout: 10000 }).click({force:true});
  // checkbox
    cy.get('span.co-radio__checkmark',{ timeout: 10000 }).click({ multiple: true });
    
    cy.get('input[name="client.etatCivil.nomNaissance"].MuiInputBase-input').type('test nom', { force: true });  
    cy.get('input[name="client.etatCivil.prenom"].MuiInputBase-input').type('test nom', { force: true });  
    cy.get('input[name="client.etatCivil.dateNaissance"]', { timeout: 10000 }).first().type('01/01/2002', { force: true });//CAPEUT  CHANGER SELON LE BUILD   VAUT MIEUX UTILISER LE NAME 
    cy.get('input[type="email"]', { timeout: 10000 }).type('chaimaer759@gmail.com', { force: true });
    
    cy.get('input[id="client.etatCivil.villeNaissance"]', { timeout: 10000 }).should('be.visible').type('Parves et Nattages').get('.co-autocomplete__suggestionsList', { timeout: 10000 }).should('be.visible').find('li').first().should('be.visible').click();
  // DEPARTEMENT DE NAISSANCE  OK
    cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');
  // code telephonique et num   de telephone
    cy.get('div[name="telephoneMobile.indicatif"]').type('FRANCE ( 0033 ) {enter}');
    cy.get('input[id="telephoneMobile.numeroTelephone"]', { timeout: 10000 }).type('0612345678', { force: true });
    cy.get('div[name="client.etatCivil.situationFamiliale"]',{ timeout: 10000 }).type('Célibataire {enter}'); 
    // --ADRESSE----------------------------------
    // COORDONNEES
    cy.get('div[name="adressePrincipale"] input.MuiInputBase-input', { timeout: 10000 }).type('Teste du Gros de Mageau', { force: true });  cy.get('input[name="codePostal"]', { timeout: 10000 }).type('60000', { force: true });
    cy.get('input[id="ville"]').type('Paris {enter}'); 
    cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).click({force:true});
    cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');
// etape 2 de la  souscription
    cy.get('div[name="client.situationProfessionnelle.situationActuelle"]',{ timeout: 10000 }).should('be.visible').type('Actif(ve) {enter}');
    cy.get('input[name="client.situationProfessionnelle.professionActuelle"]',{ timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
    cy.get('div[name="client.situationProfessionnelle.categorieSocioProfessionnelle"]',{ timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
    cy.get('div[name="client.situationProfessionnelle.secteurActivite"]',{ timeout: 10000 }).should('be.visible').type('Administration publique {enter}');

    cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });
    // Remplir le premier tableau
    cy.get('table.MuiTable-root').first().within(() => {
      cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
        cy.wrap($el).should('be.visible').type('10000 {enter}');
      });
    });

    // Cliquer sur le bouton "Suivant"
    cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).should('be.visible').click({ force: true });

    // Remplir le deuxième tableau
    cy.get('table.MuiTable-root').eq(1).within(() => {
      cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
        cy.wrap($el).should('be.visible').type('10000 {enter}');
      });
    });
    
    // Cliquer sur le bouton "Suivant"
    cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });

    cy.get('button[data-testid="acc-enregistrer-btn"]',{ timeout: 10000 }).click({force:true});

    cy.get('button[data-testid="copartis-compte-titres-ordinaire"]',{ timeout: 10000 }).click({force:true});
// etape 3 de la  souscription : profil financier
    cy.get('button[data-testid="ouvrir-questionnaire-profilFinancier-modal-btn"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Moins de 3 ans"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Le moins de risque possible"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Un potentiel de gain faible sans perte de capital"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Augmenter mon revenu à court terme"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Je revendrais la totalité de mes investissements"]',{ timeout: 10000 }).click({force:true});

    //a modifier par la suite on doit ajouter un attribut data-test-is
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); 
    // 2  eme partie des questions :
    cy.get('input[aria-label="< 50 000 euros par an"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="> 75%"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Ils vont se dégrader"]',{ timeou: 1000 }).click({force:true});
    cy.get('input[aria-label="Plus de 50%"]',{ timeout: 1000 }).click({force:true});

    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); 


    // 3  eme partie des questions :
    cy.get('input[aria-label="Faible"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Oui"]',{ timeout: 1000 }).click({multiple:true});
    cy.get('input[aria-label="Je n\'ai pas fait d\'investissement"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Aucun"]',{ timeout: 1000 }).click({force:true});
   
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Enregistrer')
    .click({force:true});


    cy.get('button[data-testid="ouvrir-questionnaire-profilDurabilite-modal-btn"]',{ timeout: 10000 }).click({force:true});
    //calcul le profil  durabilite
    cy.get('input[aria-label="Oui"]',{ timeout: 1000 }).click({multiple:true});
    // suivant
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')//data-test-id???
    .click({force:true}); 

    cy.get('input[aria-label="Aucune"]',{ timeout: 1000 }).click({multiple:true}); 
      // suivant  
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); // a voir par la   suite  ecrire ce code repetitif  dans une fonction  a  appeler   a partir d ici  au lieu d ajouter   ce code a chaque fois 

    cy.get('input[aria-label="Entre 1 et 10%"]').first().click({ force: true });          // suivant  
    cy.get('button.MuiButton-root')
      .contains('span.content', 'Enregistrer')
      .click({force:true}); // a voir par la   suite  ecrire ce code repetitif  dans une fonction  a  appeler   a partir d ici  au lieu d ajouter   ce code a chaque fois 



    cy.get('button[data-testid="souscription-avec-signature-electronique"]',{ timeout: 10000 }).click({force:true});

    cy.get('input[name="objectifInvestissement.code"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[data-testid="souscription-suivant-btn"]',{ timeout: 10000 }).click({force:true});
  });
});
















// describe('TestApecil', () => {
//   beforeEach(() => {
//     cy.visit('https://front-recette3.intencial.fr/connexion#/');
//   });

//   it('should handle cookie popup and login', () => {
//    cy.intercept('GET', '**/menu').as('getMenu');
//    cy.wait('@getMenu').its('response.statusCode', {timeout:1000}).should('eq', 200);

//    cy.wait(1000);
//    cy.get("#tarteaucitronPersonalize2").should("be.visible").click();
//   //  cy.get('div#tarteaucitronAlertBig').should('be.visible')
//   // cy.wait(1000);
//   // cy.get('button#tarteaucitronPersonalize2', { timeout: 10000 }).click({force:true});
//   cy.screenshot('etape1-cookie-popup'); // Capture d'écran après la gestion des cookies
// // username 
//   cy.get('input#username', { timeout: 10000 })
//     .should('be.visible')
//     .type('40114869-1665707', { force: true });

// // next
//   cy.contains('button', 'Suivant')
//      .should('be.visible')
//      .click({ force: true});

// // password
//   cy.get('input#password', { timeout: 10000 })
//     .should('be.visible')
//     .type('test', {force: true});
// // connexion
//   cy.contains('button', 'Connexion')
//     .should('be.visible')
//     .click({ force: true });

//   cy.on('uncaught:exception', (err) => {
//       if (err.message.includes('Cannot read properties of undefined')) {
//           return false;
//       }
//       return true;
//   });

//   cy.get('#univers-intencial', { timeout: 10000 }).click({force:true});


//   cy.visit('https://front-recette3.intencial.fr/demarrer-projet-souscription?referrer=https%3A%2F%2Ffront-recette3.intencial.fr%2Faccueil-connect#/');

//   // choisir personne physique 
//   cy.get('button[data-testid="personne-physique-btn"]',{ timeout: 10000 }).click({force:true});

//   // cin---> non  
//   cy.get('button[data-testid="piece-identite-numerique-Non"]',{ timeout: 10000 }).click({force:true});


//   cy.get('span.co-radio__checkmark',{ timeout: 10000 }).click({ multiple: true });

//   cy.get('input[name="client.etatCivil.nomNaissance"].MuiInputBase-input').type('test nom', { force: true });  
//   cy.get('input[name="client.etatCivil.prenom"].MuiInputBase-input').type('test nom', { force: true });  
  
//   cy.get('input[name="client.etatCivil.dateNaissance"]', { timeout: 10000 }).first().type('01/01/2002', { force: true });//CAPEUT  CHANGER SELON LE BUILD   VAUT MIEUX UTILISER LE NAME 
//   cy.get('input[type="email"]', { timeout: 10000 }).type('chaimaer759@gmail.com', { force: true });

// // VILLE DE NAISSANCE  

//   cy.get('input[id="client.etatCivil.villeNaissance"]', { timeout: 10000 })
//     .type('Parves et Nattages', { force: true }) // Saisir le texte
//     .type('{downarrow}') // Naviguer vers la première suggestion
//     .type('{enter}');


// // DEPARTEMENT DE NAISSANCE  OK
//   cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');

//   // code telephonique
//   cy.get('div[name="telephoneMobile.indicatif"]').type('FRANCE ( 0033 ) {enter}');
//   cy.get('input[id="telephoneMobile.numeroTelephone"]', { timeout: 10000 }).type('0612345678', { force: true });


//   cy.get('div[name="client.etatCivil.situationFamiliale"]').type('Célibataire {enter}'); 

//   // COORDONNEES
//   cy.get('div[name="adressePrincipale"] input.MuiInputBase-input', { timeout: 10000 }).type('Teste du Gros de Mageau', { force: true });  cy.get('input[name="codePostal"]', { timeout: 10000 }).type('60000', { force: true });
//   cy.get('input[id="ville"]').type('Paris {enter}'); 


//   cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).click({force:true});

//  });
// });













----------------------------------------------------------------------------------------------------












describe('TestApecil', () => {
  beforeEach(() => {
    cy.visit('https://front-recette3.intencial.fr/connexion#/');
  });

  it('should handle cookie popup and login', () => {
   cy.intercept('GET', '**/menu').as('getMenu');
   cy.wait('@getMenu').its('response.statusCode', {timeout:1000}).should('eq', 200);

   cy.wait(1000);
   cy.get("#tarteaucitronPersonalize2").should("be.visible").click();
  //  cy.get('div#tarteaucitronAlertBig').should('be.visible')
  // cy.wait(1000);
  // cy.get('button#tarteaucitronPersonalize2', { timeout: 10000 }).click({force:true});
// username 
  cy.get('input#username', { timeout: 10000 })
    .should('be.visible')
    .type('40114869-1665707', { force: true });
// next
  cy.contains('button', 'Suivant')
     .should('be.visible')
     .click({ force: true});
// password
  cy.get('input#password', { timeout: 10000 })
    .should('be.visible')
    .type('test', {force: true});
// connexion
  cy.contains('button', 'Connexion')
    .should('be.visible')
    .click({ force: true });

  cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Cannot read properties of undefined')) {
          return false;
      }
      return true;
  });

    cy.get('#univers-intencial', { timeout: 10000 }).click({force:true});

    cy.visit('https://front-recette3.intencial.fr/demarrer-projet-souscription?referrer=https%3A%2F%2Ffront-recette3.intencial.fr%2Faccueil-connect#/');
  // choisir personne physique 
    cy.get('button[data-testid="personne-physique-btn"]',{ timeout: 10000 }).click({force:true});
  // cin---> non  
    cy.get('button[data-testid="piece-identite-numerique-Non"]',{ timeout: 10000 }).click({force:true});
  // checkbox
    cy.get('span.co-radio__checkmark',{ timeout: 10000 }).click({ multiple: true });
    
    cy.get('input[name="client.etatCivil.nomNaissance"].MuiInputBase-input').type('test nom', { force: true });  
    cy.get('input[name="client.etatCivil.prenom"].MuiInputBase-input').type('test nom', { force: true });  
    cy.get('input[name="client.etatCivil.dateNaissance"]', { timeout: 10000 }).first().type('01/01/2002', { force: true });//CAPEUT  CHANGER SELON LE BUILD   VAUT MIEUX UTILISER LE NAME 
    cy.get('input[type="email"]', { timeout: 10000 }).type('chaimaer759@gmail.com', { force: true });
    // 
    cy.get('input[id="client.etatCivil.villeNaissance"]', { timeout: 10000 })
    .should('be.visible')
    .type('Parves et Nattages', { delay: 100 })
    .type('{enter}');
  
  // DEPARTEMENT DE NAISSANCE  OK
    cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');
  // code telephonique et num   de telephone
    cy.get('div[name="telephoneMobile.indicatif"]').type('FRANCE ( 0033 ) {enter}');
        // Handle modal if it appears
    cy.get('body').then(($body) => {
      if ($body.find('div.MuiDialog-paper').length > 0) {
        cy.get('div.MuiDialog-paper', { timeout: 10000 })
          .should('be.visible')
          .within(() => {
            cy.get('label[data-testid="unicite-aucune-propo-label"]').click();
            cy.get('button[data-testid="valider-choix-unicite-client-btn"]').click();
          });
      }
    });
    cy.get('input[id="telephoneMobile.numeroTelephone"]', { timeout: 10000 }).type('0612345678', { force: true });
    cy.get('div[name="client.etatCivil.situationFamiliale"]',{ timeout: 10000 }).type('Célibataire {enter}'); 
    // --ADRESSE----------------------------------
    // COORDONNEES
    cy.get('div[name="adressePrincipale"] input.MuiInputBase-input', { timeout: 10000 }).type('Teste du Gros de Mageau', { force: true });  cy.get('input[name="codePostal"]', { timeout: 10000 }).type('60000', { force: true });
    cy.get('input[id="ville"]').type('Paris {enter}'); 
    cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).click({force:true});
    cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');
// etape 2 de la  souscription
    cy.get('div[name="client.situationProfessionnelle.situationActuelle"]',{ timeout: 10000 }).should('be.visible').type('Actif(ve) {enter}');
    cy.get('input[name="client.situationProfessionnelle.professionActuelle"]',{ timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
    cy.get('div[name="client.situationProfessionnelle.categorieSocioProfessionnelle"]',{ timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
    cy.get('div[name="client.situationProfessionnelle.secteurActivite"]',{ timeout: 10000 }).should('be.visible').type('Administration publique {enter}');

    cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });
    // Remplir le premier tableau
    cy.get('table.MuiTable-root').first().within(() => {
      cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
        cy.wrap($el).should('be.visible').clear().type('10000 {enter}');
      });
    });

    // Cliquer sur le bouton "Suivant"
    cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).should('be.visible').click({ force: true });

    // Remplir le deuxième tableau
    cy.get('table.MuiTable-root').eq(1).within(() => {
      cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
        cy.wrap($el).should('be.visible').clear().type('10000 {enter}');
      });
    });
    
    // Cliquer sur le bouton "Suivant"
    cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });

    cy.get('button[data-testid="acc-enregistrer-btn"]',{ timeout: 10000 }).click({force:true});

    cy.get('button[data-testid="copartis-compte-titres-ordinaire"]',{ timeout: 10000 }).click({force:true});
// etape 3 de la  souscription : profil financier
    cy.get('button[data-testid="ouvrir-questionnaire-profilFinancier-modal-btn"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Moins de 3 ans"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Le moins de risque possible"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Un potentiel de gain faible sans perte de capital"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Augmenter mon revenu à court terme"]',{ timeout: 10000 }).click({force:true});
    cy.get('input[aria-label="Je revendrais la totalité de mes investissements"]',{ timeout: 10000 }).click({force:true});

    //a modifier par la suite on doit ajouter un attribut data-test-is
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); 
    // 2  eme partie des questions :
    cy.get('input[aria-label="< 50 000 euros par an"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="> 75%"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Ils vont se dégrader"]',{ timeou: 1000 }).click({force:true});
    cy.get('input[aria-label="Plus de 50%"]',{ timeout: 1000 }).click({force:true});

    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); 


    // 3  eme partie des questions :
    cy.get('input[aria-label="Faible"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Oui"]',{ timeout: 1000 }).click({multiple:true});
    cy.get('input[aria-label="Je n\'ai pas fait d\'investissement"]',{ timeout: 1000 }).click({force:true});
    cy.get('input[aria-label="Aucun"]',{ timeout: 1000 }).click({force:true});
   
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Enregistrer')
    .click({force:true});


    cy.get('button[data-testid="ouvrir-questionnaire-profilDurabilite-modal-btn"]',{ timeout: 10000 }).click({force:true});
    //calcul le profil  durabilite
    cy.get('input[aria-label="Oui"]',{ timeout: 1000 }).click({multiple:true});
    // suivant
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')//data-test-id???
    .click({force:true}); 

    cy.get('input[aria-label="Aucune"]',{ timeout: 1000 }).click({multiple:true}); 
      // suivant  
    cy.get('button.MuiButton-root')
    .contains('span.content', 'Question suivante')
    .click({force:true}); // a voir par la   suite  ecrire ce code repetitif  dans une fonction  a  appeler   a partir d ici  au lieu d ajouter   ce code a chaque fois 

    cy.get('input[aria-label="Entre 1 et 10%"]',{ timeout: 1000 }).first().click({ force: true });          // suivant  
    cy.get('button.MuiButton-root')
      .contains('span.content', 'Enregistrer')
      .click({force:true}); // a voir par la   suite  ecrire ce code repetitif  dans une fonction  a  appeler   a partir d ici  au lieu d ajouter   ce code a chaque fois 

    
    cy.get('button[data-testid="souscription-avec-signature-electronique"]', { timeout: 10000 }).should('be.visible').click({ force: true });
    
    // Partie : info du contrat------------------------------------------------------------
    // Remplir les champs
    cy.get('input[type="radio"][name="objectifInvestissement.code"]').check()
    .then(() => cy.get('button[data-testid="souscription-suivant-btn"]').click());

    cy.get('input[name="versementInitial.tauxDerogatoire"]', { timeout: 10000 })
    .should('be.visible')
    .type('4.50', { force: true });

    cy.get('input[name="versementInitial.origineDesFonds.ofRevenusPro"]', { timeout: 10000 })
    .should('be.visible')
    .type('10000.00', { force: true });

    // Cocher la case radio
    cy.get('input[type="radio"][name="versementInitial.modePaiement"][value="C"]', { timeout: 10000 })
    .should('be.visible')
    .check({ force: true });

    // Cliquer sur le bouton "Suivant"
    cy.get('button[data-testid="souscription-suivant-btn"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
     
    // Sélectionner le champ de recherche et taper la valeur
    cy.get('input[placeholder="Saisir code ISIN ou libellé"]', { timeout: 10000 })
    .should('be.visible')
    .type('EUROPE PATRIMOINE MARS 25', { force: true });

    // Attendre que la liste déroulante apparaisse et sélectionner la première option
    cy.get('div[role="option"]', { timeout: 10000 })
    .first() // Sélectionne la première option de la liste
    .should('be.visible')
    .click({ force: true });


    
  });
});




















// describe('TestApecil', () => {
//   beforeEach(() => {
//     cy.visit('https://front-recette3.intencial.fr/connexion#/');
//   });

//   it('should handle cookie popup and login', () => {
//     cy.intercept('GET', '**/menu').as('getMenu');
//     cy.wait('@getMenu').its('response.statusCode', { timeout: 1000 }).should('eq', 200);

//     cy.wait(1000);
//     cy.get("#tarteaucitronPersonalize2").should("be.visible").click();

//     // Username
//     cy.get('input#username', { timeout: 10000 })
//       .should('be.visible')
//       .type('40114869-1665707', { force: true });

//     // Next
//     cy.contains('button', 'Suivant')
//       .should('be.visible')
//       .click({ force: true });

//     // Password
//     cy.get('input#password', { timeout: 10000 })
//       .should('be.visible')
//       .type('test', { force: true });

//     // Connexion
//     cy.contains('button', 'Connexion')
//       .should('be.visible')
//       .click({ force: true });

//     // Handle uncaught exceptions
//     cy.on('uncaught:exception', (err) => {
//       if (err.message.includes('Cannot read properties of undefined')) {
//         return false;
//       }
//       return true;
//     });

//     cy.get('#univers-intencial', { timeout: 10000 }).click({ force: true });

//     cy.visit('https://front-recette3.intencial.fr/demarrer-projet-souscription?referrer=https%3A%2F%2Ffront-recette3.intencial.fr%2Faccueil-connect#/');

//     // Choose "Personne Physique"
//     cy.get('button[data-testid="personne-physique-btn"]', { timeout: 10000 }).click({ force: true });

//     // CIN --> Non
//     cy.get('button[data-testid="piece-identite-numerique-Non"]', { timeout: 10000 }).click({ force: true });

//     // Checkbox
//     cy.get('span.co-radio__checkmark', { timeout: 10000 }).click({ multiple: true });

//     // Fill personal information
//     cy.get('input[name="client.etatCivil.nomNaissance"].MuiInputBase-input').type('test nom', { force: true });
//     cy.get('input[name="client.etatCivil.prenom"].MuiInputBase-input').type('test nom', { force: true });
//     cy.get('input[name="client.etatCivil.dateNaissance"]', { timeout: 10000 }).first().type('01/01/2002', { force: true });
//     cy.get('input[type="email"]', { timeout: 10000 }).type('chaimaer759@gmail.com', { force: true });
//     // Ville de Naissance
//     cy.get('input[id="client.etatCivil.villeNaissance"]', { timeout: 10000 })
//       .should('be.visible') // Attend que le champ soit visible
//       .type('Parves et Nattages') // Saisit la valeur
//       .type('{downarrow}') // Navigue vers la première suggestion
//       .type('{enter}'); // Valide la sélection avec la touche "Entrée"

//     // Département de Naissance
//     cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');
//     // Gestion de la modale (si elle s'affiche)
//     cy.get('body').then(($body) => {
//       if ($body.find('div.MuiDialog-paper').length > 0) { // Si la modale est présente
//         cy.get('div.MuiDialog-paper', { timeout: 10000 })
//           .should('be.visible')
//           .within(() => {
//             cy.get('label[data-testid="unicite-aucune-propo-label"]').click(); // Coche l'option
//             cy.get('button[data-testid="valider-choix-unicite-client-btn"]').click(); // Valide
//           });
//       }
//     });
//     // Code téléphonique et numéro de téléphone
//     cy.get('div[name="telephoneMobile.indicatif"]').type('FRANCE ( 0033 ) {enter}');

//     // Handle modal if it appears
//     cy.get('body').then(($body) => {
//       if ($body.find('div.MuiDialog-paper').length > 0) {
//         cy.get('div.MuiDialog-paper', { timeout: 10000 })
//           .should('be.visible')
//           .within(() => {
//             cy.get('label[data-testid="unicite-aucune-propo-label"]').click();
//             cy.get('button[data-testid="valider-choix-unicite-client-btn"]').click();
//           });
//       }
//     });

//     cy.get('input[id="telephoneMobile.numeroTelephone"]', { timeout: 10000 }).type('0612345678', { force: true });

//     // Situation Familiale
//     cy.get('div[name="client.etatCivil.situationFamiliale"]', { timeout: 10000 }).type('Célibataire {enter}');

//     // Adresse
//     cy.get('div[name="adressePrincipale"] input.MuiInputBase-input', { timeout: 10000 }).type('Teste du Gros de Mageau', { force: true });
//     cy.get('input[name="codePostal"]', { timeout: 10000 }).type('60000', { force: true });
//     cy.get('input[id="ville"]').type('Paris {enter}');

//     // Next
//     cy.get('button[data-testid="acc-suivant-btn"]', { timeout: 10000 }).click({ force: true });

//     // Etape 2: Situation Professionnelle
//     cy.get('div[name="client.situationProfessionnelle.situationActuelle"]', { timeout: 10000 }).should('be.visible').type('Actif(ve) {enter}');
//     cy.get('input[name="client.situationProfessionnelle.professionActuelle"]', { timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
//     cy.get('div[name="client.situationProfessionnelle.categorieSocioProfessionnelle"]', { timeout: 10000 }).should('be.visible').type('Agriculteur {enter}');
//     cy.get('div[name="client.situationProfessionnelle.secteurActivite"]', { timeout: 10000 }).should('be.visible').type('Administration publique {enter}');

//     // Next
//     cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });

//     // Fill first table
//     cy.get('table.MuiTable-root').first().within(() => {
//       cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
//         cy.wrap($el).should('be.visible').type('10000 {enter}');
//       });
//     });

//     // Next
//     cy.get('button[data-testid="acc-suivant-btn"]', { timeout: 10000 }).should('be.visible').click({ force: true });

//     // Fill second table
//     cy.get('table.MuiTable-root').eq(1).within(() => {
//       cy.get('input[placeholder="Montant en €"].MuiInputBase-input').each(($el) => {
//         cy.wrap($el).should('be.visible').type('10000 {enter}');
//       });
//     });

//     // Next
//     cy.get('button[data-testid="acc-suivant-btn"]').should('be.visible').click({ force: true });

//     // Enregistrer
//     cy.get('button[data-testid="acc-enregistrer-btn"]', { timeout: 10000 }).click({ force: true });

//     // Etape 3: Profil Financier
//     cy.get('button[data-testid="ouvrir-questionnaire-profilFinancier-modal-btn"]', { timeout: 10000 }).click({ force: true });

//     // Answer questions
//     cy.get('input[aria-label="Moins de 3 ans"]', { timeout: 10000 }).click({ force: true });
//     cy.get('input[aria-label="Le moins de risque possible"]', { timeout: 10000 }).click({ force: true });
//     cy.get('input[aria-label="Un potentiel de gain faible sans perte de capital"]', { timeout: 10000 }).click({ force: true });
//     cy.get('input[aria-label="Augmenter mon revenu à court terme"]', { timeout: 10000 }).click({ force: true });
//     cy.get('input[aria-label="Je revendrais la totalité de mes investissements"]', { timeout: 10000 }).click({ force: true });

//     // Next
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Question suivante')
//       .click({ force: true });

//     // Second set of questions
//     cy.get('input[aria-label="< 50 000 euros par an"]', { timeout: 1000 }).click({ force: true });
//     cy.get('input[aria-label="> 75%"]', { timeout: 1000 }).click({ force: true });
//     cy.get('input[aria-label="Ils vont se dégrader"]', { timeout: 1000 }).click({ force: true });
//     cy.get('input[aria-label="Plus de 50%"]', { timeout: 1000 }).click({ force: true });

//     // Next
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Question suivante')
//       .click({ force: true });

//     // Third set of questions
//     cy.get('input[aria-label="Faible"]', { timeout: 1000 }).click({ force: true });
//     cy.get('input[aria-label="Oui"]', { timeout: 1000 }).click({ multiple: true });
//     cy.get('input[aria-label="Je n\'ai pas fait d\'investissement"]', { timeout: 1000 }).click({ force: true });
//     cy.get('input[aria-label="Aucun"]', { timeout: 1000 }).click({ force: true });

//     // Enregistrer
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Enregistrer')
//       .click({ force: true });

//     // Profil Durabilité
//     cy.get('button[data-testid="ouvrir-questionnaire-profilDurabilite-modal-btn"]', { timeout: 10000 }).click({ force: true });

//     // Answer questions
//     cy.get('input[aria-label="Oui"]', { timeout: 1000 }).click({ multiple: true });

//     // Next
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Question suivante')
//       .click({ force: true });

//     cy.get('input[aria-label="Aucune"]', { timeout: 1000 }).click({ multiple: true });

//     // Next
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Question suivante')
//       .click({ force: true });

//     cy.get('input[aria-label="Entre 1 et 10%"]').first().click({ force: true });

//     // Enregistrer
//     cy.get('button.MuiButton-root')
//       .contains('span.content', 'Enregistrer')
//       .click({ force: true });

//     // Signature électronique
//     cy.get('button[data-testid="souscription-avec-signature-electronique"]', { timeout: 10000 }).click({ force: true });

//     // Objectif Investissement
//     cy.get('input[name="objectifInvestissement.code"]', { timeout: 10000 }).click({ force: true });
//     cy.get('input[data-testid="souscription-suivant-btn"]', { timeout: 10000 }).click({ force: true });
//   });
// });













// describe('TestApecil', () => {
//   beforeEach(() => {
//     cy.visit('https://front-recette3.intencial.fr/connexion#/');
//   });

//   it('should handle cookie popup and login', () => {
//    cy.intercept('GET', '**/menu').as('getMenu');
//    cy.wait('@getMenu').its('response.statusCode', {timeout:1000}).should('eq', 200);

//    cy.wait(1000);
//    cy.get("#tarteaucitronPersonalize2").should("be.visible").click();
//   //  cy.get('div#tarteaucitronAlertBig').should('be.visible')
//   // cy.wait(1000);
//   // cy.get('button#tarteaucitronPersonalize2', { timeout: 10000 }).click({force:true});
//   cy.screenshot('etape1-cookie-popup'); // Capture d'écran après la gestion des cookies
// // username 
//   cy.get('input#username', { timeout: 10000 })
//     .should('be.visible')
//     .type('40114869-1665707', { force: true });

// // next
//   cy.contains('button', 'Suivant')
//      .should('be.visible')
//      .click({ force: true});

// // password
//   cy.get('input#password', { timeout: 10000 })
//     .should('be.visible')
//     .type('test', {force: true});
// // connexion
//   cy.contains('button', 'Connexion')
//     .should('be.visible')
//     .click({ force: true });

//   cy.on('uncaught:exception', (err) => {
//       if (err.message.includes('Cannot read properties of undefined')) {
//           return false;
//       }
//       return true;
//   });

//   cy.get('#univers-intencial', { timeout: 10000 }).click({force:true});


//   cy.visit('https://front-recette3.intencial.fr/demarrer-projet-souscription?referrer=https%3A%2F%2Ffront-recette3.intencial.fr%2Faccueil-connect#/');

//   // choisir personne physique 
//   cy.get('button[data-testid="personne-physique-btn"]',{ timeout: 10000 }).click({force:true});

//   // cin---> non  
//   cy.get('button[data-testid="piece-identite-numerique-Non"]',{ timeout: 10000 }).click({force:true});


//   cy.get('span.co-radio__checkmark',{ timeout: 10000 }).click({ multiple: true });

//   cy.get('input[name="client.etatCivil.nomNaissance"].MuiInputBase-input').type('test nom', { force: true });  
//   cy.get('input[name="client.etatCivil.prenom"].MuiInputBase-input').type('test nom', { force: true });  
  
//   cy.get('input[name="client.etatCivil.dateNaissance"]', { timeout: 10000 }).first().type('01/01/2002', { force: true });//CAPEUT  CHANGER SELON LE BUILD   VAUT MIEUX UTILISER LE NAME 
//   cy.get('input[type="email"]', { timeout: 10000 }).type('chaimaer759@gmail.com', { force: true });

// // VILLE DE NAISSANCE  

//   cy.get('input[id="client.etatCivil.villeNaissance"]', { timeout: 10000 })
//     .type('Parves et Nattages', { force: true }) // Saisir le texte
//     .type('{downarrow}') // Naviguer vers la première suggestion
//     .type('{enter}');


// // DEPARTEMENT DE NAISSANCE  OK
//   cy.get('div[name="client.etatCivil.departementNaissance"]').type('01-Ain {enter}');

//   // code telephonique
//   cy.get('div[name="telephoneMobile.indicatif"]').type('FRANCE ( 0033 ) {enter}');
//   cy.get('input[id="telephoneMobile.numeroTelephone"]', { timeout: 10000 }).type('0612345678', { force: true });


//   cy.get('div[name="client.etatCivil.situationFamiliale"]').type('Célibataire {enter}'); 

//   // COORDONNEES
//   cy.get('div[name="adressePrincipale"] input.MuiInputBase-input', { timeout: 10000 }).type('Teste du Gros de Mageau', { force: true });  cy.get('input[name="codePostal"]', { timeout: 10000 }).type('60000', { force: true });
//   cy.get('input[id="ville"]').type('Paris {enter}'); 


//   cy.get('button[data-testid="acc-suivant-btn"]',{ timeout: 10000 }).click({force:true});

//  });
// });






