
export const homepage = {
  exploreButton: () => cy.get("#i6kl732v1label"),
  clickOnExploreButton: () => homepage.exploreButton().should("be.visible").click(),
  
  roomsButton: () => cy.get("#i6kl732v2label"),
  clickOnRoomsButton: () => homepage.roomsButton().should("be.visible").click(),
  
  contactButton: () => cy.get("#i6kl732v3label"),
  clickOnContactButton: () => homepage.contactButton().should("be.visible").click(),
  
  booknowButton: () => cy.get('.wixui-button__label'),
  clickOnBookNowButton: () => homepage.booknowButton().should("be.visible").click(),
  
  facebookButton: () => cy.get('#i0odz-i6rlbitx > a'),
  checkFacebookLink: () => homepage.facebookButton().should("have.attr", "href", 'http://www.facebook.com/wix'),
  
  twitterButton: () => cy.get('#i220sc-i6rlbitx > a'),
  checkTwitterLink: () => homepage.twitterButton().should("have.attr", "href", 'http://www.twitter.com/wix'),
  
  pinterestButton: () => cy.get('#i3175p-i6rlbitx > a'),
  checkPinterestLink: () => homepage.pinterestButton().should("have.attr", "href", 'http://pinterest.com/wixcom/'),
  
  mailtoButton: () => cy.get('#i71ww6nk > p > a'),
  checkMailtoLink: () => homepage.mailtoButton().should("have.attr", "href", 'mailto:info@mysite.com'),

  adultsButtonIncrement: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults .up'),
  adultsButtonDecrement: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults .down'),
  adultsValue: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults .value'),
  verifyAdultsDecrementDisabled: () => {
    homepage.adultsButtonDecrement().should('have.attr', 'disabled');
  },

  kidsButtonIncrement: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.up'),
  kidsButtonDecrement: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.down'),
  kidsValue: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children'),

  checkInButton: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in'),
  clickOnCheckInButton: () => homepage.checkInButton().should('exist').click(),

  checkInValue: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value'),
  verifyCheckInValue: (expectedDate: string) => {
    homepage.checkInValue().should('have.text', expectedDate);
  },
  checkOutButton: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out'),
  clickOnCheckOutButton: () => homepage.checkInButton().should('exist').click(),

  checkOutValue: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out-value'),
  verifyCheckOutValue: (expectedDate: string) => {
    homepage.checkOutValue().should('have.text', expectedDate);
  },

  searchButton: () => cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget > form > ul > li.search > button'),
  clickOnSearchButton: () => homepage.searchButton().should('exist').click()
};
  
  export const explorePage = {
    // Element selectors
    elements: {
      exploreHotelTitle: () => cy.get('#i6ksjvsy'),
      paragraph: () => cy.get('#i6kvh3dl'),
      chinatown: () => cy.get('#i6kv3ge8 > p.font_7.wixui-rich-text__text'),
      haightAshbury: () => cy.get('#i6kvbhmb > p.font_7.wixui-rich-text__text'),
      goldenGate: () => cy.get('#i6kvbkw0 > p.font_7.wixui-rich-text__text'),
      chinatownImage: () => cy.get('#img_i6kv4ak9 img'),
      haightAshburyImage: () => cy.get('#img_i6kvbhmc img'),
      goldenGateImage: () => cy.get('#img_i6kvbkw0_0 img'),
    },
  
    verifyTitle: (expectedTitle: string) => {
      explorePage.elements.exploreHotelTitle()
        .should('be.visible')
        .invoke('text')
        .then((title) => {
          expect(title.trim()).to.equal(expectedTitle);
        });
    },
  
    verifyParagraphContains: (expectedContent: string) => {
      explorePage.elements.paragraph()
        .should('be.visible')
        .invoke('text')
        .then((paragraph) => {
          const normalizedParagraph = paragraph.replace(/\s+/g, ' ').trim();
          expect(normalizedParagraph).to.include(expectedContent);
        });
    },
  
    verifyText: (element: () => Cypress.Chainable<JQuery>, expectedText: string) => {
      element()
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal(expectedText);
        });
    },
  
    verifyImageSrc: (element: () => Cypress.Chainable<JQuery>, expectedSrc: string) => {
      element()
        .should('be.visible')
        .and(($img) => {
          const src = $img.attr('src');
          expect(src).to.include(expectedSrc);
        });
    },
  }
  export const roomsPage = {
    cottageRoom: () => cy.get("#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.info > div.bottom > button > span"),
  
    adultsButtonIncrement: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#adults .up'),
    adultsButtonDecrement: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#adults .down'),
    adultsValue: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#adults .value'),
    verifyAdultsDecrementDisabled: () => roomsPage.adultsButtonDecrement().should('have.attr', 'disabled'),
  
    kidsButtonIncrement: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#children > a.up'),
    kidsButtonDecrement: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#children > a.down'),
    kidsValue: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#children'),
  
    checkInButton: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#check-in'),
    clickOnCheckInButton: () => roomsPage.checkInButton().should('exist').click(),
  
    checkInValue: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#check-in > div.calendar-button.s-separator.s-field > span'),
    verifyCheckInValue: (expectedDate: string) => roomsPage.checkInValue().should('have.text', expectedDate),
  
    checkOutButton: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#check-out'),
    clickOnCheckOutButton: () => roomsPage.checkOutButton().should('exist').click(),
  
    checkOutValue: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#check-out > div.calendar-button.s-separator.s-field > span'),
    verifyCheckOutValue: (expectedDate: string) => roomsPage.checkOutValue().should('have.text', expectedDate),
  
    searchButton: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)'),
    clickOnSearchButton: () => roomsPage.searchButton().should('exist').click(),
  
    roomsList: () => cy.get('iframe.nKphmK[title="Book a Room"]').its('0.contentDocument').find('#content .room.s-separator'),
    roomsDisplayed: (expectedNumber: number) => roomsPage.roomsList().should('have.length.at.least', expectedNumber)
  };
  

  export const contactPage = {
    nameField: () => cy.get("#input_comp-jxbsa1e9"),
    emailField: () => cy.get("#input_comp-jxbsa1em"),
    phoneField: () => cy.get("#input_comp-jxbsa1ev"),
    commentField: () => cy.get("#textarea_comp-jxbsa1f7"),
    submitField: () => cy.get("#comp-jxbsa1fi > button"),
    confirmationMessage:()=> cy.get("#comp-jxbsa1fv > p > span"),
    paragraphElement:()=>cy.get("#i6ly3ckc_0"),
  }
  