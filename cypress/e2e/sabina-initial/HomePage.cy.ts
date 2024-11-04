
import { homepage } from "../../ui-manager/sabina/pages/pages";
import {selectDateInIframe} from "../../ui-manager/sabina/helpers/functions"


describe("Test HomePage", () => {

  beforeEach(() => {
    cy.visit("/")
    cy.wait(3000)
  })
  it("Test Explore Button", () => {
    homepage.clickOnExploreButton();
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/explore");
  });

  it("Test Rooms Button", () => {
    homepage.clickOnRoomsButton();
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/rooms");
  });

  it("Test Contact Button", () => {
    homepage.clickOnContactButton();
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/contact");
  });

  it("Test Book Now Button", () => {
    homepage.clickOnBookNowButton();
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/booknow");
  });

  it("Test Facebook Button URL", () => {
    homepage.checkFacebookLink();
  });

  it("Test Twitter Button URL", () => {
    homepage.checkTwitterLink();
  });

  it("Test Pinterest Button URL", () => {
    homepage.checkPinterestLink();
  });

  it("Test Mail To Button", () => {
    homepage.checkMailtoLink();
  });

  it("Adults Button increment and decrement", () => {
    const clicks = Math.floor(Math.random() * 10);

    for (let i = 0; i <= clicks; i++) {
      homepage.adultsButtonIncrement().click();
    }

    homepage.adultsValue().invoke('text').then((finalValue) => {
      const finalAdults = parseInt(finalValue, 10);
      expect(finalAdults).to.equal(clicks + 1);
    });

    for (let i = 0; i <= clicks; i++) {
      homepage.adultsButtonDecrement().click();
    }

    homepage.adultsValue().invoke('text').then((decrementedValue) => {
      const finalAdultsAfterDecrement = parseInt(decrementedValue, 10);
      expect(finalAdultsAfterDecrement).to.equal(1);
    });
  });

  it("Kids Button increment and decrement", () => {
    const clicks = Math.floor(Math.random() * 10);

    for (let i = 0; i <= clicks; i++) {
      homepage.kidsButtonIncrement().click();
    }

    homepage.kidsValue().invoke('text').then((finalValue) => {
      const finalKids = parseInt(finalValue, 10);
      expect(finalKids).to.equal(clicks);
    });

    for (let i = 0; i <= clicks; i++) {
      homepage.kidsButtonDecrement().click();
    }

    homepage.kidsValue().invoke('text').then((decrementedValue) => {
      const finalKidsAfterDecrement = parseInt(decrementedValue, 10);
      expect(finalKidsAfterDecrement).to.equal(0);
    });
  });

  it('Adults Button decrement from 1', () => {
    homepage.verifyAdultsDecrementDisabled();
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

  it.only('Search with adults and kids', () => {
    
    const todayDate = new Date(); 
    const checkoutDate = new Date(todayDate); 
    checkoutDate.setDate(todayDate.getDate() + 3); 
    homepage.clickOnCheckInButton();
    selectDateInIframe(todayDate);
    const formattedCheckinDate = formatDateForSearch(todayDate);
    homepage.verifyCheckInValue(formattedCheckinDate);
    homepage.clickOnCheckOutButton();
    selectDateInIframe(checkoutDate);
    const formattedCheckoutDate = formatDateForSearch(checkoutDate);
    homepage.verifyCheckOutValue(formattedCheckoutDate);
    homepage.adultsButtonIncrement().click();
    homepage.kidsButtonIncrement().click();
    homepage.clickOnSearchButton();
    cy.url().should('include', 'https://ancabota09.wixsite.com/intern/rooms');
  });
});

/*
describe("Test HomePage", () => {

  beforeEach(() => {
    cy.visit("/")
  })


  it("Test Explore Button", () => {
    homepage.exploreButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/explore")
  })

  it("Test Rooms Button",()=>{
    homepage.clickOnRoomsButton()
    cy.url().should("eq","https://ancabota09.wixsite.com/intern/rooms")
  })

  it("Test Contact Button",()=>{
    homepage.contactButton().should("be.visible").click()
    cy.url().should("eq","https://ancabota09.wixsite.com/intern/contact")
  })

  it("Test Book Now Button",()=>{
    homepage.booknowButton().should("be.visible").click()
    cy.url().should("eq","https://ancabota09.wixsite.com/intern/booknow")
  })

  it("Test Facebook Button URL", () => {
    homepage.facebookButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'http://www.facebook.com/wix');
  });

  it("Test Twitter Button URL", () => {
    homepage.twitterButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'http://www.twitter.com/wix');
  });

  it("Test Pinterest Button URL", () => {
    homepage.pinterestButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'http://pinterest.com/wixcom/');
  });

  it("Test Mail To Button", () => {
    homepage.mailtoButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'mailto:info@mysite.com');
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

it('Check-In and Check-Out for 3 days-calendar', () => {
 
  const todayDate = new Date(); 
  const checkoutDate = new Date(todayDate); 
  checkoutDate.setDate(todayDate.getDate() + 3); 

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-in')
    .should('exist')
    .click();

  selectDateInIframe(todayDate);

  const formattedCheckinDate = formatDateForSearch(todayDate);
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-in-value') 
    .should('have.text', formattedCheckinDate);

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-out') 
    .should('exist')
    .click();

  selectDateInIframe(checkoutDate);

  const formattedCheckoutDate = formatDateForSearch(checkoutDate);
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-out-value') 
    .should('have.text', formattedCheckoutDate);
   
});

it('Adults Button increment and decrement', () => {
  const clicks=Math.floor(Math.random() * 10);
  cy.log(`Random number of clicks: ${clicks}`);
  for(let i=0;i<= clicks;i++){
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
     .its('0.contentDocument')
     .find('#adults .up')
     .should('be.visible')
     .click()
  }
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
   .its('0.contentDocument')
   .find('#adults .value')
   .invoke('text')
   .then((finalValue) => {
    const finalAdults = parseInt(finalValue, 10); 
    expect(finalAdults).to.equal(clicks+1);
  });

  for (let i = 0; i <= clicks; i++) {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#adults .down')
      .should('be.visible')
      .click();
  }

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#adults .value')
    .invoke('text')
    .then((decrementedValue) => {
      const finalAdultsAfterDecrement = parseInt(decrementedValue, 10);
      expect(finalAdultsAfterDecrement).to.equal(1); 
    });
});

it('Adults Button decrement from 1', () => {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
     .its('0.contentDocument')
     .find('#adults > a.down')
     .should('have.attr', 'disabled')
  
});

it('Kids Button increment and decrement', () => {
  const clicks=Math.floor(Math.random() * 10);
  for(let i=0;i<=clicks;i++){
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
     .its('0.contentDocument')
     .find('#children > a.up')
     .should('be.visible')
     .click()
  }
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
   .its('0.contentDocument')
   .find('#children')
   .invoke('text')
   .then((finalValue) => {
    const finalKids = parseInt(finalValue, 10); 
    expect(finalKids).to.equal(clicks);
  });

  for (let i = 0; i <= clicks; i++) {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
      .its('0.contentDocument')
      .find('#children > a.down') 
      .should('be.visible')
      .click();
  }

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#children')
    .invoke('text')
    .then((decrementedValue) => {
      const finalKidsAfterDecrement = parseInt(decrementedValue, 10);
      expect(finalKidsAfterDecrement).to.equal(0); 
    });
});

it.only('Search with adults and kids', () => {

  const todayDate = new Date(); 
  const checkoutDate = new Date(todayDate); 
  checkoutDate.setDate(todayDate.getDate() + 3); 

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-in')
    .should('exist')
    .click();

  selectDateInIframe(todayDate);

  const formattedCheckinDate = formatDateForSearch(todayDate);
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-in-value') 
    .should('have.text', formattedCheckinDate);

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-out') 
    .should('exist')
    .click();

  selectDateInIframe(checkoutDate);

  const formattedCheckoutDate = formatDateForSearch(checkoutDate);
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget #check-out-value') 
    .should('have.text', formattedCheckoutDate);
    
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
       .its('0.contentDocument')
       .find('#adults .up')
       .should('be.visible')
       .click()
  
  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#children > a.up')
    .should('be.visible')
    .click()

  cy.get('iframe.nKphmK[title="Wix Hotels"]')
    .its('0.contentDocument')
    .find('#search-widget > form > ul > li.search > button')
    .click()

  cy.url().should('include', 'https://ancabota09.wixsite.com/intern/rooms');
   
});
});
*/
