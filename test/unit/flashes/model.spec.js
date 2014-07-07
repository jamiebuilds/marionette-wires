describe('flashes/model.js', function() {
  beforeEach(function() {
    this.Model = proxyquire('../../src/flashes/model.js', {});
    this.model = new this.Model();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      stub(this.model, '_setTimeout');
      stub(this.model, '_clearTimeout');
      stub(this.model, 'on');
      stub(this.model, 'listenTo');
    });

    it('should "clearTimeout" on "destroy"', function() {
      this.model.initialize();
      expect(this.model.on).to.have.been.calledWith('destroy', this.model._clearTimeout);
    });

    describe('when "timeout" is false', function() {
      beforeEach(function() {
        this.model.initialize();
      });

      it('should not call "setTimeout"', function() {
        expect(this.model._setTimeout).not.to.have.been.called;
      });
    });

    describe('when "timeout" is an integer', function() {
      beforeEach(function() {
        this.model.attributes.timeout = 300;
        this.model.initialize();
      });

      it('should call "setTimeout"', function() {
        expect(this.model._setTimeout).to.have.been.called;
      });
    });

    describe('when "clearOnRoute" is true', function() {
      beforeEach(function() {
        this.routerChannel = Backbone.Wreqr.radio.channel('router');
        this.model.initialize();
      });

      it('should listen for "route" events', function() {
        expect(this.model.listenTo)
          .to.have.been.calledWith(this.routerChannel.vent, 'route', this.model.destroy);
      });
    });

    describe('when "clearOnRoute" is false', function() {
      beforeEach(function() {
        this.routerChannel = Backbone.Wreqr.radio.channel('router');
        this.model.attributes.clearOnRoute = false;
        this.model.initialize();
      });

      it('should not listen for "route" events', function() {
        expect(this.model.listenTo).not.to.have.been.called;
      });
    });
  });
});
