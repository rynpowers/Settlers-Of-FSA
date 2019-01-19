'use strict';
/* global describe beforeEach it */

const seed = require('./seed');

describe('seed script', async () => {
  it('completes successfully', await seed);
});
