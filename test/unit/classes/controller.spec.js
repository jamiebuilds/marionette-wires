describe('classes/controller.js', function() {
  beforeEach(function() {
    this.Controller = proxyquire('../../src/classes/controller.js', {});
    this.controller = new this.Controller();
  });

  describe('#constructor', function() {
    beforeEach(function() {
      spy(Marionette, 'Controller');
      stub(this.Controller.prototype, 'getChannel');
      stub(this.Controller.prototype, 'bindChannelEvents');
    });

    it('should delegate to Marionette.Controller#constructor', function() {
      this.controller = new this.Controller();
      expect(Marionette.Controller).to.have.been.called;
    });

    it('should call "getChannel"', function() {
      this.controller = new this.Controller();
      expect(this.controller.getChannel).to.have.been.called;
    });

    it('should call "bindChannelEvents"', function() {
      this.controller = new this.Controller();
      expect(this.controller.bindChannelEvents).to.have.been.called;
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

  describe('#getChannel', function() {
    describe('when "channelName" is false', function() {
      beforeEach(function() {
        this.controller.getChannel();
      });

      it('should not setup a channel', function() {
        expect(this.controller).not.to.have.property('channel');
      });
    });

    describe('when "channelName" is a string', function() {
      beforeEach(function() {
        this.channel = Backbone.Wreqr.radio.channel('foo');
        this.controller.channelName = 'foo';
        this.controller.getChannel();
      });

      it('should setup a channel', function() {
        expect(this.controller).to.have.property('channel', this.channel);
      });
    });

    describe('when "channelName" is a function', function() {
      beforeEach(function() {
        this.channel = Backbone.Wreqr.radio.channel('foo');
        this.controller.channelName = stub().returns('foo');
        this.controller.getChannel();
      });

      it('should setup a channel', function() {
        expect(this.controller).to.have.property('channel', this.channel);
      });
    });
  });

  describe('#bindChannelEvents', function() {
    beforeEach(function() {
      stub(this.controller, 'bindEntityEvents');
      this.controller.channel = Backbone.Wreqr.radio.channel('foo');
    });

    describe('when "channelEvents" is undefined', function() {
      beforeEach(function() {
        this.controller.bindChannelEvents();
      });
    });

    describe('when "channelEvents" is a hash', function() {
      beforeEach(function() {
        this.controller.channelEvents = {
          'foo': 'foo',
          'bar': 'bar'
        };
        this.controller.bindChannelEvents();
      });

      it('should call "bindEntityEvents" with the channel and hash', function() {
        expect(this.controller.bindEntityEvents)
          .to.have.been.calledWith(this.controller.channel.vent, this.controller.channelEvents);
      });
    });
  });
});
