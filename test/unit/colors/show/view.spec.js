describe('colors/show/view.js', function() {
  beforeEach(function() {
    this.ModalViewStub = this.sinon.stub();
    this.templateStub = this.sinon.stub();
    this.cleanupStub = this.sinon.stub();
    this.modelInstance = new this.Backbone.Model();
    this.modelInstance.url = 'foo';
    this.modelInstance.cleanup = this.cleanupStub;

    this.View = proxyquire('../../src/colors/show/view.js', {
      '../modal/view'  : this.ModalViewStub,
      './template.hbs' : this.templateStub
    });

    this.itemView = new this.View({
      model: this.modelInstance
    });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.bindAllStub = this.sinon.stub(this._, 'bindAll');
      this.itemView.initialize({
        model: this.modelInstance
      });
    });

    it('should bind all methods that can be called by third-party', function() {
      expect(this.bindAllStub).to.have.been.calledWith(
        this.itemView, 'handleToggleFailure', 'handleDestroySuccess'
      );
    });

    it('should attach the model', function() {
      expect(this.itemView).to.have.ownProperty('model', this.modelInstance);
    });

    it('should cleanup the model', function() {
      expect(this.cleanupStub).to.have.been.called;
    });
  });

  describe('#templateHelpers', function() {
    beforeEach(function() {
      this.templateHelpersSpy = this.sinon.spy(this.itemView, 'templateHelpers');
      this.modelInstance.validationError = 'foo';
      this.modelInstance.serverError = 'bar';
      this.itemView.templateHelpers();
    });

    it('should return model errors', function() {
      expect(this.templateHelpersSpy).to.have.returned({
        errors      : this.modelInstance.validationError,
        serverError : this.modelInstance.serverError
      });
    });
  });

  describe('#handleToggle', function() {
    beforeEach(function() {
      this.itemView.handleToggle();
    });

    it('should', function() {

    });
  });

  describe('#handleToggleFailure', function() {
    beforeEach(function() {
      this.itemView.handleToggleFailure();
    });
  });

  describe('#handleDestroy', function() {
    beforeEach(function() {
      this.itemView.handleDestroy();
    });
  });

  describe('#handleConfirmDestroy', function() {
    beforeEach(function() {
      this.itemView.handleConfirmDestroy();
    });
  });

  describe('#handleCancelDestroy', function() {
    beforeEach(function() {
      this.itemView.handleCancelDestroy();
    });
  });

  describe('#handleDestroySuccess', function() {
    beforeEach(function() {
      this.itemView.handleDestroySuccess();
    });
  });
});
