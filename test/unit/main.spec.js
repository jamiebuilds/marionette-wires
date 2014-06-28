describe('App startup', function() {
  beforeEach(function() {
    this.appControllerStub = this.sinon.stub();
    proxyquire('../../src/main.js', {
      './plugins': {},
      './application/controller': this.appControllerStub
    });
  });

  it('should initantiate a new application', function() {
    expect(this.appControllerStub).to.have.been.calledWithNew;
  });
});
