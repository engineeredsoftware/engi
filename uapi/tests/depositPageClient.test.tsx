import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
    expect(screen.getByText("Disclosure boundary")).toBeInTheDocument();
    expect(
      screen.getByText(/Withheld: raw source, unpaid AssetPack source, prompts/u),
    ).toBeInTheDocument();
    expect(screen.getByText("Organization authority")).toBeInTheDocument();
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
    expect(
      screen.getByTestId("deposit-enterprise-economic-summary"),
    ).toHaveAttribute("data-enterprise-ux", "economic-summary");
    expect(screen.getByTestId("deposit-keyboard-navigation")).toHaveAttribute(
      "data-enterprise-ux",
      "keyboard-navigation",
    );
    expect(screen.getByTestId("deposit-expandable-proof-detail")).toHaveAttribute(
      "data-enterprise-ux",
      "expandable-proof-detail",
    );
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

  it("requests real option synthesis from the AssetPacksSynthesis route with exclusions", async () => {
    const realOption = {
      schema: "bitcode.deposit.asset-pack-option",
      optionId: "deposit-option-real-1-abcd1234",
      kind: "capability-slice",
      title: "Real measured capability slice",
      summary:
        "A source-safe slice describing the demo capability measured by AssetPacksSynthesis under the deposit lens.",
      sourceBinding: {
        repositoryFullName: "engineeredsoftware/ENGI",
        sourceBranch: "main",
        sourceCommit: "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
        sourcePathRoots: ["deposit-option-source-path:11111111"],
        sourcePathCount: 1,
        rawSourceStoredExternally: true,
        protectedSourceVisibleInOption: false,
      },
      demandAlignment: {
        posture: "source-safe-demand-signals-only",
        depositorySignalRoots: [],
        readingSignalRoots: [],
        existingDepositorySignalRoots: [],
        confidence: 0.8,
      },
      measurements: [
        {
          id: "deposit-option-real-1:source-coverage",
          label: "Source coverage",
          measurementKind: "source-coverage",
          weight: 0.36,
          volume: 0.62,
          evidenceRoot: "deposit-option-measurement:22222222",
        },
      ],
      reviewBoundary: {
        state: "reviewable-source-safe-option",
        decision: "pending-depositor-review",
        depositAdmissionBoundary: "not-admitted-until-depositor-approval",
        btdMintBoundary: "not-minted-by-deposit-option",
        settlementBoundary:
          "future-reader-settlement-required-for-source-bearing-assetpack",
      },
      policyBoundary: {
        sourceCriticalityPolicy: "deferred-to-gate6",
        demandRoiPolicy: "deferred-to-gate6",
        compensationPolicy: "deferred-to-gate6",
      },
      visibility: {
        sourceSafeMetadataOnly: true,
        protectedSourceVisible: false,
        rawSourceTextVisible: false,
        unpaidAssetPackSourceVisible: false,
        rawPromptVisible: false,
        interpolatedPromptVisible: false,
        rawProviderResponseVisible: false,
        walletPrivateMaterialVisible: false,
      },
      roots: {
        optionRoot: "deposit-asset-pack-option:33333333",
        sourceBindingRoot: "deposit-option-source-binding:44444444",
        demandAlignmentRoot: "deposit-option-demand-alignment:55555555",
        measurementRoot: "deposit-option-measurements:66666666",
        reviewBoundaryRoot: "deposit-option-review-boundary:77777777",
      },
    };
    const fetchMock = jest.fn(async (url: string) => {
      if (url === "/api/deposit/synthesize-options") {
        return {
          ok: true,
          json: async () => ({
            ok: true,
            executionId: "real-synthesis-execution-1",
            synthesis: {
              schema: "bitcode.deposit.asset-pack-option-synthesis",
              pipeline: "DepositAssetPackOptionSynthesis",
              requestId: "deposit-option-request:99999999",
              createdAt: "2026-06-12T22:00:00.000Z",
              request: {
                repositoryFullName: "engineeredsoftware/ENGI",
                sourceBranch: "main",
                sourceCommit: "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
                depositorInstructionRoot: null,
                sourcePathRoots: ["deposit-option-source-path:11111111"],
              },
              options: [realOption],
              optionCount: 1,
              sourceSafety: {
                sourceSafeMetadataOnly: true,
                protectedSourceVisible: false,
                rawSourceTextVisible: false,
                unpaidAssetPackSourceVisible: false,
                rawPromptVisible: false,
                interpolatedPromptVisible: false,
                rawProviderResponseVisible: false,
                walletPrivateMaterialVisible: false,
              },
              reviewBoundary: {
                route: "/deposit",
                defaultDecisionState: "pending-depositor-review",
                approvedOptionsAdmittedBy: "future-gate7-deposit-option-review",
                sourceCriticalityDemandRoiPolicyOwnedBy: "future-gate6-policy",
              },
              roots: {
                requestRoot: "deposit-option-request:99999999",
                synthesisRoot: "deposit-asset-pack-option-synthesis:88888888",
                optionRoots: ["deposit-asset-pack-option:33333333"],
              },
              synthesisMode: "real-bounded-inference",
              pipelineCore: "AssetPacksSynthesis",
              inference: {
                provider: "anthropic",
                model: "claude-haiku-4-5-20251001",
                totalTokens: 5421,
                durationMs: 18450,
              },
              exclusionPosture: {
                protectedIpExclusionCount: 1,
                exclusionRoots: ["deposit-option-ip-exclusion:aaaaaaaa"],
                excludedPathCount: 2,
                droppedCandidateCount: 0,
              },
            },
            reviewProjections: [
              {
                optionId: "deposit-option-real-1-abcd1234",
                title: "Real measured capability slice",
                coveredSourcePaths: ["src/app.py"],
                measurementRationale: "Covers the primary capability path.",
              },
            ],
            inference: {
              provider: "anthropic",
              model: "claude-haiku-4-5-20251001",
              totalTokens: 5421,
              durationMs: 18450,
            },
            exclusionViolations: [],
          }),
        };
      }
      return { ok: true, json: async () => ({}) };
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<DepositPageClient />);

    const exclusionsField = await screen.findByLabelText(
      /Protected IP exclusions/,
    );
    fireEvent.change(exclusionsField, {
      target: { value: "secret-engine/" },
    });

    const synthesizeButton = await screen.findByRole("button", {
      name: "Synthesize options",
    });
    await waitFor(() => expect(synthesizeButton).not.toBeDisabled());
    fireEvent.click(synthesizeButton);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/deposit/synthesize-options",
        expect.objectContaining({ method: "POST" }),
      ),
    );
    const synthesisCall = fetchMock.mock.calls.find(
      ([url]) => url === "/api/deposit/synthesize-options",
    );
    const body = JSON.parse(String(synthesisCall?.[1]?.body));
    expect(body.repositoryFullName).toBe("engineeredsoftware/ENGI");
    expect(body.protectedIpExclusions).toBe("secret-engine/");
    expect(Array.isArray(body.demandContext)).toBe(true);

    await waitFor(() =>
      expect(
        screen.getByText("Real measured capability slice"),
      ).toBeInTheDocument(),
    );
    expect(
      screen.getByTestId("deposit-synthesis-inference"),
    ).toHaveTextContent("AssetPacksSynthesis");
    expect(
      screen.getByTestId("deposit-synthesis-inference"),
    ).toHaveTextContent("5,421 tokens");
    expect(screen.getByText("src/app.py")).toBeInTheDocument();
  });
});
