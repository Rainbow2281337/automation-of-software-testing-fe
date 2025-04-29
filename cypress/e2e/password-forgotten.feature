Feature: Forgotten Password

  Scenario: User resets their password successfully
    Given I open the password forgotten page
    When I enter a valid email and submit
    And I enter a new valid password and submit
    Then I should be redirected to the auth page
