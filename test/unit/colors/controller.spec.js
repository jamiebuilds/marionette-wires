describe('colors/controller.js', function() {
  beforeEach(function() {
    this.headerChannel = this.Backbone.Wreqr.radio.channel('header');
    this.triggerStub = this.sinon.stub(this.headerChannel.vent, 'trigger');

    this.modelFetchStub = this.sinon.stub();
    this.modelInstance = {
      fetch : this.modelFetchStub
    };
    this.ModelStub = this.sinon.stub().returns(this.modelInstance);

    this.collectionFetchStub = this.sinon.stub();
    this.collectionGetStub = this.sinon.stub();
    this.collectionAddStub = this.sinon.stub();
    this.collectionInstance = {
      fetch : this.collectionFetchStub,
      get   : this.collectionGetStub,
      add   : this.collectionAddStub
    };
    this.CollectionStub = this.sinon.stub().returns(this.collectionInstance);

    this.IndexViewStub  = this.sinon.stub();
    this.CreateViewStub = this.sinon.stub();
    this.ShowViewStub   = this.sinon.stub();
    this.EditViewStub   = this.sinon.stub();

    this.showStub = this.sinon.stub();
    this.containerInstance = { container: true, show: this.showStub };

    this.Controller = proxyquire('../../src/colors/controller.js', {
      './model'                : this.ModelStub,
      './collection'           : this.CollectionStub,
      './index/composite-view' : this.IndexViewStub,
      './create/item-view'     : this.CreateViewStub,
      './show/item-view'       : this.ShowViewStub,
      './edit/item-view'       : this.EditViewStub
    });

    this.controller = new this.Controller({
      container: this.containerInstance
    });
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.controller.initialize({
        container: this.containerInstance
      });
    });

    it('should attach container', function() {
      expect(this.controller).to.have.ownProperty('container', this.containerInstance);
    });

    it('should create a collection', function() {
      expect(this.CollectionStub).to.have.been.calledWithNew;
    });

    it('should fetch the collection', function() {
      expect(this.collectionFetchStub).to.have.been.called;
    });

    it('should trigger a header#add event', function() {
      expect(this.triggerStub).to.have.been.calledWith('add', 'Colors', 'colors');
    });
  });

  describe('#index', function() {
    beforeEach(function() {
      this.controller.index();
    });

    it('should create an IndexView', function() {
      expect(this.IndexViewStub).to.have.been.calledWithNew.and.calledWith({
        collection : this.collectionInstance
      });
    });

    it('should show the IndexView', function() {
      expect(this.showStub).to.have.been.calledWith(
        sinon.match.instanceOf(this.IndexViewStub)
      );
    });

    it('should trigger a header#active event', function() {
      expect(this.triggerStub).to.have.been.calledWith('active', 'Colors');
    });
  });

  describe('#create', function() {
    beforeEach(function() {
      this.controller.create();
    });

    it('should create a CreateView', function() {
      expect(this.CreateViewStub).to.have.been.calledWithNew.and.calledWith({
        collection : this.collectionInstance,
        model      : this.modelInstance
      });
    });

    it('should show the CreateView', function() {
      expect(this.showStub).to.have.been.calledWith(
        sinon.match.instanceOf(this.CreateViewStub)
      );
    });

    it('should trigger a header#active event', function() {
      expect(this.triggerStub).to.have.been.calledWith('active', 'Colors');
    });
  });

  describe('#show', function() {
    beforeEach(function() {
      this.controller.show();
    });

    it('should create an ShowView', function() {
      expect(this.ShowViewStub).to.have.been.calledWithNew.and.calledWith({
        model: this.modelInstance
      });
    });

    it('should show the ShowView', function() {
      expect(this.showStub).to.have.been.calledWith(
        sinon.match.instanceOf(this.ShowViewStub)
      );
    });

    it('should trigger a header#active event', function() {
      expect(this.triggerStub).to.have.been.calledWith('active', 'Colors');
    });
  });

  describe('#edit', function() {
    beforeEach(function() {
      this.controller.edit();
    });

    it('should create an EditView', function() {
      expect(this.EditViewStub).to.have.been.calledWithNew.and.calledWith({
        model: this.modelInstance
      });
    });

    it('should show the EditView', function() {
      expect(this.showStub).to.have.been.calledWith(
        sinon.match.instanceOf(this.EditViewStub)
      );
    });

    it('should trigger a header#active event', function() {
      expect(this.triggerStub).to.have.been.calledWith('active', 'Colors');
    });
  });
});
