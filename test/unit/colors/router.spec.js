describe('colors/router.js', function() {
  beforeEach(function() {
    this.controller = { controller: true };
    this.Controller = stub().returns(this.controller);

    this.app = {
      layout: { content: stub() },
      router: { processAppRoutes: stub() }
    };

    this.router = proxyquire('../../src/colors/router.js', {
      './controller' : this.Controller
    });

    this.router.call(this.app);
  });

  it('should create a controller', function() {
    expect(this.Controller).to.have.been.calledWithNew.and.calledWith({
      container: this.app.layout.content
    });
  });

  it('should process its routes', function() {
    expect(this.app.router.processAppRoutes).to.have.been.calledWith(this.controller, {
      'colors'          : 'index',
      'colors/new'      : 'create',
      'colors/:id'      : 'show',
      'colors/:id/edit' : 'edit'
    });
  });
});
