describe('classes/controller.js', function() {
  beforeEach(function() {
    this.Controller = proxyquire('../../src/classes/controller.js', {});
    this.controller = new this.Controller();
  });

  describe('#constructor', function() {
    beforeEach(function() {
      spy(Marionette, 'Controller');
    });

    it('should delegate to Marionette.Controller#constructor', function() {
      this.controller = new this.Controller();
      expect(Marionette.Controller).to.have.been.called;
    });

    describe('when a "container" is passed', function() {
      beforeEach(function() {
        this.container = stub();
        this.controller = new this.Controller({ container: this.container });
      });

      it('should attach the container', function() {
        expect(this.controller).to.have.ownProperty('container', this.container);
      });
    });

    describe('when a "container" is not passed', function() {
      beforeEach(function() {
        this.controller = new this.Controller();
      });

      it('should attach the container', function() {
        expect(this.controller).not.to.have.ownProperty('container');
      });
    });
  });
});
