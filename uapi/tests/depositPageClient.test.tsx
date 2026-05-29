import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import DepositPageClient from "@/app/deposit/DepositPageClient";

const mockReplace = jest.fn();
const mockFetchPipelineExecutionHistory = jest.fn();
const mockUseAuth = jest.fn();
const mockUseUserData = jest.fn();
let mockQuery = "transactionId=deposit-1&depositStage=review-options";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams(mockQuery),
}));

jest.mock("@/components/base/bitcode/auth/AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock("@/hooks/useUserData", () => ({
  useUserData: () => mockUseUserData(),
}));

jest.mock("@/networking/api-client", () => ({
  fetchPipelineExecutionHistory: () => mockFetchPipelineExecutionHistory(),
}));

jest.mock("@/app/terminal/terminal-shell-bridge", () => ({
  TerminalShellBridgeProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <>{children}</>,
  useTerminalShellBridge: () => ({
    snapshot: null,
    runControl: jest.fn(),
  }),
}));

jest.mock("@/app/terminal/TerminalRepositoryContextPanel", () => ({
  __esModule: true,
  default: ({
    onContextChange,
    routePath,
  }: {
    onContextChange: (value: unknown) => void;
    routePath?: string;
  }) => {
    React.useEffect(() => {
      onContextChange({
        provider: "github",
        selectedRepository: {
          id: "repo-1",
          fullName: "engineeredsoftware/ENGI",
          defaultBranch: "main",
          private: true,
          language: "TypeScript",
          topics: [],
          owner: { username: "engineeredsoftware" },
        },
        repositories: [],
        selectedBranch: "main",
        selectedCommit: "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
        branches: [],
        commits: [],
        connectionStatus: { connected: true, valid: true },
      });
    }, [onContextChange]);
    return (
      <section
        aria-label="Repository source selector"
        data-route-path={routePath}
      >
        Repository source selector
      </section>
    );
  },
}));

jest.mock("@/app/terminal/TerminalSupplySelectionPanel", () => ({
  __esModule: true,
  default: () => (
    <section aria-label="Deposit supply selector">
      Deposit supply selector
    </section>
  ),
}));

jest.mock("@/app/terminal/TerminalDepositComposer", () => ({
  __esModule: true,
  default: ({
    showDemonstrationDraft,
  }: {
    showDemonstrationDraft?: boolean;
  }) => (
    <section
      aria-label="Deposit composer"
      data-demonstration={showDemonstrationDraft ? "true" : "false"}
    >
      Deposit composer
    </section>
  ),
}));

describe("DepositPageClient", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockQuery = "transactionId=deposit-1&depositStage=review-options";
    mockUseAuth.mockReturnValue({ user: { id: "user-1" } });
    mockUseUserData.mockReturnValue({
      data: {
        profile: {
          wallet_address: "bc1qexample",
          wallet_binding: { address: "bc1qexample" },
        },
      },
      hasGitHubConnection: true,
      hasValidGitHubConnection: true,
      hasWalletConnection: true,
      hasVerifiedWalletConnection: true,
      hasStoredVerifiedWalletConnection: true,
      walletConnectionStatus: {
        address: "bc1qexample",
        provider: "xverse",
        metadata: { authAddress: "bc1qexample-auth" },
      },
    });
    mockFetchPipelineExecutionHistory.mockResolvedValue([
      {
        id: "deposit-1",
        created_at: "2026-05-29T10:00:00.000Z",
        status: "completed",
        type: "agentic-execution:asset-pack",
        agentic_execution: {
          canonicalType: "agentic-execution:asset-pack",
          lens: "deposit",
          proofStatus: "depository proof ready",
          closureFocus: "deposit posture",
        },
        context: {
          source: "terminal-deposit-composer",
          candidateAssetId: "deposit-asset-1",
          depositorySearchDocumentRoot: "sha256:search",
          vectorDocumentRoot: "sha256:vector",
          compensationPreviewRoot: "sha256:compensation",
        },
        repo_snapshot: {
          org: "engineeredsoftware",
          repo: "ENGI",
          branch: "main",
          commit: "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
        },
        output: {},
        items: [],
      },
    ]);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders /deposit with option synthesis, source-safe state, and live deposit composer ownership", async () => {
    render(<DepositPageClient />);

    expect(screen.getByTestId("route-shell-deposit")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Depositing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("deposit-route-step-connect-source"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("deposit-route-step-synthesize-options"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("deposit-route-step-review-options"),
    ).toHaveAttribute("data-deposit-step-state", "current");
    expect(
      screen.getByTestId("deposit-route-step-review-options"),
    ).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Source-safe deposit state")).toBeInTheDocument();
    expect(
      screen.getAllByText("DepositAssetPackOptionSynthesis").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("DepositAssetPackOptionPolicy").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("DepositAssetPackOptionAdmissionReport").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("DepositorEarningSupplyIntelligence").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Supply opportunity")).toBeInTheDocument();
    expect(screen.getAllByText(/Earning estimate/u).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Unfit Need opportunities/u),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/BTC source-to-shares preview/u).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Approve for Depository/u).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/not-admitted-pending-review/u).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByTestId("deposit-option-capability-slice"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("deposit-option-implementation-pattern"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("deposit-option-proof-operations-slice"),
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByLabelText("Repository source selector"),
      ).toHaveAttribute("data-route-path", "/deposit"),
    );
    expect(
      screen.getByLabelText("Deposit supply selector"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Deposit composer")).toHaveAttribute(
      "data-demonstration",
      "false",
    );
    expect(screen.getByText("Recent Deposit activity")).toBeInTheDocument();
  });
});
