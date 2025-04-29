Feature: Post Details

  Scenario: User clicks on a post and sees comments, then adds a new comment
    Given I am logged in
    When I click on a post
    Then I should see the post details with its comments
    When I add a new comment
    Then I should see my new comment in the list
