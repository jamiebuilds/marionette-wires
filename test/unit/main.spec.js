describe('main.js', function() {
  beforeEach(function() {
    this.appController = stub();
    proxyquire('../../src/main.js', {
      './plugins': {},
      './application/controller': this.appController
    });
  });

  it('should initantiate a new application', function() {
    expect(this.appController).to.have.been.calledWithNew;
  });
});
