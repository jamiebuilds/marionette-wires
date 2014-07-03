describe('application/layout-view.js', function() {
  beforeEach(function() {
    this.templateStub         = this.sinon.stub();
    this.headerControllerStub = this.sinon.stub();

    this.LayoutView = proxyquire('../../src/application/layout-view.js', {
      './layout-template.hbs' : this.templateStub,
      '../header/controller'  : this.headerControllerStub
    });

    this.layoutView = new this.LayoutView();
  });

  describe('#onRender', function() {
    beforeEach(function() {
      this.headerStub = this.sinon.stub();
      this.layoutView.header = this.headerStub;
      this.layoutView.onRender();
    });

    it('should create a header controller', function() {
      expect(this.headerControllerStub).to.have.been.calledWithNew.and.calledWith({
        container: this.headerStub,
        collection: [
          { name: 'Colors', path: 'colors', route: 'colorsList' }
        ]
      });
    });
  });
});
