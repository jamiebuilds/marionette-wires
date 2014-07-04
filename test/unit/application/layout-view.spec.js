describe('application/layout-view.js', function() {
  beforeEach(function() {
    this.template         = stub();
    this.HeaderController = stub();

    this.LayoutView = proxyquire('../../src/application/layout-view.js', {
      './layout-template.hbs' : this.template,
      '../header/controller'  : this.HeaderController
    });

    this.layoutView = new this.LayoutView();
  });

  describe('#onRender', function() {
    beforeEach(function() {
      this.layoutView.header = stub();
      this.layoutView.onRender();
    });

    it('should create a header controller', function() {
      expect(this.HeaderController).to.have.been.calledWithNew.and.calledWith({
        container: this.layoutView.header,
        collection: [
          { name: 'Colors', path: 'colors', route: 'colorsList' }
        ]
      });
    });
  });
});
