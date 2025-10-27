import { describe, it, expect } from 'vitest';
import { getTemperatureStatus } from '../utils/temperature';

describe('Temperature Status Logic', () => {
  it('should return Normal when temperature is -20 (minimum boundary)', () => {
    expect(getTemperatureStatus(-20)).toBe('Normal');
  });

  it('should return Normal when temperature is -16 (maximum boundary)', () => {
    expect(getTemperatureStatus(-16)).toBe('Normal');
  });

  it('should return Normal when temperature is -18 (within range)', () => {
    expect(getTemperatureStatus(-18)).toBe('Normal');
  });

  it('should return Abnormal when temperature is -15.5 (above max)', () => {
    expect(getTemperatureStatus(-15.5)).toBe('Abnormal');
  });

  it('should return Abnormal when temperature is -21 (below min)', () => {
    expect(getTemperatureStatus(-21)).toBe('Abnormal');
  });

  it('should return Abnormal when temperature is -15 (above range)', () => {
    expect(getTemperatureStatus(-15)).toBe('Abnormal');
  });

  it('should return Abnormal when temperature is -25 (far below range)', () => {
    expect(getTemperatureStatus(-25)).toBe('Abnormal');
  });

  it('should return Abnormal when temperature is 0 (positive)', () => {
    expect(getTemperatureStatus(0)).toBe('Abnormal');
  });
});
