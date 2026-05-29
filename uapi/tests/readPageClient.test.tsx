import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import ReadPageClient from "@/app/read/ReadPageClient";

const mockReplace = jest.fn();
const mockFetchPipelineExecutionHistory = jest.fn();
let mockQuery = "transactionId=read-admission-1&readingStage=request-fit";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams(mockQuery),
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
}));

jest.mock("@/app/terminal/TerminalRepositoryContextPanel", () => ({
  __esModule: true,
  default: ({
    onContextChange,
  }: {
    onContextChange: (value: unknown) => void;
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
        },
        selectedBranch: "main",
        selectedCommit: "31bbc0c5227b6b3aed5d107fd8507d35ec22970a",
        branches: [],
        commits: [],
        connectionStatus: { connected: true, valid: true },
      });
    }, [onContextChange]);
    return (
      <section aria-label="Repository source selector">
        Repository source selector
      </section>
    );
  },
}));

jest.mock("@/app/terminal/TerminalReadScenarioPanel", () => ({
  __esModule: true,
  default: () => (
    <section aria-label="Read request scenarios">
      Read request scenarios
    </section>
  ),
}));

jest.mock("@/app/terminal/TerminalDepositReadWorkbench", () => ({
  __esModule: true,
  default: ({
    admittedReadActivityId,
    routeReadingStage,
    showDemonstrationWorkbench,
  }: {
    admittedReadActivityId?: string | null;
    routeReadingStage?: string | null;
    showDemonstrationWorkbench?: boolean;
  }) => (
    <section
      aria-label="Reading workbench"
      data-admitted-read={admittedReadActivityId || ""}
      data-route-stage={routeReadingStage || ""}
      data-demonstration={showDemonstrationWorkbench ? "true" : "false"}
    >
      Reading workbench
    </section>
  ),
}));

describe("ReadPageClient", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockQuery = "transactionId=read-admission-1&readingStage=request-fit";
    mockFetchPipelineExecutionHistory.mockResolvedValue([
      {
        id: "deposit-1",
        created_at: "2026-05-28T10:00:00.000Z",
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
      {
        id: "read-admission-1",
        created_at: "2026-05-28T10:05:00.000Z",
        status: "completed",
        type: "agentic-execution:read-measurement",
        agentic_execution: {
          canonicalType: "agentic-execution:read-measurement",
          lens: "read",
          proofStatus: "read Need accepted",
          closureFocus: "read measurement + Finding Fits admission",
        },
        context: {
          source: "terminal-deposit-read-workbench",
          workbench: "read-admission",
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

  it("renders the five-step /read route with source-safe session state and live workbench ownership", async () => {
    render(<ReadPageClient />);

    expect(screen.getByTestId("route-shell-read")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Reading" }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("read-route-step-request-read"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("read-route-step-review-synthesized-need"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("read-route-step-request-fit")).toHaveAttribute(
      "data-reading-step-state",
      "current",
    );
    expect(screen.getByTestId("read-route-step-request-fit")).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByText("Source-safe read state")).toBeInTheDocument();
    expect(
      screen.getByText("ReadNeedComprehensionSynthesis"),
    ).toBeInTheDocument();
    expect(screen.getByText("ReadFitsFindingSynthesis")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByLabelText("Repository source selector"),
      ).toBeInTheDocument(),
    );
    const workbench = screen.getByLabelText("Reading workbench");
    await waitFor(() =>
      expect(workbench).toHaveAttribute(
        "data-admitted-read",
        "read-admission-1",
      ),
    );
    expect(workbench).toHaveAttribute("data-route-stage", "request-fit");
    expect(workbench).toHaveAttribute("data-demonstration", "false");
    expect(screen.getByText("Recent Reading activity")).toBeInTheDocument();
  });
});
