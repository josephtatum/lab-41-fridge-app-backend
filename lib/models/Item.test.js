const Item = require('./Item');

describe('Item Model', () => {

  describe('Name', () => {

    it('is required', () => {
      const item = new Item();
      const { errors } = item.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });

    it('must be a string', () => {
      const item = new Item({
        name: { milk: 'milk' },
        expirationDate: Date.now()
      });
      const { errors } = item.validateSync();
      expect(errors.name.message).toEqual('Cast to String failed for value "{ milk: \'milk\' }" at path "name"');
    });

  });
});
