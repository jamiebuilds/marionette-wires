describe('colors/model.js', function() {
  beforeEach(function() {
    this.Model = proxyquire('../../src/colors/model.js', {});
    this.model = new this.Model();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.onStub = this.sinon.stub();
      this.model.on = this.onStub;
      this.model.initialize();
    });

    it('should register event handlers', function() {
      expect(this.onStub).to.have.been.calledWith('request');
      expect(this.onStub).to.have.been.calledWith('error');
    });
  });

  describe('#validate', function() {
    beforeEach(function() {
      this.validateSpy = this.sinon.spy(this.model, 'validate');
    });

    describe('when missing "name" field', function() {
      beforeEach(function() {
        this.attrs = { name: '', hex: '#36c' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.validateSpy).to.have.returned(['Missing "name" field']);
      });
    });

    describe('when missing "hex" field', function() {
      beforeEach(function() {
        this.attrs = { name: 'blue', hex: '' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.validateSpy).to.have.returned(['Missing "hex" field']);
      });
    });

    describe('when attributes are valid', function() {
      beforeEach(function() {
        this.attrs = { name: 'blue', hex: '#36c' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.validateSpy).to.have.returned(undefined);
      });
    });
  });

  describe('#handleRequest', function() {
    beforeEach(function() {
      this.model.handleRequest();
    });

    it('should set "serverError" to "false"', function() {
      expect(this.model).to.have.ownProperty('serverError', false);
    });
  });

  describe('#handleError', function() {
    beforeEach(function() {
      this.model.handleError();
    });

    it('should set "serverError" to "true"', function() {
      expect(this.model).to.have.ownProperty('serverError', true);
    });
  });

  describe('#cleanup', function() {
    beforeEach(function() {
      this.model.serverError = true;
      this.model.validationError = true;
      this.model.cleanup();
    });

    it('should delete "serverError"', function() {
      expect(this.model).not.to.have.ownProperty('serverError');
    });

    it('should delete "validationError"', function() {
      expect(this.model).not.to.have.ownProperty('validationError');
    });
  });
});
