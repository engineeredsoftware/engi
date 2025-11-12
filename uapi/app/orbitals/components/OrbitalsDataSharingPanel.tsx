"use client";
// moved to orbital/data-sharing-panel

import React, { useEffect, useState } from "react";
import { AfterOnboardingOverlay } from './shared/after-onboarding-overlay';

// Re-use the existing interface from profile-step so we can share types.
export interface DataShareRepo {
  fullName: string;
  branch: string;
  commit: string;
  enabled: boolean;
  lastAnalysisAt?: string | null;
  latestAnalysisResult?: any;
  // Optional list of additional snapshots/commits for drill-down – not yet returned
  snapshots?: {
    commit: string;
    enabled: boolean;
    lastAnalysisAt?: string | null;
  }[];
}

interface DataSharingPanelProps {
  className?: string;
  /** When true, the panel is visually disabled/blurred for onboarding */
  overlayed?: boolean;
}

/**
 * Stand-alone panel that fetches the user’s data-sharing preferences and allows
 * blanket opt-in/out or granular repo-level toggles.  Styled to match the
 * Procurement / Alt-Crypto marketing aesthetic while living inside the
 * Orbital dark theme.
 */
export default function DataSharingPanel({ className = "", overlayed = false }: DataSharingPanelProps) {
  const [repos, setRepos] = useState<DataShareRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [enableAll, setEnableAll] = useState(false);
  const [updatingAll, setUpdatingAll] = useState(false);

  // Fetch on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orbitals/user/data-share");
        const json = await res.json();
        if (!cancelled && json.success && Array.isArray(json.repos)) {
          setRepos(json.repos);
          setEnableAll(json.repos.every((r: DataShareRepo) => r.enabled));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Toggle all repos
  const handleToggleAll = async () => {
    const newValue = !enableAll;
    setEnableAll(newValue);
    setUpdatingAll(true);
    setRepos((prev) => prev.map((r) => ({ ...r, enabled: newValue })));
    try {
      // Re-use legacy API behaviour by toggling each repo individually so we
      // remain backward-compatible while the backend endpoint catches up.
      await Promise.all(
        repos.map((repo) =>
          fetch("/api/orbitals/user/data-share", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "toggle",
              repoFullName: repo.fullName,
              branch: repo.branch,
              commit: repo.commit,
              enabled: newValue,
            }),
          })
        )
      );
    } catch (err) {
      // Rollback UI if request fails
      setRepos((prev) => prev.map((r) => ({ ...r, enabled: !newValue })));
      setEnableAll(!newValue);
    } finally {
      setUpdatingAll(false);
    }
  };

  const toggleRepo = async (idx: number) => {
    const repo = repos[idx];
    const newEnabled = !repo.enabled;
    // Optimistic UI – update and derive master toggle in one pass
    setRepos((prev) => {
      const updated = prev.map((r, i) => (i === idx ? { ...r, enabled: newEnabled } : r));
      setEnableAll(updated.every((r) => r.enabled));
      return updated;
    });
    try {
      await fetch("/api/orbitals/user/data-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle",
          repoFullName: repo.fullName,
          branch: repo.branch,
          commit: repo.commit,
          enabled: newEnabled,
        }),
      });
      // No additional state changes required on success – already handled
    } catch (err) {
      // Revert on failure and restore master toggle state
      setRepos((prev) => {
        const reverted = prev.map((r, i) => (i === idx ? { ...r, enabled: !newEnabled } : r));
        setEnableAll(reverted.every((r) => r.enabled));
        return reverted;
      });
    }
  };

  return (
    <AfterOnboardingOverlay disabled={overlayed} className={className}>
      <div className="relative w-full">
        <h3 className="text-lg font-heading mb-2 text-white flex items-center gap-2">
          Data Sharing
          {loading && <span className="text-sm text-slate-400">loading…</span>}
        </h3>
      <p className="text-sm text-slate-400 mb-4">
        Select repositories to opt into knowledge procurement. You can earn extra
        <span className="text-teal-300 font-semibold mx-1">$ENGI</span> by sharing
        code snapshots.
      </p>

      {/* Enable All toggle */}
      <div className="flex items-center mb-6">
        <span className="mr-3 font-medium text-slate-200">Enable All Repositories</span>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enableAll}
            onChange={handleToggleAll}
            disabled={loading || updatingAll}
          />
          <div
            className="w-11 h-6 rounded-full border border-slate-600 peer bg-slate-700 peer-checked:bg-[#F9C855] transition-colors duration-200"
          ></div>
          <span
            className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform duration-200"
          ></span>
        </label>
      </div>

      {enableAll ? (
        <div className="text-sm text-yellow-300/80 font-medium bg-yellow-300/10 border border-yellow-300/20 rounded-lg px-4 py-3">
          All current and future repositories will be shared automatically.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-700/60 bg-slate-800/40 backdrop-blur-md [mask-image:linear-gradient(black,black)]">
          <table className="min-w-full text-sm whitespace-nowrap">
            <thead className="text-slate-300 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Repository</th>
                <th className="py-3 px-4 text-left hidden laptop:table-cell">Branch</th>
                <th className="py-3 px-4 text-left hidden laptop:table-cell">Commit</th>
                <th className="py-3 px-4 text-center">Share</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo, idx) => (
                <tr
                  key={repo.fullName + repo.commit}
                  className="border-t border-slate-700/60 hover:bg-[#1A2335] group transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-200 flex items-center gap-2">
                    {repo.fullName}
                  </td>
                  <td className="py-3 px-4 hidden laptop:table-cell text-slate-300">{repo.branch}</td>
                  <td className="py-3 px-4 hidden laptop:table-cell text-slate-400 font-mono text-xs">
                    {repo.commit.slice(0, 7)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={repo.enabled}
                        onChange={() => toggleRepo(idx)}
                        disabled={loading}
                      />
                      <div className="w-9 h-5 rounded-full border border-slate-600 peer bg-slate-700 peer-checked:bg-teal-400 transition-colors" />
                      <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-4 transition-transform" />
                    </label>
                  </td>
                </tr>
              ))}
              {!loading && repos.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 px-4 text-center text-slate-400">
                    No eligible repositories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </AfterOnboardingOverlay>
  );
}
