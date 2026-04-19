import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBrand from '@/components/base/engi/layout/NavBrand';

describe('NavBrand', () => {
  it('renders product-surface copy for the application workspace', () => {
    render(<NavBrand surface="application" onClick={() => {}} />);

    expect(screen.getByLabelText('Bitcode logo')).toBeTruthy();
    expect(screen.getByText('Bitcode')).toBeTruthy();
    expect(screen.getByText('transactions')).toBeTruthy();
  });

  it('renders network copy for mounted network routes', () => {
    render(<NavBrand surface="network" onClick={() => {}} />);

    expect(screen.getByLabelText('Bitcode logo')).toBeTruthy();
    expect(screen.getByText('Bitcode')).toBeTruthy();
    expect(screen.getByText('network')).toBeTruthy();
  });

  it('renders docs copy for mounted docs routes', () => {
    render(<NavBrand surface="docs" onClick={() => {}} />);

    expect(screen.getByLabelText('Bitcode logo')).toBeTruthy();
    expect(screen.getByText('Bitcode')).toBeTruthy();
    expect(screen.getByText('docs')).toBeTruthy();
  });

  it('renders auxillaries copy for mounted auxiliary routes', () => {
    render(<NavBrand surface="auxillaries" onClick={() => {}} />);

    expect(screen.getByLabelText('Bitcode logo')).toBeTruthy();
    expect(screen.getByText('Bitcode')).toBeTruthy();
    expect(screen.getByText('auxillaries')).toBeTruthy();
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
