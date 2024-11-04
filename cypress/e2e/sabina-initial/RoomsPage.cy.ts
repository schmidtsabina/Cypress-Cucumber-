import { roomsPage } from "../../ui-manager/sabina/pages/pages";
import {CheckInRooms} from "../../ui-manager/sabina/helpers/functions"
import {CheckOutRooms} from "../../ui-manager/sabina/helpers/functions"

describe("Test Rooms page", () => {

    beforeEach(() => {
      cy.visit("/");
      cy.contains("ROOMS").first().click();
      cy.url().should('eq', 'https://ancabota09.wixsite.com/intern/rooms');
      cy.wait(5000)
    });

    const selectors = [
      {
          description: 'image',
          selector: '#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.image > img'
      },
      {
          description: 'title',
          selector: '#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.description > h3 > a'
      },
      {
          description: 'More Info button',
          selector: '#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.bottom > button'
      }
  ];

  const expectedUrl = 'https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4';

  selectors.forEach(({ description, selector }) => {
      it(`Test Standard Suite ${description}`, () => {
          cy.get('iframe.nKphmK[title="Book a Room"]')
              .its('0.contentDocument')
              .find(selector)
              .click();
          cy.url().should('eq', expectedUrl);
      });
  });
/*
    it('Test Standard Suite image', () => {
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.image > img')
          .click()
        cy.url().should('eq','https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4')
    });
   
    it('Test Standard Suite title', () => {
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.description > h3 > a')
          .click()
        cy.url().should('eq','https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4')
    });

    
    it('Test Standard Suite More Info Button', () => {
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.bottom > button')
          .click()
        cy.url().should('eq','https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4')
    });
*/
    it('Test Amenities', () => {
      const amenities = ['A/C', 'TV', 'Shower', 'Telephone', 'Bath'];
    
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then((body) => {
          amenities.forEach((amenity, index) => {
            cy.get(body)
              .find(`#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(${index + 1}) > div`)
              .should('have.attr', 'tooltip', amenity);
          });
    });
      /*
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(1) > div')
          .should('have.attr', 'tooltip', 'A/C');

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(2) > div')
          .should('have.attr', 'tooltip', 'TV');

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(3) > div')
          .should('have.attr', 'tooltip', 'Shower');

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(4) > div')
          .should('have.attr', 'tooltip', 'Telephone');

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > ul > li:nth-child(5) > div')
          .should('have.attr', 'tooltip', 'Bath');
        */  
    });
    it("Adults Button increment and decrement", () => {
      const clicks = Math.floor(Math.random() * 10);
    
      for (let i = 0; i < clicks; i++) {
        roomsPage.adultsButtonIncrement().click();
      }
    
      roomsPage.adultsValue().invoke('text').then((finalValue) => {
        const finalAdults = parseInt(finalValue, 10);
        expect(finalAdults).to.equal(clicks + 1);
      });
    
      for (let i = 0; i < clicks; i++) {
        roomsPage.adultsButtonDecrement().click();
      }
    
      roomsPage.adultsValue().invoke('text').then((decrementedValue) => {
        const finalAdultsAfterDecrement = parseInt(decrementedValue, 10);
        expect(finalAdultsAfterDecrement).to.equal(1);
      });
    });
    
    it("Kids Button increment and decrement", () => {
      const clicks = Math.floor(Math.random() * 10);
    
      for (let i = 0; i <= clicks; i++) {
        roomsPage.kidsButtonIncrement().click();
      }
    
      roomsPage.kidsValue().invoke('text').then((finalValue) => {
        const finalKids = parseInt(finalValue, 10);
        expect(finalKids).to.equal(clicks);
      });
    
      for (let i = 0; i <= clicks; i++) {
        roomsPage.kidsButtonDecrement().click();
      }
    
      roomsPage.kidsValue().invoke('text').then((decrementedValue) => {
        const finalKidsAfterDecrement = parseInt(decrementedValue, 10);
        expect(finalKidsAfterDecrement).to.equal(0);
      });
    });
    
    it('Adults Button decrement from 1', () => {
      roomsPage.verifyAdultsDecrementDisabled();
    });
    
    const formatDateForSearch = (date: Date): string => {
      const day = date.getDate();
      const year = date.getFullYear();
    
      const monthMap = {
        0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
      };
    
      const month = monthMap[date.getMonth()];
    
      return `${day} ${month} ${year}`;
    };
    
    it.only('Search with 2 adults', () => {
      const todayDate = new Date(); 
      const checkoutDate = new Date(todayDate); 
      checkoutDate.setDate(todayDate.getDate() + 3); 
      roomsPage.clickOnCheckInButton();
      CheckInRooms(todayDate);
      const formattedCheckinDate = formatDateForSearch(todayDate);
      roomsPage.verifyCheckInValue(formattedCheckinDate);
      //roomsPage.clickOnCheckOutButton();
      CheckOutRooms(checkoutDate);
      const formattedCheckoutDate = formatDateForSearch(checkoutDate);
      roomsPage.verifyCheckOutValue(formattedCheckoutDate);
      roomsPage.adultsButtonIncrement().click();
      //roomsPage.kidsButtonIncrement().click();
      roomsPage.clickOnSearchButton();
      roomsPage.roomsDisplayed(1);
    });

    it.only('Search with 1 kid', () => {
      const todayDate = new Date(); 
      const checkoutDate = new Date(todayDate); 
      checkoutDate.setDate(todayDate.getDate() + 3); 
      roomsPage.clickOnCheckInButton();
      CheckInRooms(todayDate);
      const formattedCheckinDate = formatDateForSearch(todayDate);
      roomsPage.verifyCheckInValue(formattedCheckinDate);
      //roomsPage.clickOnCheckOutButton();
      CheckOutRooms(checkoutDate);
      const formattedCheckoutDate = formatDateForSearch(checkoutDate);
      roomsPage.verifyCheckOutValue(formattedCheckoutDate);
      //roomsPage.adultsButtonIncrement().click();
      roomsPage.kidsButtonIncrement().click();
      roomsPage.clickOnSearchButton();
      roomsPage.roomsDisplayed(3);
    });

    it.only('Search with more than 6 adults', () => {
      const todayDate = new Date(); 
      const checkoutDate = new Date(todayDate); 
      checkoutDate.setDate(todayDate.getDate() + 3); 
      roomsPage.clickOnCheckInButton();
      CheckInRooms(todayDate);
      const formattedCheckinDate = formatDateForSearch(todayDate);
      roomsPage.verifyCheckInValue(formattedCheckinDate);
      //roomsPage.clickOnCheckOutButton();
      CheckOutRooms(checkoutDate);
      const formattedCheckoutDate = formatDateForSearch(checkoutDate);
      roomsPage.verifyCheckOutValue(formattedCheckoutDate);
      for(let i=0;i<=6;i++){
        roomsPage.adultsButtonIncrement().click();
      }
      //roomsPage.kidsButtonIncrement().click();
      roomsPage.clickOnSearchButton();
      roomsPage.roomsDisplayed(0);
    });
    

     /*
    it('Test Adults button decrement from 1', () => {
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#adults > a.down')
        .should('have.attr', 'disabled')
  });

  it.only('Adults Button increment and decrement', () => {
    const clicks=Math.floor(Math.random() * 10);
    for(let i=0;i<=clicks;i++){
      cy.get('iframe.nKphmK[title="Book a Room"]')
       .its('0.contentDocument')
       .find('#adults .up')
       .should('be.visible')
       .click()
    }
    cy.get('iframe.nKphmK[title="Book a Room"]')
     .its('0.contentDocument')
     .find('#adults .value')
     .invoke('text')
     .then((finalValue) => {
      const finalAdults = parseInt(finalValue, 10); 
      expect(finalAdults).to.equal(clicks+ 1);
    });
  
    for (let i = 0; i <= clicks; i++) {
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#adults .down')
        .should('be.visible')
        .click();
    }
  
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#adults .value')
      .invoke('text')
      .then((decrementedValue) => {
        const finalAdultsAfterDecrement = parseInt(decrementedValue, 10);
        expect(finalAdultsAfterDecrement).to.equal(1); 
      });
  });

  
it('Kids Button increment and decrement', () => {
  const clicks=Math.floor(Math.random() * 10);
  for(let i=0;i<=clicks;i++){
    cy.get('iframe.nKphmK[title="Book a Room"]')
     .its('0.contentDocument')
     .find('#children > a.up')
     .should('be.visible')
     .click()
  }
  cy.get('iframe.nKphmK[title="Book a Room"]')
   .its('0.contentDocument')
   .find('#children')
   .invoke('text')
   .then((finalValue) => {
    const finalKids = parseInt(finalValue, 10); 
    expect(finalKids).to.equal(clicks);
  });

  for (let i = 0; i <= clicks; i++) {
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#children > a.down') 
      .should('be.visible')
      .click();
  }

  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find('#children')
    .invoke('text')
    .then((decrementedValue) => {
      const finalKidsAfterDecrement = parseInt(decrementedValue, 10);
      expect(finalKidsAfterDecrement).to.equal(0); 
    });
});
    it('Test Search with kids', () => {
        const todayDate = new Date(); 
        const checkoutDate = new Date(todayDate); 
        checkoutDate.setDate(todayDate.getDate() + 3); 

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#check-in')
          .click()
        //#hotel-container > section > div > div > form > ul > li.check-in > div.calendar-popup.s-field.s-separator.visible
        cy.get('iframe.nKphmK[title="Book a Room"]')
         .its('0.contentDocument')
         .find('#hotel-container > section > div > div > form > ul > li.check-in > div.calendar-popup.s-field.s-separator.visible')
         .should('be.visible')

        CheckInRooms(todayDate);

        const formattedCheckinDate = formatDateForSearch(todayDate);
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#check-in > div.calendar-button.s-separator.s-field > span')
          .should('have.text', formattedCheckinDate);

        CheckOutRooms(checkoutDate);

        const formattedCheckoutDate = formatDateForSearch(checkoutDate);
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#check-out > div.calendar-button.s-separator.s-field > span')
          .should('have.text', formattedCheckoutDate);

        //cy.get('iframe.nKphmK[title="Book a Room"]')
        //  .its('0.contentDocument')
        //  .find('#adults > a.up')
        //  .click()

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#children > a.up')
          .click()

        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
          .click()
          
        cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#content .room.s-separator')
          .should('have.length.at.least', 3); 
    });

    it.only('Test Search with 2 adults', () => {
      const todayDate = new Date(); 
      const checkoutDate = new Date(todayDate); 
      checkoutDate.setDate(todayDate.getDate() + 3); 

      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#check-in')
        .click()

      CheckInRooms(todayDate);

      const formattedCheckinDate = formatDateForSearch(todayDate);
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#check-in > div.calendar-button.s-separator.s-field > span')
        .should('have.text', formattedCheckinDate);

      CheckOutRooms(checkoutDate);

      const formattedCheckoutDate = formatDateForSearch(checkoutDate);
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#check-out > div.calendar-button.s-separator.s-field > span')
        .should('have.text', formattedCheckoutDate);

      //cy.get('iframe.nKphmK[title="Book a Room"]')
      //  .its('0.contentDocument')
      //  .find('#adults > a.up')
      //  .click()

      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#adults > a.up')
        .click()

      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .click()
        
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#content .room.s-separator')
        .should('have.length.at.least', 3); 
  });

  it('Test Search with more than 6 adults', () => {
    const todayDate = new Date(); 
    const checkoutDate = new Date(todayDate); 
    checkoutDate.setDate(todayDate.getDate() + 3); 

    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#check-in')
      .click()

    CheckInRooms(todayDate);

    const formattedCheckinDate = formatDateForSearch(todayDate);
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#check-in > div.calendar-button.s-separator.s-field > span')
      .should('have.text', formattedCheckinDate);

    CheckOutRooms(checkoutDate);

    const formattedCheckoutDate = formatDateForSearch(checkoutDate);
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#check-out > div.calendar-button.s-separator.s-field > span')
      .should('have.text', formattedCheckoutDate);

    for(let i=0;i<=6;i++){
      cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#adults > a.up')
        .click()
    }
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
      .click()
      
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#content .room.s-separator')
      .should('have.length.at.least', 0); 
  });
 */
});