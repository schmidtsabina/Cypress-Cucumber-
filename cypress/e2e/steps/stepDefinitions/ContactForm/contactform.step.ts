import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { contactPage } from "../../pages/ContactForm";

Given("the user is on the contact form page", () => {
    cy.visit("/contact");
  });
  Given("the contact form is displayed", () => {
    cy.get(contactPage.form).should('be.visible')
  });
  Given("the user enters {string} in the name field", (name) => {
    cy.get(contactPage.nameField).clear().type(name);
  });
  
  When("the user enters {string} in the email field", (email) => {
    cy.get(contactPage.emailField).clear().type(email);
  });

  When("the user enters {string} in the message field", (message) => {
    cy.get(contactPage.commentField).clear().type(message);
});
  
  When("the user submits the form", () => {
    cy.get(contactPage.submitField).click();
  });
  
  Then("the email field should display an error message saying {string}", (expectedMessage) => {
    cy.get(contactPage.emailField)
      .invoke("prop", "validationMessage")
      .should("contain", expectedMessage);
  });

  Then("the email field is required", () => {
    cy.get(contactPage.emailField).should("have.attr", "required");
  });
  
  Then("the name field is required", () => {
    cy.get(contactPage.nameField).should("have.attr", "required");
  });
  
  Then("the message field is required", () => {
    cy.get(contactPage.commentField).should("have.attr", "required");
  });

  Then("a success message is displayed saying {string}", (successMessage) => {
    cy.get(contactPage.confirmationMessage) // Adjust selector to match the success message element
      .should('be.visible')
      .and('contain', successMessage);
});

Then("the name field should be empty", () => {
    cy.get(contactPage.nameField).should('have.value', '');
});

Then("the email field should be empty", () => {
    cy.get(contactPage.emailField).should('have.value', '');
});

Then("the message field should be empty", () => {
    cy.get(contactPage.commentField).should('have.value', '');
  });