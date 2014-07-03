describe('colors/router.js', function() {
  beforeEach(function() {
    this.controllerInstance = { controller: true };
    this.controllerStub = this.sinon.stub().returns(this.controllerInstance);

    this.contentInstance = { content: true };
    this.processAppRoutesStub = this.sinon.stub();
    this.applicationInstance = {
      layout: { content: this.contentInstance },
      router: { processAppRoutes: this.processAppRoutesStub }
    };

    this.router = proxyquire('../../src/colors/router.js', {
      './controller' : this.controllerStub
    });

    this.router.call(this.applicationInstance);
  });

  it('should create a controller', function() {
    expect(this.controllerStub).to.have.been.calledWith({ container: this.contentInstance });
  });

  it('should process its routes', function() {
    expect(this.processAppRoutesStub).to.have.been.calledWith(this.controllerInstance, {
      'colors'          : 'index',
      'colors/new'      : 'create',
      'colors/:id'      : 'show',
      'colors/:id/edit' : 'edit'
    });
  });
});
