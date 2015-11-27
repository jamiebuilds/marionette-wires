describe('colors/model', function() {
  beforeEach(function() {
    this.Model = proxyquire('../../src/colors/model.js', {}).default;
    this.model = new this.Model();
  });

  describe('#validate', function() {
    beforeEach(function() {
      spy(this.model, 'validate');
    });

    describe('when missing "name" field', function() {
      beforeEach(function() {
        this.attrs = { name: '', hex: '#36c' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.model.validate).to.have.returned(['Missing "name" field']);
      });
    });

    describe('when missing "hex" field', function() {
      beforeEach(function() {
        this.attrs = { name: 'blue', hex: '' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.model.validate).to.have.returned(['Missing "hex" field']);
      });
    });

    describe('when attributes are valid', function() {
      beforeEach(function() {
        this.attrs = { name: 'blue', hex: '#36c' };
        this.model.validate(this.attrs);
      });

      it('should return an error', function() {
        expect(this.model.validate).to.have.returned(undefined);
      });
    });
  });
});
