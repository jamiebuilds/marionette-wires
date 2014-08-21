describe('flashes/module', function() {
  beforeEach(function() {
    this.collection = { findWhere: stub(), add: stub() };
    this.collectionView = { collectionView: true };

    this.Collection     = stub().returns(this.collection);
    this.CollectionView = stub().returns(this.collectionView);

    this.container = { show: stub() };

    this.Module = proxyquire('src/flashes/module.js', {
      './collection'      : this.Collection,
      './collection-view' : this.CollectionView
    });

    this.module = new this.Module('flashes', {}, { container: this.container });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      stub(this.module, 'start');
      this.module.initialize({ container: this.container });
    });

    it('should attach container', function() {
      expect(this.module).to.have.ownProperty('container', this.container);
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
      expect(this.module).to.have.property('collection', this.collection);
    });

    it('should call "start"', function() {
      expect(this.module.start).to.have.been.called;
    });
  });

  describe('#onStart', function() {
    beforeEach(function() {
      this.module.onStart();
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

  describe('#onStop', function() {
    beforeEach(function() {
      this.flashesChannel = Backbone.Radio.channel('flashes');
      stub(this.flashesChannel, 'stopComplying');
      this.module.onStop();
    });

    it('should clear the commands on the channel', function() {
      expect(this.flashesChannel.stopComplying).to.have.been.called;
    });
  });

  describe('#add', function() {
    beforeEach(function() {
      this.flash = { flash: true };
      this.module.add(this.flash);
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
        this.module.remove();
      });

      it('should destroy the model', function() {
        expect(this.model.destroy).to.have.been.called;
      });
    });

    describe('when model does not exist', function() {
      beforeEach(function() {
        spy(Backbone.Model.prototype, 'destroy');
        this.collection.findWhere.returns(undefined);
        this.module.remove();
      });

      it('should not destroy anything', function() {
        expect(Backbone.Model.prototype.destroy).not.to.have.been.called;
      });
    });
  });
});
