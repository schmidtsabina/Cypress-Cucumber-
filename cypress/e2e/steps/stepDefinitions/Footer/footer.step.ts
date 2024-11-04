import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { NavBar, baseUrl } from "../../pages/Homepage";

const expectedAddress = '500 Terry Francois Street';
const expectedPhone = 'Tel: 123-456-7890';
const expectedEmail = 'info@mysite.com';
const expectedImageSrc = 'https://static.wixstatic.com/media/9c608a_b94d7bcdc9574085a2aa95f62a4c49e6.jpg';

Given('the {string} page is opened', (page) => {
    if (page === "home") {
        cy.visit(baseUrl);
    } else {
        cy.visit(`https://ancabota09.wixsite.com/intern/${page}`);
    }
});

When('the page is loaded', () => {
  cy.wait(1000);
});

Given('the address is displayed', () => {
  cy.get(NavBar.address).should('be.visible');
});

Then('the address is displayed and correct', () => {
  cy.get(NavBar.address)
    .should('be.visible')
    .contains(expectedAddress);
});

Given('the phone number is displayed', () => {
  cy.get(NavBar.contactInfo).should('be.visible');
});

Then('the phone number is displayed and correct', () => {
  cy.get(NavBar.contactInfo)
    .should('be.visible')
    .contains(expectedPhone);
});

Then('the payment options are displayed and correct', () => {
  cy.get(NavBar.paymentOptions)
    .should('be.visible');

  cy.get(NavBar.paymentOptionsImg)
    .should('be.visible')
    .and('have.attr', 'src')
    .and('include', expectedImageSrc);
});

Then('the email address is displayed and correct', () => {
  cy.get(NavBar.emailAddress)
    .should('be.visible')
    .contains(expectedEmail);
});

Given('the Facebook icon is displayed on the page', () => {
    cy.get(NavBar.facebook).should('be.visible'); 
});

Then('the Facebook icon has the correct URL', () => {
    const expectedUrl = 'http://www.facebook.com/wix';
    cy.get(NavBar.facebook).should('have.attr', 'href', expectedUrl);
});

Given('the Twitter icon is displayed on the page', () => {
    cy.get(NavBar.twitter).should('be.visible');
});

Then('the Twitter icon has the correct URL', () => {
    const expectedUrl = 'http://www.twitter.com/wix'; 
    cy.get(NavBar.twitter).should('have.attr', 'href', expectedUrl);
});

Given('the Pinterest icon is displayed on the page', () => {
    cy.get(NavBar.pinterest).should('be.visible'); 
});

Then('the Pinterest icon has the correct URL', () => {
    const expectedUrl = 'http://pinterest.com/wixcom/'; 
    cy.get(NavBar.pinterest).should('have.attr', 'href', expectedUrl);
});