//import { contactPage } from "../../ui-manager/sabina/pages/pages";
//import { generateRandomWords } from "../../ui-manager/sabina/helpers/functions";

describe("Test Contact Page", () => {

  beforeEach(() => {
    cy.visit("/")
      .wait(5000)
  });

  it(`Test Chat Open`, () => {
    cy.get('iframe.nKphmK[title="Wix Chat"]')
     .its('0.contentDocument')
     .find('#minimized-chat')
     .click()

    cy.get('iframe.nKphmK[title="Wix Chat"]')
     .its('0.contentDocument')
     .find('#root > div > div > div:nth-child(2) > div')
     .should('be.visible')

  });

  it('Test Form', () => {
    cy.get('iframe.nKphmK[title="Wix Chat"]').its('0.contentDocument').as('chatIframe')
  
    cy.get('@chatIframe')
      .find('#minimized-chat')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('#root > div > div > div:nth-child(2) > div > div._2Evtw > div > div.hhrXY > div.OIbFf > div')
      .should('be.visible')
      .type('Test');
  
    cy.get('@chatIframe')
      .find('#root > div > div > div:nth-child(2) > div > div._2Evtw > div > div.hhrXY > div.OIbFf > div > button.sk1yM.S66IV')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('#chat-messages-list')
      .find('div:contains("Test")')
      .should('exist');
  
    cy.get('@chatIframe')
      .find('form')
      .should('exist')
      .click();//form displayed
  });

  it.only('Test Chat Message', () => {
    cy.get('iframe.nKphmK[title="Wix Chat"]').its('0.contentDocument').as('chatIframe');
  
    cy.get('@chatIframe')
      .find('#minimized-chat')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('.OIbFf > div')
      .should('be.visible')
      .type('Test');
  
    cy.get('@chatIframe')
      .find('button.sk1yM.S66IV')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('#chat-messages-list')
      .contains('Test')
      .should('exist');
  
    cy.get('@chatIframe')
      .find('form')
      .should('exist')
      .within(() => {
        cy.get('#name').should('have.attr', 'aria-required', 'true');
        cy.get('#email').should('have.attr', 'aria-required', 'true');
        
        cy.get('#name').type('Nume Valid');
        cy.get('#email').type('email@valid.com');
        cy.get('#message').type('Mesaj Important');
      });
  
    cy.get('@chatIframe')
      .find('form button')
      .click();
  
    cy.get('@chatIframe')
      .find('.aGtJq')
      .should('be.visible');//mesaj de confirmare
  });
  
  it('Test Invalid Email', () => {
    cy.get('iframe.nKphmK[title="Wix Chat"]').its('0.contentDocument').as('chatIframe');
  
    cy.get('@chatIframe')
      .find('#minimized-chat')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('.OIbFf > div')
      .should('be.visible')
      .type('Test');
  
    cy.get('@chatIframe')
      .find('button.sk1yM.S66IV')
      .should('be.visible')
      .click();
  
    cy.get('@chatIframe')
      .find('#chat-messages-list')
      .contains('Test')
      .should('exist');
  
    cy.get('@chatIframe')
      .find('form')
      .should('exist')
      .within(() => {
        cy.get('#name').should('have.attr', 'aria-required', 'true');
        cy.get('#email').should('have.attr', 'aria-required', 'true');
        
        cy.get('#name').type('Nume Valid');
        // Fill invalid email
        cy.get('#email').type('invalid-email');
        cy.get('#message').type('Mesaj Important');
      });
  
    cy.get('@chatIframe')
      .find('form button')
      .click();

    cy.get('@chatIframe')
      .find('#email')
      .should('have.attr', 'aria-invalid', 'true');
  
    cy.get('@chatIframe')
      .find('#email-error')
      .should('be.visible');//eroare pt mail invalid
  });
  
});


