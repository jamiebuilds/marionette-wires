describe('colors/controller.js', function() {
  beforeEach(function() {
    this.model      = { fetch: stub() };
    this.collection = { fetch: stub(), get: stub(), add: stub() };

    this.Model      = stub().returns(this.model);
    this.Collection = stub().returns(this.collection);

    this.IndexView  = stub();
    this.CreateView = stub();
    this.ShowView   = stub();
    this.EditView   = stub();

    this.container = { show: stub() };

    this.Controller = proxyquire('../../src/colors/controller.js', {
      './model'                : this.Model,
      './collection'           : this.Collection,
      './index/composite-view' : this.IndexView,
      './create/view'          : this.CreateView,
      './show/view'            : this.ShowView,
      './edit/view'            : this.EditView
    });

    this.controller = new this.Controller({ container: this.container });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.controller.initialize({ container: this.container });
    });

    it('should attach container', function() {
      expect(this.controller).to.have.ownProperty('container', this.container);
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
    });

    it('should fetch the collection', function() {
      expect(this.collection.fetch).to.have.been.called;
    });
  });

  describe('#index', function() {
    beforeEach(function() {
      this.indexView = { indexView: true };
      this.IndexView.returns(this.indexView);
      this.controller.index();
    });

    it('should create an IndexView', function() {
      expect(this.IndexView).to.have.been.calledWithNew.and.calledWith({
        collection: this.collection
      });
    });

    it('should show the IndexView', function() {
      expect(this.container.show).to.have.been.calledWith(this.indexView);
    });
  });

  describe('#create', function() {
    beforeEach(function() {
      this.createView = { createView: true };
      this.CreateView.returns(this.createView);
      this.controller.create();
    });

    it('should create a CreateView', function() {
      expect(this.CreateView).to.have.been.calledWithNew.and.calledWith({
        collection : this.collection,
        model      : this.model
      });
    });

    it('should show the CreateView', function() {
      expect(this.container.show).to.have.been.calledWith(this.createView);
    });
  });

  describe('#show', function() {
    beforeEach(function() {
      this.showView = { showView: true };
      this.ShowView.returns(this.showView);
      this.controller.show();
    });

    it('should create an ShowView', function() {
      expect(this.ShowView).to.have.been.calledWithNew.and.calledWith({
        model: this.model
      });
    });

    it('should show the ShowView', function() {
      expect(this.container.show).to.have.been.calledWith(this.showView);
    });
  });

  describe('#edit', function() {
    beforeEach(function() {
      this.editView = { editView: true };
      this.EditView.returns(this.editView);
      this.controller.edit();
    });

    it('should create an EditView', function() {
      expect(this.EditView).to.have.been.calledWithNew.and.calledWith({
        model: this.model
      });
    });

    it('should show the EditView', function() {
      expect(this.container.show).to.have.been.calledWith(this.editView);
    });
  });
});
