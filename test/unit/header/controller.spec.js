describe('header/controller.js', function() {
  beforeEach(function() {
    this.Collection = stub();
    this.View = stub();
    this.container = { show: stub() };

    this.Controller = proxyquire('../../src/header/controller.js', {
      './view' : this.View,
      '../classes/collection': this.Collection
    });

    this.controller = new this.Controller({ container: this.container });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.headerChannel = Backbone.Wreqr.radio.channel('header');
      stub(this.controller, 'listenTo');

      this.view = { view: true };
      this.View.returns(this.view);

      this.collection = { collection: true };
      this.Collection.returns(this.collection);

      this.controller.initialize({ container: this.container });
    });

    it('should attach container', function() {
      expect(this.controller).to.have.ownProperty('container', this.container);
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
      expect(this.controller).to.have.ownProperty('collection', this.collection);
    });

    it('should create a View', function() {
      expect(this.View).to.have.been.calledWithNew.and.calledWith({
        collection: this.collection
      });
    });

    it('should show the view', function() {
      expect(this.container.show).to.have.been.calledWith(this.view);
    });

    it('should listen to channel events', function() {
      expect(this.controller.listenTo)
        .to.have.been.calledWith(this.headerChannel.vent, 'add', this.controller.addNavitem);
      expect(this.controller.listenTo)
        .to.have.been.calledWith(this.headerChannel.vent, 'active', this.controller.setActive);
    });
  });

  describe('#addNavitem', function() {
    beforeEach(function() {
      this.controller.collection = { add: stub() };
      this.controller.addNavitem('Foo', 'foo');
    });

    it('should add the nav item to the collection', function() {
      expect(this.controller.collection.add).to.have.been.calledWith({
        name: 'Foo',
        path: 'foo'
      });
    });
  });

  describe('#setActive', function() {
    beforeEach(function() {
      this.collection = { invoke: stub(), findWhere: stub() };
      this.controller.collection = this.collection;
    });

    it('should deactivate all models', function() {
      this.controller.setActive();
      expect(this.collection.invoke).to.have.been.calledWith('set', 'active', false);
    });

    describe('when model exists', function() {
      beforeEach(function() {
        this.model = { set: stub() };
        this.collection.findWhere.returns(this.model);
        this.controller.setActive('Foo');
      });

      it('should not set anything', function() {
        expect(this.model.set).to.have.been.calledWith('active', true);
      });
    });

    describe('when model does not exist', function() {
      beforeEach(function() {
        spy(Backbone.Model.prototype, 'set');
        this.collection.findWhere.returns(undefined);
        this.controller.setActive();
      });

      it('should not set anything', function() {
        expect(Backbone.Model.prototype.set).not.to.have.been.called;
      });
    });
  });
});
