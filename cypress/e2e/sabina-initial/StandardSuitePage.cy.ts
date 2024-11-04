//import { StandardSuitePage } from "../../ui-manager/sabina/pages/pages";
import {CheckInRooms} from "../../ui-manager/sabina/helpers/functions"
import {CheckOutRooms} from "../../ui-manager/sabina/helpers/functions"
describe("Test Standard SuitePage", () => {

  beforeEach(() => {
    cy.visit("https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4");
    cy.contains("ROOMS").first().click();
    cy.url().should('eq', 'https://ancabota09.wixsite.com/intern/rooms');
    cy.wait(3000)
    cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find("#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.image").first().click();
    cy.url().should('eq', 'https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4');
    
  });

  it('Test Room Details', () => {
    cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').as('chatIframe')
    //image
    cy.get('@chatIframe')
      .find('#singleroom > div.singleroom.clearfix > div:nth-child(2) > div > div.preview-container > div > img')
      .should('have.attr', 'src')
      .should('include', 'cb4dcccb4258499a894623f5282baa98.png');

    //properties
    cy.get('@chatIframe')
      .find('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.properties.s-separator.clearfix > div > ul > li.accomodates')
      .should('be.visible')

    cy.get('@chatIframe')
      .find('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.properties.s-separator.clearfix > div > ul > li.size')
      .should('be.visible')

    cy.get('@chatIframe')
      .find('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.properties.s-separator.clearfix > div > ul > li.beds')
      .should('be.visible')

    //amenities 
    cy.get('@chatIframe')
      .find('.content-block.amenities.s-separator.clearfix')
      .should('be.visible')
      .within(() => {
        cy.contains('A/C').should('exist');
        cy.contains('TV').should('exist');
        cy.contains('Shower').should('exist');
        cy.contains('Telephone').should('exist');
        cy.contains('Bath').should('exist');
  });

   //check in and check out 
   cy.get('@chatIframe')
     .find('.content-block.s-separator.terms.clearfix')
     .should('be.visible')
     .within(() => {
        cy.contains('Check-In').should('exist');
        cy.contains('02:00 PM').should('exist');
        cy.contains('Check-Out').should('exist');
        cy.contains('12:00 PM').should('exist');
  });
  //Read our policies 
   cy.get('@chatIframe')
    .find('a.policies')
    .should('have.attr', 'href')
    .and('include', 'https://hotels.wixapps.net/index.html');

    
  });

});