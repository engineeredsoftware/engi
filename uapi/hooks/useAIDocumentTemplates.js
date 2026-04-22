"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAIDocumentTemplates = void 0;
const react_1 = require("react");
const useAIDocumentTemplates = () => {
    const [templates, setTemplates] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const fetchTemplates = (0, react_1.useCallback)(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/templates/ai-documents');
            if (!res.ok)
                throw new Error(`Failed to load templates (${res.status})`);
            const data = await res.json();
            const grouped = {
                deliverableFeedback: [],
                knowledgeExtension: [],
                mcpConfig: [],
            };
            data.templates.forEach((t) => {
                // Normalize legacy 'mcpIntegration' to 'mcpConfig'
                const typeKey = (t.ai_document_type === 'mcpIntegration' ? 'mcpConfig' : t.ai_document_type);
                const arr = grouped[typeKey];
                if (arr)
                    arr.push({ id: t.id, name: t.name, text: t.template_text });
            });
            try {
                const stored = localStorage.getItem('bitcode-mcp-configs');
                const mcpConfig = stored ? JSON.parse(stored) : {};
                grouped.mcpConfig = grouped.mcpConfig.filter((t) => mcpConfig[t.id]);
            }
            catch { }
            setTemplates(grouped);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    (0, react_1.useEffect)(() => { fetchTemplates(); }, [fetchTemplates]);
    return { templates, isLoading, error, reload: fetchTemplates };
};
exports.useAIDocumentTemplates = useAIDocumentTemplates;
