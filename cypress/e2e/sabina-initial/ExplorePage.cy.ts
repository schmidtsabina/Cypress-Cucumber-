import { explorePage } from "../../ui-manager/sabina/pages/pages";

describe("Test Explore Page", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.contains("EXPLORE").first().click();
    cy.url().should('eq', 'https://ancabota09.wixsite.com/intern/explore');
  });

  it('Test Title & Paragraph', () => {
    const expectedTitle = 'EXPLORE THE HOTEL';
    
    explorePage.verifyTitle(expectedTitle);
    
    explorePage.verifyParagraphContains(expectedTitle);
  });

  it('Test Explore the City', () => {
    explorePage.verifyText(explorePage.elements.chinatown, 'Chinatown');
    explorePage.verifyText(explorePage.elements.haightAshbury, 'Haight & Ashbury');
    explorePage.verifyText(explorePage.elements.goldenGate, 'Golden Gate Bridge');
    
    explorePage.verifyImageSrc(explorePage.elements.chinatownImage, "9c608a_14eb60e42d3a42f29fe67d9b579e26de.jpg");
    explorePage.verifyImageSrc(explorePage.elements.haightAshburyImage, "9c608a_569e962c58334d07a4048e125af8fb82.jpg");
    explorePage.verifyImageSrc(explorePage.elements.goldenGateImage, "9c608a_66f0495affeb412ba01b0d9f0bd3dd6b.jpg");
  });
  
/*
  it('Test Title & Paragraph', () => {
    explorePage.explorehoteltitle() 
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).to.equal('EXPLORE THE HOTEL');

        explorePage.paragraph() 
          .should('be.visible')
          .invoke('text')
          .then((paragraph) => {
            const normalizedParagraph = paragraph.replace(/\s+/g, ' ').trim();
            expect(normalizedParagraph).to.include(title.trim());
          });
      });
  });

  it.only('Test Explore the City', () => {
    explorePage.chinatown()
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).to.equal('Chinatown');
      });

    explorePage.haightandashbury()
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).to.equal('Haight & Ashbury');
      });

    explorePage.goldengate()
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).to.equal('Golden Gate Bridge');
      });

    explorePage.chinatownImage()
      .should('be.visible')
      .and(($img) => {
        const src = $img.attr('src');
        expect(src).to.include("9c608a_14eb60e42d3a42f29fe67d9b579e26de.jpg");
      });

    explorePage.haightAshburyImage()
      .should('be.visible')
      .and(($img) => {
        const src = $img.attr('src');
        expect(src).to.include("9c608a_569e962c58334d07a4048e125af8fb82.jpg");
      });

    explorePage.goldenGateImage()
      .should('be.visible')
      .and(($img) => {
        const src = $img.attr('src');
        expect(src).to.include("9c608a_66f0495affeb412ba01b0d9f0bd3dd6b.jpg");
      });
  });*/

});