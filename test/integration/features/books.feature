Feature: Books
  As a user I want to be able to look at the list of books and drill into each book to find out more info. I also want to be able to send a link of a book to a friend so I can share an interesting one with them.

  Background:
    Given I view the books list

  Scenario: Switching between books
    When I view a new book
    Then I should see the book marked as active
    And I should see the book details

  Scenario: Book viewing persistence
    When I view a book
    And I refresh the page
    Then I should see the same book
