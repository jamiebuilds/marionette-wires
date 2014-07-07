describe('flashes/controller.js', function() {
  beforeEach(function() {
    this.collection = { findWhere: stub(), add: stub() };

    this.Collection     = stub().returns(this.collection);
    this.CollectionView = stub();

    this.container = { show: stub() };

    this.Controller = proxyquire('../../src/flashes/controller.js', {
      './collection'      : this.Collection,
      './collection-view' : this.CollectionView
    });

    this.controller = new this.Controller({ container: this.container });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.collectionView = { collectionView: true };
      this.CollectionView.returns(this.collectionView);
      this.controller.initialize({ container: this.container });
    });

    it('should attach container', function() {
      expect(this.controller).to.have.ownProperty('container', this.container);
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('collection', this.collection);
    });

    it('should create a CollectionView', function() {
      expect(this.CollectionView).to.have.been.calledWithNew.and.calledWith({
        collection: this.collection
      });
    });

    it('should show the CollectionView', function() {
      expect(this.container.show).to.have.been.calledWith(this.collectionView);
    });
  });

  describe('#add', function() {
    beforeEach(function() {
      this.flash = { flash: true };
      this.controller.add(this.flash);
    });

    it('should add the flash to the collection', function() {
      expect(this.collection.add).to.have.been.calledWith(this.flash);
    });
  });

  describe('#remove', function() {
    describe('when model exists', function() {
      beforeEach(function() {
        this.model = { destroy: stub() };
        this.collection.findWhere.returns(this.model);
        this.controller.remove();
      });

      it('should destroy the model', function() {
        expect(this.model.destroy).to.have.been.called;
      });
    });

    describe('when model does not exist', function() {
      beforeEach(function() {
        spy(Backbone.Model.prototype, 'destroy');
        this.collection.findWhere.returns(undefined);
        this.controller.remove();
      });

      it('should not destroy anything', function() {
        expect(Backbone.Model.prototype.destroy).not.to.have.been.called;
      });
    });
  });
});
