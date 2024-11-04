@focus
Feature: Footer functionality

  Background:
    Given the home page is opened  

  Scenario: Address is displayed in the footer
    Given the address is displayed
    When the page is loaded
    Then the address is displayed and correct

  Scenario: Phone number is displayed in the footer
    Given the phone number is displayed
    When the page is loaded
    Then the phone number is displayed and correct

  Scenario: Payment options are displayed in the footer
    Given the home page is opened
    When the page is loaded
    Then the payment options are displayed and correct

  Scenario: Email address is displayed in the footer
    Given the home page is opened
    When the page is loaded
    Then the email address is displayed and correct
    
Scenario: Check Facebook icon attributes
    Given the Facebook icon is displayed on the page
    When the page is loaded
    Then the Facebook icon has the correct URL

  Scenario: Check Twitter icon attributes
    Given the Twitter icon is displayed on the page
    When the page is loaded
    Then the Twitter icon has the correct URL

  Scenario: Check Pinterest icon attributes
    Given the Pinterest icon is displayed on the page
    When the page is loaded
    Then the Pinterest icon has the correct URL