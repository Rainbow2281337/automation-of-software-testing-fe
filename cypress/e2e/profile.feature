Feature: Profile Button

  Scenario: User clicks on profile button and sees their info
    Given I am logged in
    When I click the profile button
    Then I should see my profile info
