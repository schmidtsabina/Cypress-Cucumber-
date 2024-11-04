@focus
Feature: Navigation buttons on the homepage

  Background:
    Given the home page is opened

  Scenario: Book Now button
    Given the "Book Now" button is displayed
    When the user clicks the "Book Now" button
    Then the "Book Now" page is displayed

  Scenario: Explore Button
    Given the "Explore" button is displayed
    When the user clicks the "Explore" button
    Then the "Explore" page is displayed

  Scenario: Rooms Button
    Given the "Rooms" button is displayed
    When the user clicks the "Rooms" button
    Then the "Rooms" page is displayed

  Scenario: Contact Button
    Given the "Contact" button is displayed
    When the user clicks the "Contact" button
    Then the "Contact" page is displayed