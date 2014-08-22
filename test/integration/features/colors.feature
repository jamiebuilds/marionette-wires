Feature: Colors
  So a user can create a list of their favorite colors, and see information about single colors. A user might also want to link to a single color to share it with friends.

  Background:
    Given I am viewing the colors index page

  Scenario: Showing a color
    When I click on a color
    Then I should see the colors show page

  Scenario: Editing a color
    When I edit a color
    Then I should see the information persisted

  Scenario: Prompted while destroying a color
    When I destroy a color
    Then I should be warned

  Scenario: Destroying a color
    When I destroy a color
    And I confirm the destruction
    Then the color should be gone

  Scenario: Creating a color
    When I create a new color
    Then I should see it on the colors index page

  Scenario: Activing a color
    When I click on a color
    And I activate it
    Then it should be active
