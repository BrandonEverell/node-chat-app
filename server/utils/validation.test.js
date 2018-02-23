const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation')
// isRealString
  // should reject non-string values
  // should allow string with non-space characters

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    let res = isRealString('     ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let res = isRealString('   Brando     ');
    expect(res).toBe(true);
  });
});
