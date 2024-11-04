import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {chatFrame, baseUrl} from  '../../pages/ChatForm'
 
function getIframeBody(selector) {
    return cy
      .get(selector) // get the iframe
      .scrollIntoView() // scroll to make it visible
      .its('0.contentDocument.body') // get the document of the iframe
      .should('not.be.empty') // ensure the body exists
      .then(cy.wrap); // wrap it so we can interact with it
  }
 
  Given('the home page is opened', () => {
    cy.visit(baseUrl);
    cy.wait(3000)
});
 
Given('the user sees the Chat icon', () => {
    getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatBtn)
    .should('be.visible');
});
 
When('the user clicks on the chat button', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatBtn)
      .click();
});
 
Then('the chat window is visible', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find('div[data-hook="expanded-widget"]')
      .should('be.visible')
      .and('contain', 'Online');
});
 
Then('the user can see an operator online', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find('div[data-hook="expanded-widget"]')
      .should('contain', 'Intern');
});
///
Given('the chat window is displayed and opened', () => {
    getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatBtn)
    .should('be.visible');
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatBtn)
      .click();
});
 
When('the user types a message', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatTextArea)
      .type("Test");
});
 
When('the user clicks the submit button', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.sendBtn)
      .click();
      cy.wait(5000)
});
 
Then('the user can see a form displayed', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatForm)
      .should('be.visible');
});

//
Given('the form is displayed', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatBtn)
      .click();
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatTextArea)
      .type("Test");
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.sendBtn)
      .click();
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatForm)
      .should('be.visible');
    cy.wait(5000)
});

Given('the user fills in the email field with {string}', (email) => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.inputEmail)
        .should('be.visible')
        .type(email)
        .should('have.value', email);
});

Given('the user fills in the name field with {string}', (name) => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.inputName)
        .should('be.visible')
        .type(name)
        .should('have.value', name);
});

Given('the user fills in the message field with {string}', (message) => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame. inputMessage)
        .should('be.visible')
        .type(message)
        .should('have.value', message);
});
   
When('the user clicks the Submit button', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.submitForm)
        .should('be.visible')
        .click();
});

Then('a success message is displayed confirming the message was sent', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formFeedback)
        .should('be.visible')
        .and('contain.text', 'Thanks! Message us here.');
});

Then('the "name" and "email" fields should have aria-required set to "true"', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.inputName)
    .should('be.visible')
    .and('have.attr', 'aria-required', 'true');
getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.inputEmail)
    .should('be.visible')
    .and('have.attr', 'aria-required', 'true');

});

Then('a warning icon is displayed for the email field', () => {
    getIframeBody(chatFrame.iframeSelector)
        .find(chatFrame.chatEmailError)
        .should('be.visible');
        
});

Then('a warning icon is displayed for the name field', () => {
    getIframeBody(chatFrame.iframeSelector)
        .find(chatFrame.chatNameError)
        .should('be.visible');
});

