import {} from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react-hooks';

import { errorsMessages, useAddEstimateForm } from './useAddEstimateForm';

const triggerInputEvent = ({ result, name, value }: any) => {
  const event = {
    target: { name, value },
  } as React.ChangeEvent<HTMLInputElement>;
  act(() => {
    result.current.handleInput(event);
  });
};

describe('useAddEstimateForm hook', () => {
  describe('Init', () => {
    it('should initiate with no errors', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      expect(result.current.errors).toEqual({});
    });
  });

  describe('"location" field', () => {
    const name = 'location';

    it('should add an error if value is an empty string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: '' });

      expect(result.current.errors.location).toBe(
        errorsMessages.locationRequired
      );
    });

    it('should not add an error if value is a non-empty string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: 'test' });

      expect(result.current.errors.location).toBe('');
    });
  });

  describe('"usage" field', () => {
    const name = 'usage';

    it('should add an error if value is an empty string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: '' });

      expect(result.current.errors.usage).toBe(errorsMessages.usageRequired);
    });

    it('should add an error if value is not a number', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: 'test' });

      expect(result.current.errors.usage).toBe(
        errorsMessages.usageMoreThanZero
      );
    });

    it('should add an error if value is less than one', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: '-1' });

      expect(result.current.errors.usage).toBe(
        errorsMessages.usageMoreThanZero
      );
    });

    it('should not add an error if value is more than zero string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: '2' });

      expect(result.current.errors.usage).toBe('');
    });
  });

  describe('"unit" field', () => {
    const name = 'unit';

    it('should add an error if value is an empty string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: '' });

      expect(result.current.errors.unit).toBe(errorsMessages.unitRequired);
    });

    it('should not add an error if value is a non-empty string', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name, value: 'test' });

      expect(result.current.errors.unit).toBe('');
    });
  });

  describe('Form submission', () => {
    const preventDefault = jest.fn();
    const mockSubmitHandler = jest.fn();

    beforeEach(() => {
      preventDefault.mockReset();
      mockSubmitHandler.mockReset();
    });

    it('should invalidate and not submit form if all field values are invalid', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      act(() => {
        result.current.handleSubmit(mockSubmitHandler)({
          preventDefault,
        } as any);
      });

      expect(result.current.isFormValid()).toBe('');
      expect(mockSubmitHandler).not.toBeCalled();
    });

    it('should invalidate and not submit form if some field values are invalid', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name: 'location', value: 'test' });
      triggerInputEvent({ result, name: 'usage', value: '1' });

      act(() => {
        result.current.handleSubmit(mockSubmitHandler)({
          preventDefault,
        } as any);
      });

      expect(result.current.isFormValid()).toBe('');
      expect(mockSubmitHandler).not.toBeCalled();
    });

    it('should validate and submit form if all field values are valid', () => {
      const { result } = renderHook(() => useAddEstimateForm());

      triggerInputEvent({ result, name: 'location', value: 'Argentina' });
      triggerInputEvent({ result, name: 'usage', value: '1' });
      triggerInputEvent({ result, name: 'unit', value: 'test' });

      act(() => {
        result.current.handleSubmit(mockSubmitHandler)({
          preventDefault,
        } as any);
      });

      expect(result.current.isFormValid()).toBe(true);
      expect(mockSubmitHandler).toBeCalled();
    });
  });
});
