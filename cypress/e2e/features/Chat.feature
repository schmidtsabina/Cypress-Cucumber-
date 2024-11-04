@focus
Feature: Chat form to provide assistance to a user
 
  Background:
    Given the home page is opened
    And the user sees the Chat icon

  Scenario: Open chat window
    When the user clicks on the chat button 
    Then the chat window is visible
    And the user can see an operator online
  
  Scenario: Send a message
    Given the chat window is displayed and opened
    When the user types a message 
    And the user clicks the submit button
    Then the user can see a form displayed

Scenario: Fill out the form with valid data 
    Given the form is displayed 
    And the user fills in the email field with 'email@valid.com'
    And the user fills in the name field with 'Nume Corect'
    And the user fills in the message field with 'Mesaj'
    When the user clicks the Submit button
    Then a success message is displayed confirming the message was sent

Scenario: Name and Email required
    Given the form is displayed
    And the user fills in the message field with 'Mesaj'
    When the user clicks the Submit button
    Then a warning icon is displayed for the name field
    And a warning icon is displayed for the email field
    And the "name" and "email" fields should have aria-required set to "true"

Scenario: Fill out the form with an invalid email
    Given the form is displayed
    And the user fills in the name field with 'nume corect'
    And the user fills in the email field with "<invalidEmail>"
    And the user fills in the message field with 'Mesaj'
    When the user clicks the Submit button
    Then a warning icon is displayed for the email field
  
Examples:
    | invalidEmail      |
    | emailinvalid      |
    | email@invalid     |
    | email@.com        |
    | invalid@domain    |

Scenario: Fill out the form with an invalid name
    Given the form is displayed
    And the user fills in the name field with '<invalidName>'
    And the user fills in the email field with "email@corect.com"
    And the user fills in the message field with 'Mesaj'
    When the user clicks the Submit button
    Then a warning icon is displayed for the email field
  
Examples:
    | invalidName|
    | 123        |
    | nume!      |
    | nume_123   |
    | !!         |