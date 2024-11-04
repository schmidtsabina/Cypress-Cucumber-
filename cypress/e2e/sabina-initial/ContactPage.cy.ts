import { contactPage } from "../../ui-manager/sabina/pages/pages";

describe("Test Contact Page", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.contains("CONTACT").first().click();
    cy.url().should('eq', 'https://ancabota09.wixsite.com/intern/contact');
  });

  it('Test Paragraph', () => {
    const expectedText = `If you have any questions, please contact us by telephone or email and we'll get back to you as soon as possible.\nWe look forward to hearing from you.`;

    contactPage.paragraphElement()
      .should('be.visible')
      .invoke('text')
      .then(actualText => {
        const normalizedActualText = actualText.replace(/\s+/g, ' ').trim();
        const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim();
        expect(normalizedActualText).to.equal(normalizedExpectedText);
      });
  });

  it('Test Form with Valid Data', () => {
    contactPage.nameField().should('be.visible').clear().type("Sabina");
    contactPage.emailField().should('be.visible').clear().type("mail@corect.com");
    contactPage.phoneField().should('be.visible').clear().type("0777777777");
    contactPage.commentField().should('be.visible').clear().type("Test");

    contactPage.nameField().should('have.value', 'Sabina');
    contactPage.emailField().should('have.value', 'mail@corect.com');
    contactPage.phoneField().should('have.value', '0777777777');
    contactPage.commentField().should('have.value', 'Test');

    contactPage.submitField().should('be.visible').click();
    contactPage.confirmationMessage().should('be.visible').and('contain.text', 'Thanks for submitting!');
  });

  it('Test Form Name Field required', () => {
    contactPage.nameField().should('be.visible');
    contactPage.submitField().should('be.visible').click();
    contactPage.nameField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('Test Form Email Field required', () => {
    contactPage.nameField().should('be.visible').clear().type("Sabina");
    contactPage.emailField().should('be.visible');
    contactPage.submitField().should('be.visible').click();
    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('Test Invalid Email', () => {
    contactPage.nameField().should('be.visible').clear().type("Sabina");
    contactPage.emailField().should('be.visible').clear().type("mailgresit");
    contactPage.submitField().should('be.visible').click();
    
    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.");

    contactPage.emailField().clear().type("mailgresit@");
    contactPage.submitField().click();
    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "Please enter a part following '@'.");

    contactPage.emailField().clear().type("mailgresit@greseala@");
    contactPage.submitField().click();
    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "A part following '@' should not contain the symbol '@'.");
  });

  it('Test Form Message Field required', () => {
    contactPage.nameField().should('be.visible').clear().type("Sabina");
    contactPage.emailField().should('be.visible').clear().type("mail@corect.com");
    contactPage.phoneField().should('be.visible').clear().type("0777777777");

    contactPage.submitField().click();
    contactPage.commentField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('Map Fullscreen', () => {
    cy.get('iframe[title="Google Maps"]').should('have.attr', 'allowfullscreen');
    cy.get('iframe[title="Google Maps"]').its('0.contentDocument')
      .find('#map_canvas > div > div.gm-style > div:nth-child(8) > button')
      .should('exist')
      .click()
      .should('have.attr', 'aria-pressed', 'true');
  });
});


