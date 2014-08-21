describe('colors/router', function() {
  beforeEach(function() {
    this.model      = { fetch: stub() };
    this.collection = { fetch: stub(), get: stub().returns(this.model), add: stub() };

    this.collection.fetch.returns($.Deferred().resolve(this.collection));

    this.Model      = stub().returns(this.model);
    this.Collection = stub().returns(this.collection);

    this.IndexView  = stub();
    this.CreateView = stub();
    this.ShowView   = stub();
    this.EditView   = stub();

    this.container = { show: stub() };

    this.Router = proxyquire('src/colors/router.js', {
      './model'                : this.Model,
      './collection'           : this.Collection,
      './index/composite-view' : this.IndexView,
      './create/view'          : this.CreateView,
      './show/view'            : this.ShowView,
      './edit/view'            : this.EditView
    });

    this.router = new this.Router({ container: this.container });
  });

  describe('#index', function() {
    beforeEach(function() {
      this.indexView = { indexView: true };
      this.IndexView.returns(this.indexView);
      return this.router.index();
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
      return this.router.create();
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
      return this.router.show();
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
      return this.router.edit();
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
