Feature: Post List View

  Scenario: User sees the post list after login
    Given I open the login page
    When I enter valid credentials and submit
    Then I should see the post list
