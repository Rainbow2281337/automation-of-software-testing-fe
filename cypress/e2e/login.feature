Feature: Login functionality

  Scenario: User submits empty login form
    Given I open the login page
    When I click the login button
    Then I should see validation messages

  Scenario: User logs in with valid credentials
    Given I open the login page
    When I type "alexey.shevchenko.04@gmail.com" and "12345678"
    And I click the login button
    Then I should be redirected to the main page
