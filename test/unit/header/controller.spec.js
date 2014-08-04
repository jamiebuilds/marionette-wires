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
});
