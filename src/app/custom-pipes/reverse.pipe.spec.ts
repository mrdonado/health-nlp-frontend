import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {

  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('reverses an array', () => {
    const pipe = new ReversePipe();
    const reversed = pipe.transform([1, 2, 3, 4, 5]);
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });
});
