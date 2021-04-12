import { parse, InvalidGridRef } from './gridref.js';

describe('parse', () => {
  it('Ben Nevis grid reference is valid', () => {
    expect(parse('NN1665071250')).toEqual([216650.0, 771250.0]);
  });
  it('OS Southampton grid reference is valid', () => {
    expect(parse('SU387148')).toEqual([438700.0, 114800.0]);
  });
  it('Tower of London grid reference is valid', () => {
    expect(parse('TQ336805')).toEqual([533600.0, 180500.0]);
  });
  it('SU grid reference is valid', () => {
    expect(parse('SU')).toEqual([400000.0, 100000.0]);
  });
  it('Glasgow grid reference is valid', () => {
    expect(parse('NS5899860113')).toEqual([258998.0, 660113.0]);
  });
  it('Saxa Vord (Northern Shetland) grid reference is valid', () => {
    expect(parse('HP6322316714')).toEqual([463223.0, 1216714.0]);
  });
  it('St Marys Airport (Scilly Isles) grid reference is valid', () => {
    expect(parse('SV9178010372')).toEqual([91780.0, 10372.0]);
  });
  it('Close to the origin of British National Grid', () => {
    expect(parse('sv0239114892')).toEqual([2391.0, 14892.0]);
  });
  it('Parses mixed case letters', () => {
    expect(parse('sV0239114892')).toEqual([2391.0, 14892.0]);
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
});
