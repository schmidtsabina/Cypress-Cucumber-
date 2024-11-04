@focus
Feature: Email Field Validation for Contact Form

  Background:
    Given the user is on the contact form page

  Scenario: Name, email and message field required
   Given the contact form is displayed
   Then the email field is required
   And the name field is required
   And the message field is required

  Scenario: Submit form with invalid email addresses
    Given the contact form is displayed
    When the user enters "<email>" in the email field
    And the user submits the form
    Then the email field should display an error message saying "<expectedMessage>"

    Examples:
      | email             | expectedMessage                               |
      | mailgresit        | Please include an '@' in the email address.                 |
      | mailgresit@       | Please enter a part following '@'.                          |
      | mailgresit@greseala@ | A part following '@' should not contain the symbol '@'.  |

  Scenario: Submit form with invalid name
    Given the contact form is displayed
    And the user enters "<name>" in the name field
    When the user enters "email@corect.com" in the email field
    And the user submits the form
    Then the email field should display an error message saying "<expectedMessage>"

    Examples:
      | name             | expectedMessage                                             |
      |1234              |Names should not contain only numbers.|
      |@name             |Names should not contain special characters like '@'.|
      |nume123           |Names should not contain numbers.|

  Scenario: Submit form with valid data and reset fields
    Given the contact form is displayed
    And the user enters "John Doe" in the name field
    And the user enters "john.doe@example.com" in the email field
    And the user enters "Hello, this is a message." in the message field
    When the user submits the form
    Then a success message is displayed saying "Thanks for submitting!"
    And the name field should be empty
    And the email field should be empty
    And the message field should be empty