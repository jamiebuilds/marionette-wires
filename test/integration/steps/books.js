module.exports = function() {
  var Widget = this.Widget;

  this.Given(/^I view the books list$/, function() {
    return this.visit('#books');
  });

  this.When(/^I view a new book$/, function() {
    return new Widget.BooksLibrary().clickAt(1);
  });

  this.Then(/^I should see the book marked as active$/, function() {
    return new Widget.BooksLibrary().isActive(1).should.eventually.be.true;
  });

  this.Then(/^I should see the book details$/, function() {
    return new Widget.BooksLibrary().at(1).then(function(book) {
      return new Widget.BooksViewer().getTitle().then(function(title) {
        return book.getTitle().should.eventually.equal(title);
      });
    });
  });

  this.When(/^I view a book$/, function() {
    return this.visit('#books/2');
  });

  this.When(/^I refresh the page$/, function() {
    return this.driver.executeScript('window.location = window.location');
  });

  this.Then(/^I should see the same book$/, function() {
    return new Widget.BooksLibrary().isActive(1).should.eventually.be.true;
  });
};
