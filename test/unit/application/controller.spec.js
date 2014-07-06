describe('application/controller.js', function() {
  beforeEach(function() {
    this.layoutView = { render: stub() };
    this.LayoutView = stub().returns(this.layoutView);

    this.ModalController = stub();

    this.Controller = proxyquire('../../src/application/controller.js', {
      './layout-view'       : this.LayoutView,
      '../modal/controller' : this.ModalController
    });

    this.controller = new this.Controller();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.overlay = { overlay: true };
      this.layoutView.overlay = this.overlay;

      this.modules = {
        foo: { controller: stub() },
        bar: { controller: stub() }
      };

      this.controller.initialize({ modules: this.modules });
    });

    it('should create a layout', function() {
      expect(this.LayoutView).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('layout', this.layout);
    });

    it('should create a modal controller', function() {
      expect(this.ModalController).to.have.been.calledWithNew
        .and.calledWith({ container: this.overlay });
    });

    it('should attach the modules', function() {
      expect(this.controller.modules).to.equal(this.modules);
    });

    it('should create module controllers', function() {
      expect(this.modules.foo.controller).to.have.been.calledWithNew;
    });
  });
});
