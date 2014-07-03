describe('colors/collection.js', function() {
  beforeEach(function() {
    this.ModelStub = this.sinon.stub();
    this.Collection = proxyquire('../../src/colors/collection.js', {
      './model' : this.ModelStub
    });
  });
});
