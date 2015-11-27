describe('header/service', function() {
  beforeEach(function() {
    this.collection = { collection: true };
    this.view = { view: true };

    this.Collection = stub().returns(this.collection);
    this.View = stub().returns(this.view);

    this.container = { show: stub() };

    this.service = proxyquire('../../src/header/service.js', {
      './view' : this.View,
      'backbone': { Collection: this.Collection }
    }).default;

    this.service.setup({
      container: this.container
    });
  });

  describe('#start', function() {
    beforeEach(function() {
      this.service.start({
        container: this.container
      });
    });

    it('should create a collection', function() {
      expect(this.Collection).to.have.been.calledWithNew;
      expect(this.service).to.have.ownProperty('collection', this.collection);
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

  describe('#add', function() {
    beforeEach(function() {
      this.service.collection = { add: stub() };
      this.service.add({
        name: 'Foo',
        path: 'foo',
        type: 'primary'
      });
    });

    it('should add the nav item to the collection', function() {
      expect(this.service.collection.add).to.have.been.calledWith({
        name: 'Foo',
        path: 'foo',
        type: 'primary'
      });
    });
  });
});
