describe('main.js', function() {
  beforeEach(function() {
    this.appController = stub();
    stub(Backbone.history, 'start');

    proxyquire('../../src/main.js', {
      './plugins': {},
      './application/controller': this.appController,
      './index/controller': stub(),
      './colors/controller': stub()
    });
  });

  it('should initantiate a new application', function() {
    expect(this.appController).to.have.been.calledWithNew;
  });

  it('should start Backbone.history', function() {
    expect(Backbone.history.start).to.have.been.calledOnce;
  });
});
