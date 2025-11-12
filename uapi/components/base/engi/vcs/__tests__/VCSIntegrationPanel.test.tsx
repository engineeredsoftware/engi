import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VCSIntegrationPanel } from '../VCSIntegrationPanel';

// Mock child components
jest.mock('../VCSConnectionCard', () => ({
  VCSConnectionCard: ({ provider, onConnectionChange }: any) => (
    <div data-testid={`vcs-card-${provider}`}>
      <button 
        data-testid={`vcs-card-button-${provider}`}
        onClick={() => onConnectionChange?.(true)}
      >
        {provider} Card
      </button>
    </div>
  )
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Settings: () => <div data-testid="settings-icon" />
}));

describe('VCSIntegrationPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering providers', () => {
    test('renders all providers by default', () => {
      render(<VCSIntegrationPanel />);

      expect(screen.getByText('Version Control Integrations')).toBeInTheDocument();
      expect(screen.getByText('Connect your repositories from GitHub, GitLab, or Bitbucket')).toBeInTheDocument();
      
      expect(screen.getByTestId('vcs-card-github')).toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-gitlab')).toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-bitbucket')).toBeInTheDocument();
    });

    test('renders only GitHub when specified', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={true}
          showGitLab={false}
          showBitbucket={false}
        />
      );

      expect(screen.getByTestId('vcs-card-github')).toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-gitlab')).not.toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-bitbucket')).not.toBeInTheDocument();
    });

    test('renders only GitLab when specified', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={false}
          showGitLab={true}
          showBitbucket={false}
        />
      );

      expect(screen.queryByTestId('vcs-card-github')).not.toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-gitlab')).toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-bitbucket')).not.toBeInTheDocument();
    });

    test('renders only Bitbucket when specified', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={false}
          showGitLab={false}
          showBitbucket={true}
        />
      );

      expect(screen.queryByTestId('vcs-card-github')).not.toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-gitlab')).not.toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-bitbucket')).toBeInTheDocument();
    });

    test('renders multiple providers when specified', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={true}
          showGitLab={true}
          showBitbucket={false}
        />
      );

      expect(screen.getByTestId('vcs-card-github')).toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-gitlab')).toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-bitbucket')).not.toBeInTheDocument();
    });

    test('renders nothing when all providers are hidden', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={false}
          showGitLab={false}
          showBitbucket={false}
        />
      );

      // Should still show the header
      expect(screen.getByText('Version Control Integrations')).toBeInTheDocument();
      
      // But no provider cards
      expect(screen.queryByTestId('vcs-card-github')).not.toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-gitlab')).not.toBeInTheDocument();
      expect(screen.queryByTestId('vcs-card-bitbucket')).not.toBeInTheDocument();
    });
  });

  describe('Connection callbacks', () => {
    test('calls onConnectionChange for GitHub', () => {
      const onConnectionChange = jest.fn();
      
      render(
        <VCSIntegrationPanel onConnectionChange={onConnectionChange} />
      );

      fireEvent.click(screen.getByTestId('vcs-card-button-github'));

      expect(onConnectionChange).toHaveBeenCalledWith('github', true);
    });

    test('calls onConnectionChange for GitLab', () => {
      const onConnectionChange = jest.fn();
      
      render(
        <VCSIntegrationPanel onConnectionChange={onConnectionChange} />
      );

      fireEvent.click(screen.getByTestId('vcs-card-button-gitlab'));

      expect(onConnectionChange).toHaveBeenCalledWith('gitlab', true);
    });

    test('calls onConnectionChange for Bitbucket', () => {
      const onConnectionChange = jest.fn();
      
      render(
        <VCSIntegrationPanel onConnectionChange={onConnectionChange} />
      );

      fireEvent.click(screen.getByTestId('vcs-card-button-bitbucket'));

      expect(onConnectionChange).toHaveBeenCalledWith('bitbucket', true);
    });

    test('does not call onConnectionChange if not provided', () => {
      render(<VCSIntegrationPanel />);

      // Should not throw error
      fireEvent.click(screen.getByTestId('vcs-card-button-github'));
      fireEvent.click(screen.getByTestId('vcs-card-button-gitlab'));
      fireEvent.click(screen.getByTestId('vcs-card-button-bitbucket'));
    });
  });

  describe('Layout and styling', () => {
    test('applies correct CSS classes', () => {
      const { container } = render(<VCSIntegrationPanel />);

      const panel = container.firstChild;
      expect(panel).toHaveClass('w-full', 'max-w-4xl', 'mx-auto', 'p-6');

      const header = screen.getByText('Version Control Integrations').parentElement;
      expect(header).toHaveClass('mb-8');

      const cardsContainer = screen.getByTestId('vcs-card-github').parentElement;
      expect(cardsContainer).toHaveClass('space-y-4');
    });

    test('renders header with icon', () => {
      render(<VCSIntegrationPanel />);

      const headerContainer = screen.getByText('Version Control Integrations').parentElement;
      expect(within(headerContainer!).getByTestId('settings-icon')).toBeInTheDocument();
    });

    test('renders description text', () => {
      render(<VCSIntegrationPanel />);

      expect(screen.getByText('Connect your repositories from GitHub, GitLab, or Bitbucket')).toBeInTheDocument();
      expect(screen.getByText('Connect your repositories from GitHub, GitLab, or Bitbucket')).toHaveClass('text-muted-foreground');
    });
  });

  describe('Provider order', () => {
    test('maintains consistent provider order', () => {
      const { container } = render(<VCSIntegrationPanel />);

      const cards = container.querySelectorAll('[data-testid^="vcs-card-"]');
      expect(cards).toHaveLength(3);
      
      expect(cards[0]).toHaveAttribute('data-testid', 'vcs-card-github');
      expect(cards[1]).toHaveAttribute('data-testid', 'vcs-card-gitlab');
      expect(cards[2]).toHaveAttribute('data-testid', 'vcs-card-bitbucket');
    });
  });

  describe('Accessibility', () => {
    test('uses semantic HTML structure', () => {
      render(<VCSIntegrationPanel />);

      // Check for heading
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Version Control Integrations');

      // Check for buttons within cards
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    test('provides descriptive text for screen readers', () => {
      render(<VCSIntegrationPanel />);

      // Description should be associated with the panel
      expect(screen.getByText('Connect your repositories from GitHub, GitLab, or Bitbucket')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    test('handles rapid connection changes', async () => {
      const onConnectionChange = jest.fn();
      
      render(
        <VCSIntegrationPanel onConnectionChange={onConnectionChange} />
      );

      // Rapidly click multiple providers
      fireEvent.click(screen.getByTestId('vcs-card-button-github'));
      fireEvent.click(screen.getByTestId('vcs-card-button-gitlab'));
      fireEvent.click(screen.getByTestId('vcs-card-button-bitbucket'));

      await waitFor(() => {
        expect(onConnectionChange).toHaveBeenCalledTimes(3);
      });

      expect(onConnectionChange).toHaveBeenNthCalledWith(1, 'github', true);
      expect(onConnectionChange).toHaveBeenNthCalledWith(2, 'gitlab', true);
      expect(onConnectionChange).toHaveBeenNthCalledWith(3, 'bitbucket', true);
    });

    test('handles undefined show props gracefully', () => {
      render(
        <VCSIntegrationPanel 
          showGitHub={undefined}
          showGitLab={undefined}
          showBitbucket={undefined}
        />
      );

      // Should default to showing all
      expect(screen.getByTestId('vcs-card-github')).toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-gitlab')).toBeInTheDocument();
      expect(screen.getByTestId('vcs-card-bitbucket')).toBeInTheDocument();
    });
  });
});
