import { parse, InvalidGridRef } from './gridref.js';

describe('parse', () => {
  it('Ben Nevis grid reference is valid', () => {
    expect(parse('NN1665071250')).toEqual([216650.0, 771250.0, 216651.0, 771251.0]);
  });
  it('OS Southampton grid reference is valid', () => {
    expect(parse('SU387148')).toEqual([438700.0, 114800.0, 438800.0, 114900.0]);
  });
  it('Tower of London grid reference is valid', () => {
    expect(parse('TQ336805')).toEqual([533600.0, 180500.0, 533700.0, 180600.0]);
  });
  it('SU grid reference is valid', () => {
    expect(parse('SU')).toEqual([400000.0, 100000.0, 500000.0, 200000.0]);
  });
  it('Glasgow grid reference is valid', () => {
    expect(parse('NS5899860113')).toEqual([258998.0, 660113.0, 258999.0, 660114.0]);
  });
  it('Saxa Vord (Northern Shetland) grid reference is valid', () => {
    expect(parse('HP63221671')).toEqual([463220.0, 1216710.0, 463230.0, 1216720.0]);
  });
  it('St Marys Airport (Scilly Isles) grid reference is valid', () => {
    expect(parse('SV917103')).toEqual([91700.0, 10300.0, 91800.0, 10400.0]);
  });
  it('Close to the origin of British National Grid', () => {
    expect(parse('sv0239114892')).toEqual([2391.0, 14892.0, 2392.0, 14893.0]);
  });
  it('Parses mixed case letters', () => {
    expect(parse('sV0239114892')).toEqual([2391.0, 14892.0, 2392.0, 14893.0]);
  });
  it('Throws on non-string grid reference', () => {
    expect(() => parse(42)).toThrow(InvalidGridRef);
  });
  it('Throws when grid reference is too short', () => {
    expect(() => parse('')).toThrow(InvalidGridRef);
    expect(() => parse('S')).toThrow(InvalidGridRef);
  });
  it('Throws when either of first two characters are I', () => {
    expect(() => parse('SI')).toThrow(InvalidGridRef);
    expect(() => parse('IS')).toThrow(InvalidGridRef);
  });
  it('Throws if characters after first two are not numeric', () => {
    expect(() => parse('stok')).toThrow(InvalidGridRef);
    // Slightly odd test case which was previously parsed as a valid
    // grid reference as it starts with valid charachters and has an
    // even number of characters once spaces have been removed
    expect(() => parse('stoke on trent')).toThrow(InvalidGridRef);
  });
});
