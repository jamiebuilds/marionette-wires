describe('colors/show/view.js', function() {
  beforeEach(function() {
    this.ModalView = stub();
    this.template = stub();

    this.model = new Backbone.Model();
    this.model.url = 'foo';
    this.model.cleanup = stub();

    this.View = proxyquire('../../src/colors/show/view.js', {
      '../modal/view'  : this.ModalView,
      './template.hbs' : this.template
    });

    this.itemView = new this.View({ model: this.model });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.bindAll = stub(_, 'bindAll');
      this.itemView.initialize({ model: this.model });
    });

    it('should bind all methods that can be called by third-party', function() {
      expect(this.bindAll).to.have.been.calledWith(
        this.itemView, 'handleToggleFailure', 'handleDestroySuccess'
      );
    });

    it('should attach the model', function() {
      expect(this.itemView).to.have.ownProperty('model', this.model);
    });

    it('should cleanup the model', function() {
      expect(this.model.cleanup).to.have.been.called;
    });
  });

  describe('#templateHelpers', function() {
    beforeEach(function() {
      spy(this.itemView, 'templateHelpers');
      this.model.validationError = 'foo';
      this.model.serverError = 'bar';
      this.itemView.templateHelpers();
    });

    it('should return model errors', function() {
      expect(this.itemView.templateHelpers).to.have.returned({
        errors: this.model.validationError
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
