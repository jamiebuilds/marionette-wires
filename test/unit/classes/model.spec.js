describe('classes/model.js', function() {
  beforeEach(function() {
    this.Model = proxyquire('../../src/classes/model.js', {});
    this.model = new this.Model();
  });

  describe('#handleRequest', function() {
    beforeEach(function() {
      this.model.handleRequest();
    });

    it('should delete "serverError"', function() {
      expect(this.model).not.to.have.ownProperty('serverError');
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
