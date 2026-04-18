import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBrand from '@/components/base/engi/layout/NavBrand';

describe('NavBrand', () => {
  it('renders product-surface copy for the application workspace', () => {
    render(<NavBrand surface="application" onClick={() => {}} />);

    expect(screen.getByLabelText('Bitcode logo')).toBeTruthy();
    expect(screen.getByText('Bitcode')).toBeTruthy();
    expect(screen.getByText('transactions terminal')).toBeTruthy();
  });

  it('renders beta posture outside the product workspace and remains clickable', () => {
    const onClick = jest.fn();

    render(<NavBrand surface={null} onClick={onClick} />);

    fireEvent.click(screen.getByLabelText('Bitcode logo'));

    expect(screen.getByText('GA-1')).toBeTruthy();
    expect(screen.getByText('PRC')).toBeTruthy();
    expect(onClick).toHaveBeenCalled();
  });
});
