import { formatDateForSearch, formatDateForAriaLabel, selectDateInIframe } from "../../stepDefinitions/common.step";
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { Search, baseUrl } from "../../pages/Search";

Given('the "Check-In" field is displayed', () => {
    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-in')
      .should('be.visible');
});

When('the user clicks on the "Check-In" field', () => {
    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-in')
      .click();
    cy.wait(3000);
});

When('the user selects a valid "Check-In" date from the date picker', () => {
    const today = new Date();
    selectDateInIframe(Search.iframeCheckIn, today);
});

When('the user tries to select a date in the past from the date picker', () => {
    
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() - 2); 
  
    selectDateInIframe(Search.iframeCheckIn, futureDate);
});

Then('the "Check-In" field should display the selected date', () => {
    const today = new Date();
    const formattedDate = formatDateForSearch(today);

    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-in-value')
      .should('have.text', formattedDate);
});

Then('the dates in the past are disabled', () => {

    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    const pastDates = [yesterday, weekAgo, monthAgo];

    pastDates.forEach((date) => {
        const formattedDate = formatDateForAriaLabel(date);
        cy.get(Search.iframeCheckIn)
        .its('0.contentDocument')
        .find(`button[aria-label="${formattedDate}"]`)
        .should('have.class', 'disabled');
    });
});

When('the user selects "Check-In" date a month later', () => {
  const today = new Date();
  const futureDate = new Date(today);

  futureDate.setMonth(today.getMonth() + 1);

if (futureDate.getDate() < today.getDate()) {
    futureDate.setMonth(futureDate.getMonth() + 1);
  }
  cy.get(Search.iframeCheckIn)
      .its('0.contentDocument')
      .find('body > div > main > div > nav > button.navigate-right')
      .click()

  selectDateInIframe(Search.iframeCheckIn, futureDate);
});


// Check-Out Steps
Given('the "Check-Out" field is displayed', () => {
    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-out')
      .should('exist');
});

When('the user clicks on the "Check-Out" field', () => {
    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-out')
      .click();
    cy.wait(3000);
});

When('the user selects a valid "Check-Out" date from the date picker', () => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Set to 3 days later for check-out
    selectDateInIframe(Search.iframeCheckIn, today);
});

When('the user selects "Check-Out" date a month later', () => {
  const today = new Date();
  const futureDate = new Date(today);

  futureDate.setMonth(today.getMonth() + 1);
  futureDate.setDate(today.getDate() + 3);

//if (futureDate.getDate() < today.getDate()) {
    //futureDate.setMonth(futureDate.getMonth() + 1);}
  selectDateInIframe(Search.iframeCheckIn, futureDate);
});

When('the user selects a Check-Out date that is earlier than 3 days after Check-In date', () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); 
    selectDateInIframe(Search.iframeCheckIn, today);
});

Then('the "Check-Out" field should display the selected date', () => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Use the same check-out date for validation
    const formattedDate = formatDateForSearch(today);

    cy.get(Search.iframeSelector)
      .its('0.contentDocument')
      .find('#search-widget #check-out-value')
      .should('have.text', formattedDate);
});

Given('the adults buttons are displayed', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults')
      .should('be.visible');
});

When('the user clicks the adults increment button {int} times', (count) => {
    for (let i = 0; i < count; i++) {
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#adults .up')
          .click();
    }
});

Then('the adults field should display the number {int} of adults selected', (count) => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument')
      .find('#adults .value')
      .should('have.text', (count+1).toString());
});


Given('the adults value is 1', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .value')
      .invoke('text')
      .then((text) => {
        if (text !== '1') {
          cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument')
            .find('#adults .down').click({ multiple: true });
        }
        cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument')
          .find('#adults .value')
          .should('have.text', '1');
      });
  });
  
When('the user clicks the adults decrement button', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .down')
      .click();
  });

When('the user clicks the adults decrement button {int} times', (count) => {
    for (let i = 0; i < count; i++) {
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#adults .down')
          .click();
    }
});


Then('the adults field should still display 1', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .value')
      .should('have.text', '1');
  });

  Given('the adults value is set to {int}', (value) => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .value')
      .invoke('text')
      .then((text) => {
        const currentValue = parseInt(text);
        
        if (currentValue !== value) {
          const buttonSelector = currentValue < value ? '#adults .up' : '#adults .down';
          const clicksNeeded = Math.abs(value - currentValue);
  
          for (let i = 0; i < clicksNeeded; i++) {
            cy.get('iframe.nKphmK[title="Wix Hotels"]')
              .its('0.contentDocument')
              .find(buttonSelector)
              .click();
          }
        }
  
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#adults .value')
          .should('have.text', value.toString());
      });
  });

  Then('the adults field should display {int}', (expectedValue) => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .value')
      .should('have.text', expectedValue.toString());
  });  
  
///
Given('the kids buttons are displayed', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#children')
      .should('be.visible');
});

Given('the kids value is set to {int}', (value) => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#children .value')
      .invoke('text')
      .then((text) => {
        const currentValue = parseInt(text);
        
        if (currentValue !== value) {
          const buttonSelector = currentValue < value ? '#children .up' : '#children .down';
          const clicksNeeded = Math.abs(value - currentValue);
  
          for (let i = 0; i < clicksNeeded; i++) {
            cy.get('iframe.nKphmK[title="Wix Hotels"]')
              .its('0.contentDocument')
              .find(buttonSelector)
              .click();
          }
        }
  
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#children .value')
          .should('have.text', value.toString());
      });
  });

  When('the user clicks the kids increment button {int} times', (count) => {
    for (let i = 0; i < count; i++) {
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#children .up')
          .click();
    }
});

When('the user clicks the kids decrement button {int} times', (count) => {
    for (let i = 0; i < count; i++) {
        cy.get('iframe.nKphmK[title="Wix Hotels"]')
          .its('0.contentDocument')
          .find('#children .down')
          .click();
    }
});

Then('the kids field should display {int}', (expectedValue) => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#children .value')
      .should('have.text', expectedValue.toString());
  });  

  ///
  Given('the search widget is displayed', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget').should('be.visible');
  });
  
  Given('the search button is displayed', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget > form > ul > li.search > button').should('be.visible')
  });
  
  When('the user clicks the search button', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget > form > ul > li.search > button').click()
  });
  
  Then ('the number of rooms equals {int}',(numberRooms)=>{
    cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find('#content .room.s-separator')
    .should('have.length.at.least', numberRooms);
  });