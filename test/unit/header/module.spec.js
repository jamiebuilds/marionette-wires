describe('header/module', function() {
  beforeEach(function() {
    this.collection = { collection: true };
    this.view = { view: true };

    this.Collection = stub().returns(this.collection);
    this.View = stub().returns(this.view);

    this.container = { show: stub() };

    this.Module = proxyquire('../../src/header/module.js', {
      './view' : this.View,
      '../classes/collection': this.Collection
    });

    this.module = new this.Module('header', {}, { container: this.container });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.module.initialize({ container: this.container });
    });

    it('should attach container', function() {
      expect(this.module).to.have.ownProperty('container', this.container);
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
      expect(this.module).to.have.ownProperty('collection', this.collection);
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
      this.module.collection = { add: stub() };
      this.module.addNavitem('Foo', 'foo');
    });

    it('should add the nav item to the collection', function() {
      expect(this.module.collection.add).to.have.been.calledWith({
        name: 'Foo',
        path: 'foo'
      });
    });
  });
});
