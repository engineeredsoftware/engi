import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PreprocessToggle as ToggleButton } from '@/components/base/bitcode/execution/preprocess-toggle';

describe('ToggleButton component', () => {
  it('calls onToggle when clicked', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <ToggleButton enabled={false} onToggle={onToggle} type="multi" />
    );
    fireEvent.click(getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders multi icon for type="multi"', () => {
    const { container } = render(
      <ToggleButton enabled={false} onToggle={() => {}} type="multi" />
    );
    // Multi icon renders multiple circles and connecting path
    expect(container.querySelectorAll('circle').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector('path')).not.toBeNull();
  });

  it('renders compute icon for type="compute"', () => {
    const { container } = render(
      <ToggleButton enabled={false} onToggle={() => {}} type="compute" />
    );
    // Compute icon renders a rectangle grid
    expect(container.querySelectorAll('rect').length).toBeGreaterThanOrEqual(1);
  });
});
