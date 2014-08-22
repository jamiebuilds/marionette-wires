module.exports = function() {
  var Widget = this.Widget;

  var violet = {
    name: 'Violet',
    hex: '#4B0082'
  };

  this.Given(/^I am viewing the colors index page$/, function() {
    return this.visit('#colors');
  });

  this.When(/^I click on a color$/, function() {
    return new Widget.ColorsIndex.List().clickAt(0);
  });

  this.Then(/^I should see the colors show page$/, function() {
    return new Widget.ColorsShow().isPresent().should.eventually.be.true;
  });

  this.When(/^I edit a color$/, function() {
    return new Widget.ColorsIndex.List().clickAt(0).then(function() {
      return new Widget.ColorsShow().edit().then(function() {
        return new Widget.ColorsEdit.Form().clearAndSubmitWith(violet);
      });
    });
  });

  this.Then(/^I should see the information persisted$/, function() {
    return new Widget.ColorsShow().getDetails().should.eventually.deep.equal({
      name: violet.name,
      hex: violet.hex,
      state: 'Inactive'
    });
  });

  this.When(/^I destroy a color$/, function() {
    return new Widget.ColorsIndex.List().clickAt(0).then(function() {
      return new Widget.ColorsShow().destroy();
    });
  });

  this.Then(/^I should be warned$/, function() {
    return new Widget.Modal().isVisible().should.eventually.be.true;
  });

  this.When(/^I confirm the destruction$/, function() {
    return new Widget.Modal().confirm();
  });

  this.Then(/^the color should be gone$/, function() {
    return new Widget.ColorsIndex.List().items().should.eventually.have.lengthOf(2);
  });

  this.When(/^I create a new color$/, function() {
    return this.visit('#colors').then(function() {
      return new Widget.ColorsIndex().create().then(function() {
        return new Widget.ColorsCreate.Form().submitWith(violet);
      });
    });
  });

  this.Then(/^I should see it on the colors index page$/, function() {
    return new Widget.ColorsIndex.List().items().should.eventually.have.lengthOf(4);
  });

  this.When(/^I activate it$/, function() {
    return new Widget.ColorsShow().click({ text: 'Activate' });
  });

  this.Then(/^it should be active$/, function() {
    return new Widget.ColorsShow().isActive().should.eventually.be.true;
  });
};
