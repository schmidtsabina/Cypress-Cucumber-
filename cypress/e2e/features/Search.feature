@focus
Feature: Boking search widget

  Background: 
    Given the home page is opened

Scenario: Selecting Check-In Date
  Given the "Check-In" field is displayed 
  When the user clicks on the "Check-In" field
  And the user selects a valid "Check-In" date from the date picker
  Then the "Check-In" field should display the selected date

Scenario: Selecting Check-Out Date
  Given the "Check-Out" field is displayed 
  When the user clicks on the "Check-Out" field
  And the user selects a valid "Check-Out" date from the date picker
  Then the "Check-Out" field should display the selected date 

Scenario: Selecting a past Check-In date
  Given the "Check-In" field is displayed
  When the user clicks on the "Check-In" field
  Then the dates in the past are disabled

Scenario: Setting a Check-Out date earlier than 3 days after Check-in
  Given the "Check-In" field is displayed
  When the user clicks on the "Check-In" field
  And the user selects a valid "Check-In" date from the date picker
  When the user clicks on the "Check-Out" field
  And the user selects a Check-Out date that is earlier than 3 days after Check-In date
  Then the "Check-Out" field should display the selected date

Scenario: Default values for adults and kids
   Given the adults buttons are displayed 
   And the kids buttons are displayed
   Then the adults value is set to 1
   And the kids value is set to 0

Scenario: Adults button increment 
    Given the adults buttons are displayed 
    And the adults value is set to 1
    When the user clicks the adults increment button <count> times
    Then the adults field should display the number <count> of adults selected

  Examples:
    | count |
    | 5     |
    | 7     |
    | 1     |

Scenario: Adults button 
    Given the adults buttons are displayed
    And the adults value is set to <initialValue>
    When the user clicks the adults increment button <incrementCount> times
    And the user clicks the adults decrement button <decrementCount> times
    Then the adults field should display <expectedValue>

    Examples:
      | initialValue | incrementCount | decrementCount | expectedValue |
      | 1            | 0              | 1              | 1             | 
      | 1            | 3              | 3              | 1             |
      | 1            | 5              | 2              | 4             |
      | 1            | 10             | 10             | 1             |

Scenario: Kids button 
    Given the kids buttons are displayed
    And the kids value is set to <initialValue>
    When the user clicks the kids increment button <incrementCount> times
    And the user clicks the kids decrement button <decrementCount> times
    Then the kids field should display <expectedValue>

    Examples:
      | initialValue | incrementCount | decrementCount | expectedValue |
      | 0            | 0              | 1              | 0             | 
      | 0            | 3              | 3              | 0             | 
      | 0            | 5              | 2              | 3             | 
      | 0            | 10             | 10             | 0             | 

Scenario: Perform a search (for 3 days)
    Given the search widget is displayed
    And the search button is displayed  
    When the user clicks on the "Check-In" field
    And the user selects a valid "Check-In" date from the date picker
    And the user clicks on the "Check-Out" field
    And the user selects a valid "Check-Out" date from the date picker
    And the user clicks the adults increment button <incrementCountAdults> times
    And the user clicks the kids increment button <incrementCountKids> times
    And the user clicks the search button 
    Then the "Rooms" page is displayed
    And the number of rooms equals <numberRooms>
    
Examples:
    | incrementCountAdults |incrementCountKids|numberRooms|
    |    1                 |1                 |1          |
    |   7                  |0                 |0          |
    | 1                    |0                 |3          |

Scenario: Selecting Check-In Date a month later 
  Given the "Check-In" field is displayed 
  When the user clicks on the "Check-In" field
  And the user selects "Check-In" date a month later
  Then the "Check-In" field should display the selected date

Scenario: Selecting Check-Out Date a month later 
  Given the "Check-Out" field is displayed 
  When the user clicks on the "Check-Out" field
  And the user selects "Check-Out" date a month later
  Then the "Check-Out" field should display the selected date

Scenario: Selecting Check-In and Check-Out Dates a month later and performing a search
    Given the "Check-In" field is displayed
    When the user clicks on the "Check-In" field
    And the user selects "Check-In" date a month later
    And the "Check-Out" field is displayed
    When the user clicks on the "Check-Out" field
    And the user selects "Check-Out" date a month later
    And the user clicks the search button
    Then the "Rooms" page is displayed