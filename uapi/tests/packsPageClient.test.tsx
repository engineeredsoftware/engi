import React from "react";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import PacksPageClient from "@/app/packs/PacksPageClient";

const mockReplace = jest.fn();
let mockQuery = "q=rollback&type=read-need-fit-preview";

jest.mock("next/navigation", () => ({
  usePathname: () => "/packs",
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams(mockQuery),
}));

describe("PacksPageClient", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockQuery = "q=rollback&type=read-need-fit-preview";
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        ok: true,
        records: [
          {
            id: "pack-activity-1",
            type: "read-need-fit-preview",
            scope: "network",
            title: "Auth rollback proof pack",
            description: "Source-safe AssetPack preview.",
            timestamp: "2026-05-28T10:00:00.000Z",
            state: "completed",
            repository: "engineeredsoftware/ENGI",
            assetPackTitle: "Auth rollback proof pack",
            settlementState: "quote_ready",
            compensationState: "source_to_shares_preview_ready",
            deliveryState: "locked_until_settlement",
            repairState: "not_required",
            measurements: [
              {
                id: "measured-btd",
                label: "Measured btd",
                value: 42,
                unit: "BTD",
                root: null,
              },
            ],
            values: [
              { id: "btc-fee", label: "Btc fee", amount: 3200, unit: "sats" },
            ],
            proofRoots: [
              {
                id: "settlement-root",
                label: "Settlement root",
                root: "settlement-root-def",
              },
            ],
            sourceSafety: {
              sourceSafeMetadataOnly: true,
              protectedSourceVisible: false,
              unpaidAssetPackSourceVisible: false,
              rawPromptVisible: false,
              interpolatedPromptVisible: false,
              rawProviderResponseVisible: false,
              sourceSnippetVisible: false,
            },
            metadata: {},
          },
        ],
        detail: {
          id: "pack-activity-1",
          type: "read-need-fit-preview",
          title: "Auth rollback proof pack",
          description: "Source-safe AssetPack preview.",
          timestamp: "2026-05-28T10:00:00.000Z",
          sourceSafety: {
            sourceSafeMetadataOnly: true,
            protectedSourceVisible: false,
            unpaidAssetPackSourceVisible: false,
            rawPromptVisible: false,
            interpolatedPromptVisible: false,
            rawProviderResponseVisible: false,
            sourceSnippetVisible: false,
          },
          overview: {
            state: "completed",
            scope: "network",
            repository: "engineeredsoftware/ENGI",
            assetPackTitle: "Auth rollback proof pack",
          },
          measurements: [
            {
              id: "measured-btd",
              label: "Measured btd",
              value: 42,
              unit: "BTD",
              root: null,
            },
          ],
          values: [
            { id: "btc-fee", label: "Btc fee", amount: 3200, unit: "sats" },
          ],
          proofRoots: [
            {
              id: "settlement-root",
              label: "Settlement root",
              root: "settlement-root-def",
            },
          ],
          states: {
            settlement: "quote_ready",
            compensation: "source_to_shares_preview_ready",
            delivery: "locked_until_settlement",
            repair: "not_required",
          },
          telemetry: {
            sourceEventId: "pack-activity-1",
            sourceKind: "execution",
            sourceChannel: "system-surface",
          },
          metadata: {},
        },
        summary: {
          total: 1,
          types: { "read-need-fit-preview": 1 },
          states: { completed: 1 },
          repositories: ["engineeredsoftware/ENGI"],
          settlementReady: 1,
          compensationReady: 1,
          deliveryReady: 0,
          repairOpen: 0,
        },
      }),
    })) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders searchable Packs activity and source-safe detail readback", async () => {
    render(<PacksPageClient />);

    expect(screen.getByTestId("route-shell-packs")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pack activity" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getAllByText("Auth rollback proof pack").length,
      ).toBeGreaterThan(0),
    );
    expect(screen.getByText("Proof roots")).toBeInTheDocument();
    expect(screen.getByText("settlement-root-def")).toBeInTheDocument();
    expect(screen.getAllByText("quote_ready").length).toBeGreaterThan(0);
    expect(
      JSON.stringify(screen.queryByText(/protected source/i)),
    ).not.toContain("protected source body");
  });

  it("writes route query params for filters and selected detail", async () => {
    render(<PacksPageClient />);

    await waitFor(() =>
      expect(
        within(screen.getByRole("table")).getByText("Auth rollback proof pack"),
      ).toBeInTheDocument(),
    );
    fireEvent.click(
      within(screen.getByRole("table")).getByText("Auth rollback proof pack"),
    );
    expect(mockReplace).toHaveBeenCalledWith(
      "/packs?q=rollback&type=read-need-fit-preview&detailId=pack-activity-1",
      { scroll: false },
    );

    fireEvent.change(screen.getByLabelText("Activity type"), {
      target: { value: "settlement" },
    });
    expect(mockReplace).toHaveBeenCalledWith(
      "/packs?q=rollback&type=settlement",
      { scroll: false },
    );
  });
});
