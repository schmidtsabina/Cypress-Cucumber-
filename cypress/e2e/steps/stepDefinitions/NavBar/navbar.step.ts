import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { NavBar, baseUrl } from "../../pages/Homepage";

Given('the {string} page is opened', (page) => {
  if (page === "home") {
      cy.visit(baseUrl);
  } else {
      cy.visit(`https://ancabota09.wixsite.com/intern/${page}`);
  }
  cy.wait(3000)
});
//book now button
Given('the "Book Now" button is displayed', () => {

  cy.get(NavBar.booknowButton).should('be.visible'); 
});

When('the user clicks the "Book Now" button', () => {
  cy.get(NavBar.booknowButton).click(); 
});

Then('the "Book Now" page is displayed', () => {
  cy.url().should('include', 'booknow'); 
});

//explore button
Given('the "Explore" button is displayed', () => {

  cy.get(NavBar.exploreButton).should('be.visible'); 
});

When('the user clicks the "Explore" button', () => {
  cy.get(NavBar.exploreButton).click(); 
});

Then('the "Explore" page is displayed', () => {
  cy.url().should('include', 'explore'); 
});

//rooms button
Given('the "Rooms" button is displayed', () => {

  cy.get(NavBar.roomsButton).should('be.visible'); 
});

When('the user clicks the "Rooms" button', () => {
  cy.get(NavBar.roomsButton).click(); 
});

Then('the "Rooms" page is displayed', () => {
  cy.url().should('include', 'rooms'); 
});

//contact button
Given('the "Contact" button is displayed', () => {

  cy.get(NavBar.contactButton).should('be.visible'); 
});

When('the user clicks the "Contact" button', () => {
  cy.get(NavBar.contactButton).click(); 
});

Then('the "Contact" page is displayed', () => {
  cy.url().should('include', 'contact'); 
});