describe('flashes/item-view', function() {
  beforeEach(function() {
    this.model = { get: stub(), destroy: stub() };
    this.ItemView = proxyquire('../../src/flashes/item-view.js', {
      './item-template.hbs' : stub(),
    }).default;

    this.itemView = new this.ItemView({ model: this.model });
  });

  describe('#className', function() {
    beforeEach(function() {
      this.model.get.returns('foo');
      spy(this.itemView, 'className');
      this.itemView.className();
    });

    it('should return classlist with the correct alert type', function() {
      expect(this.itemView.className).to.have.returned('flashes__alert alert alert-foo');
    });
  });

  describe('#dismiss', function() {
    beforeEach(function() {
      this.itemView.dismiss();
    });

    it('should destroy the model', function() {
      expect(this.model.destroy).to.have.been.called;
    });
  });
});
