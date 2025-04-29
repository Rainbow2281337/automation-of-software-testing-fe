Feature: User Registration

  Scenario: User registers with valid credentials
    Given I open the registration page
    When I fill the registration form with valid data
    And I submit the registration form
    Then I should be redirected to the main page
