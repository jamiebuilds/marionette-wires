describe('colors/collection.js', function() {
  beforeEach(function() {
    this.Model = stub();
    this.Collection = proxyquire('../../src/colors/collection.js', {
      './model' : this.Model
    });
  });
});
