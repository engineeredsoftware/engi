"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVCSData = void 0;
const react_1 = require("react");
const api_client_1 = require("@/networking/api-client");
/**
 * VCS data hook with issues/PRs and files support for Need measurement,
 * AssetPack synthesis evidence, and Shippable delivery mechanisms.
 */
const useVCSData = () => {
    // Add state management for the data
    const [accounts, setAccounts] = (0, react_1.useState)([]);
    const [issuesAndPRs, setIssuesAndPRs] = (0, react_1.useState)([]);
    const [files, setFiles] = (0, react_1.useState)([]);
    const [isLoadingAccounts, setIsLoadingAccounts] = (0, react_1.useState)(true);
    const [isLoadingIssues, setIsLoadingIssues] = (0, react_1.useState)(false);
    const [isLoadingFiles, setIsLoadingFiles] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    // State will be managed by the parent component
    let currentProvider = null;
    let currentAccount = null;
    let currentRepo = null;
    let currentBranch = null;
    // Fetch accounts on mount
    (0, react_1.useEffect)(() => {
        const loadInitialAccounts = async () => {
            try {
                setIsLoadingAccounts(true);
                const data = await (0, api_client_1.fetchAccounts)();
                setAccounts(data);
            }
            catch (err) {
                // Silently handle - empty accounts is valid when not connected
                setAccounts([]);
            }
            finally {
                setIsLoadingAccounts(false);
            }
        };
        loadInitialAccounts();
    }, []);
    const setProvider = (0, react_1.useCallback)((provider) => {
        currentProvider = provider;
    }, []);
    const loadAccounts = (0, react_1.useCallback)(async (provider) => {
        // No-op - handled by useVCSSelections
    }, []);
    const loadRepositories = (0, react_1.useCallback)(async (provider, owner) => {
        currentAccount = owner;
    }, []);
    const loadBranches = (0, react_1.useCallback)(async (provider, owner, repo) => {
        currentRepo = repo;
    }, []);
    const loadCommits = (0, react_1.useCallback)(async (provider, owner, repo, branch) => {
        currentBranch = branch;
    }, []);
    const loadIssuesAndPRs = (0, react_1.useCallback)(async (provider, owner, repo) => {
        if (!owner || !repo)
            return;
        setIsLoadingIssues(true);
        setError(null);
        try {
            const data = await (0, api_client_1.fetchIssuesAndPRs)(owner, repo);
            setIssuesAndPRs(data);
        }
        catch (err) {
            // Silently handle - empty issues is valid when not connected
            setIssuesAndPRs([]);
        }
        finally {
            setIsLoadingIssues(false);
        }
    }, []);
    const loadFiles = (0, react_1.useCallback)(async (provider, owner, repo, path = '') => {
        if (!owner || !repo)
            return;
        setIsLoadingFiles(true);
        setError(null);
        try {
            const data = await (0, api_client_1.fetchFiles)(owner, repo, path);
            setFiles(data);
        }
        catch (err) {
            // Silently handle - empty files is valid
            setFiles([]);
        }
        finally {
            setIsLoadingFiles(false);
        }
    }, []);
    // Return VCS data interface with all fields
    return {
        provider: currentProvider,
        accounts,
        repositories: [],
        branches: [],
        commits: [],
        issuesAndPRs,
        files,
        defaultBranch: null,
        isLoadingAccounts,
        isLoadingRepos: false,
        isLoadingBranches: false,
        isLoadingCommits: false,
        isLoadingIssues,
        isLoadingFiles,
        error,
        setProvider,
        loadAccounts,
        loadRepositories,
        loadBranches,
        loadCommits,
        loadIssuesAndPRs,
        loadFiles
    };
};
exports.useVCSData = useVCSData;
