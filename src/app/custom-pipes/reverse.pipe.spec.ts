import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {

  it('should create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse an array', () => {
    const pipe = new ReversePipe();
    const reversed = pipe.transform([1, 2, 3, 4, 5]);
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it('should work also with an empty array', () => {
    const pipe = new ReversePipe();
    const reversed = pipe.transform([]);
    expect(reversed).toEqual([]);
  });
});
