---

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
What is MCP?
Protocol building blocks
Why Apps SDK standardises on MCP
Next steps
MCP
Understand how the Model Context Protocol works with Apps SDK.
What is MCP?
The Model Context Protocol (MCP) is an open specification for connecting large language model clients to external tools and resources. An MCP server exposes tools that a model can call during a conversation, and return results given specified parameters. Other resources (metadata) can be returned along with tool results, including the inline html that we can use in the Apps SDK to render an interface.

With Apps SDK, MCP is the backbone that keeps server, model, and UI in sync. By standardising the wire format, authentication, and metadata, it lets ChatGPT reason about your app the same way it reasons about built-in tools.

Protocol building blocks
A minimal MCP server for Apps SDK implements three capabilities:

List tools – your server advertises the tools it supports, including their JSON Schema input and output contracts and optional annotations.
Call tools – when a model selects a tool to use, it sends a call_tool request with the arguments corresponding to the user intent. Your server executes the action and returns structured content the model can parse.
Return components – in addition to structured content returned by the tool, each tool (in its metadata) can optionally point to an embedded resource that represents the interface to render in the ChatGPT client.
The protocol is transport agnostic, you can host the server over Server-Sent Events or Streamable HTTP. Apps SDK supports both options, but we recommend Streamable HTTP.

Why Apps SDK standardises on MCP
Working through MCP gives you several benefits out of the box:

Discovery integration – the model consumes your tool metadata and surface descriptions the same way it does for first-party connectors, enabling natural-language discovery and launcher ranking. See Discovery for details.
Conversation awareness – structured content and component state flow through the conversation. The model can inspect the JSON result, refer to IDs in follow-up turns, or render the component again later.
Multiclient support – MCP is self-describing, so your connector works across ChatGPT web and mobile without custom client code.
Extensible auth – the specification includes protected resource metadata, OAuth 2.1 flows, and dynamic client registration so you can control access without inventing a proprietary handshake.
Next steps
If you’re new to MCP, we recommend starting with the following resources:

Model Context Protocol specification
Official SDKs: Python SDK (official; includes FastMCP module) and TypeScript
MCP Inspector for local debugging
Once you are comfortable with the MCP primitives, you can move on to the Set up your server guide for implementation details.

Next
User interaction
MCP

---
OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Tool-first thinking
Draft the tool surface area
Capture metadata for discovery
Model-side guardrails
Golden prompt rehearsal
Handoff to implementation
Define tools
Plan and define tools for your assistant.
Tool-first thinking
In Apps SDK, tools are the contract between your MCP server and the model. They describe what the connector can do, how to call it, and what data comes back. Good tool design makes discovery accurate, invocation reliable, and downstream UX predictable.

Use the checklist below to turn your use cases into well-scoped tools before you touch the SDK.

Draft the tool surface area
Start from the user journey defined in your use case research:

One job per tool – keep each tool focused on a single read or write action (“fetch_board”, “create_ticket”), rather than a kitchen-sink endpoint. This helps the model decide between alternatives.
Explicit inputs – define the shape of inputSchema now, including parameter names, data types, and enums. Document defaults and nullable fields so the model knows what is optional.
Predictable outputs – enumerate the structured fields you will return, including machine-readable identifiers that the model can reuse in follow-up calls.
If you need both read and write behavior, create separate tools so ChatGPT can respect confirmation flows for write actions.

Capture metadata for discovery
Discovery is driven almost entirely by metadata. For each tool, draft:

Name – action oriented and unique inside your connector (kanban.move_task).
Description – one or two sentences that start with “Use this when…” so the model knows exactly when to pick the tool.
Parameter annotations – describe each argument and call out safe ranges or enumerations. This context prevents malformed calls when the user prompt is ambiguous.
Global metadata – confirm you have app-level name, icon, and descriptions ready for the directory and launcher.
Later, plug these into your MCP server and iterate using the Optimize metadata workflow.

Model-side guardrails
Think through how the model should behave once a tool is linked:

Prelinked vs. link-required – if your app can work anonymously, mark tools as available without auth. Otherwise, make sure your connector enforces linking via the onboarding flow described in Authentication.
Read-only hints – set the readOnlyHint annotation for tools that cannot mutate state so ChatGPT can skip confirmation prompts when possible.
Result components – decide whether each tool should render a component, return JSON only, or both. Setting _meta["openai/outputTemplate"] on the tool descriptor advertises the HTML template to ChatGPT.
Golden prompt rehearsal
Before you implement, sanity-check your tool set against the prompt list you captured earlier:

For every direct prompt, confirm you have exactly one tool that clearly addresses the request.
For indirect prompts, ensure the tool descriptions give the model enough context to select your connector instead of a built-in alternative.
For negative prompts, verify your metadata will keep the tool hidden unless the user explicitly opts in (e.g., by naming your product).
Capture any gaps or ambiguities now and adjust the plan—changing metadata before launch is much cheaper than refactoring code later.

Handoff to implementation
When you are ready to implement, compile the following into a handoff document:

Tool name, description, input schema, and expected output schema.
Whether the tool should return a component, and if so which UI component should render it.
Auth requirements, rate limits, and error handling expectations.
Test prompts that should succeed (and ones that should fail).
Bring this plan into the Set up your server guide to translate it into code with the MCP SDK of your choice.

Previous
Research use cases
Next
Design components
Define tools
OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Discovery
Entry points
User Interaction
How users find, engage with, activate and manage apps that are available in ChatGPT.
Discovery
Discovery refers to the different ways a user or the model can find out about your app and the tools it provides: natural-language prompts, directory browsing, and proactive entry points. Apps SDK leans on your tool metadata and past usage to make intelligent choices. Good discovery hygiene means your app appears when it should and stays quiet when it should not.

Named mention

When a user mentions the name of your app at the beginning of a prompt, your app will be surfaced automatically in the response. The user must specify your app name at the beginning of their prompt. If they do not, your app can also appear as a suggestion through in-conversation discovery.

In-conversation discovery

When a user sends a prompt, the model evaluates:

Conversation context – the chat history, including previous tool results, memories, and explicit tool preferences
Conversation brand mentions and citations - whether your brand is explicitly requested in the query or is surfaced as a source/citation in search results.
Tool metadata – the names, descriptions, and parameter documentation you provide in your MCP server.
User linking state – whether the user already granted access to your app, or needs to connect it before the tool can run.
You influence in-conversation discovery by:

Writing action-oriented tool descriptions (“Use this when the user wants to view their kanban board”) rather than generic copy.
Writing clear component descriptions on the resource UI template metadata.
Regularly testing your golden prompt set in ChatGPT developer mode and logging precision/recall.
If the assistant selects your tool, it handles arguments, displays confirmation if needed, and renders the component inline. If no linked tool is an obvious match, the model will default to built-in capabilities, so keep evaluating and improving your metadata.

Directory

The directory will give users a browsable surface to find apps outside of a conversation. Your listing in this directory will include:

App name and icon
Short and long descriptions
Tags or categories (where supported)
Optional onboarding instructions or screenshots
Entry points
Once a user links your app, ChatGPT can surface it through several entry points. Understanding each surface helps you design flows that feel native and discoverable.

In-conversation entry

Linked tools are always on in the model’s context. When the user writes a prompt, the assistant decides whether to call your tool based on the conversation state and metadata you supplied. Best practices:

Keep tool descriptions action oriented so the model can disambiguate similar apps.
Return structured content that references stable IDs so follow-up prompts can mutate or summarise prior results.
Provide _meta hints so the client can streamline confirmation and rendering.
When a call succeeds, the component renders inline and inherits the current theme, composer, and confirmation settings.

Launcher

The launcher (available from the + button in the composer) is a high-intent entry point where users can explicitly choose an app. Your listing should include a succinct label and icon. Consider:

Deep linking – include starter prompts or entry arguments so the user lands on the most useful tool immediately.
Context awareness – the launcher ranks apps using the current conversation as a signal, so keep metadata aligned with the scenarios you support.
Previous
MCP Server
Next
Design guidelines
User Interaction

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Overview
Choose an SDK
Describe your tools
Structure the data your tool returns
Build your component
Run locally
Expose a public endpoint
Layer in authentication and storage
Advanced
Set up your server
Create and configure an MCP server.
Overview
Your MCP server is the foundation of every Apps SDK integration. It exposes tools that the model can call, enforces authentication, and packages the structured data plus component HTML that the ChatGPT client renders inline. This guide walks through the core building blocks with examples in Python and TypeScript.

Choose an SDK
Apps SDK supports any server that implements the MCP specification, but the official SDKs are the fastest way to get started:

Python SDK (official) – great for rapid prototyping, including the official FastMCP module. See the repo at modelcontextprotocol/python-sdk. This is distinct from community “FastMCP” projects.
TypeScript SDK (official) – ideal if your stack is already Node/React. Use @modelcontextprotocol/sdk. Docs: modelcontextprotocol.io.
Install the SDK and any web framework you prefer (FastAPI or Express are common choices).

Describe your tools
Tools are the contract between ChatGPT and your backend. Define a clear machine name, human-friendly title, and JSON schema so the model knows when—and how—to call each tool. This is also where you wire up per-tool metadata, including auth hints, status strings, and component configuration.

Point to a component template

In addition to returning structured data, each tool on your MCP server should also reference an HTML UI template in its descriptor. This HTML template will be rendered in an iframe by ChatGPT.

Register the template – expose a resource whose mimeType is text/html+skybridge and whose body loads your compiled JS/CSS bundle. The resource URI (for example ui://widget/kanban-board.html) becomes the canonical ID for your component.
Link the tool to the template – inside the tool descriptor, set _meta["openai/outputTemplate"] to the same URI. Optional _meta fields let you declare whether the component can initiate tool calls or display custom status copy.
Version carefully – when you ship breaking component changes, register a new resource URI and update the tool metadata in lockstep. ChatGPT caches templates aggressively, so unique URIs (or cache-busted filenames) prevent stale assets from loading.
With the template and metadata in place, ChatGPT hydrates the iframe using the structuredContent payload from each tool response.

Full examples can be viewed on the examples repository on GitHub. Below is a minimal implementation using the node SDK:

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync } from "node:fs";

// Create an MCP server
const server = new McpServer({
  name: "kanban-server",
  version: "1.0.0"
});

// Load locally built assets (produced by your component build)
const KANBAN_JS = readFileSync("web/dist/kanban.js", "utf8");
const KANBAN_CSS = (() => {
  try {
    return readFileSync("web/dist/kanban.css", "utf8");
  } catch {
    return ""; // CSS optional
  }
})();

// UI resource (no inline data assignment; host will inject data)
server.registerResource(
  "kanban-widget",
  "ui://widget/kanban-board.html",
  {},
  async () => ({
    contents: [
      {
        uri: "ui://widget/kanban-board.html",
        mimeType: "text/html+skybridge",
        text: `
<div id="kanban-root"></div>
${KANBAN_CSS ? `<style>${KANBAN_CSS}</style>` : ""}
<script type="module">${KANBAN_JS}</script>
        `.trim(),
        _meta: {
          /* 
            Renders the widget within a rounded border and shadow. 
            Otherwise, the HTML is rendered full-bleed in the conversation
          */
          "openai/widgetPrefersBorder": true,
          
          /* 
            Assigns a subdomain for the HTML. 
            When set, the HTML is rendered within `chatgpt-com.web-sandbox.oaiusercontent.com`
            It's also used to configure the base url for external links.
          */
          "openai/widgetDomain": 'https://chatgpt.com',

          /*
            Required to make external network requests from the HTML code. 
            Also used to validate `openai.openExternal()` requests. 
          */
          'openai/widgetCSP': {
              // Maps to `connect-src` rule in the iframe CSP
              connect_domains: ['https://chatgpt.com'],
              // Maps to style-src, style-src-elem, img-src, font-src, media-src etc. in the iframe CSP
              resource_domains: ['https://*.oaistatic.com'],
          }
        }
      },
    ],
  })
);

server.registerTool(
  "kanban-board",
  {
    title: "Show Kanban Board",
    _meta: {
      // associate this tool with the HTML template
      "openai/outputTemplate": "ui://widget/kanban-board.html",
      // labels to display in ChatGPT when the tool is called
      "openai/toolInvocation/invoking": "Displaying the board",
      "openai/toolInvocation/invoked": "Displayed the board"
    },
    inputSchema: { tasks: z.string() }
  },
  async () => {
    return {
      content: [{ type: "text", text: "Displayed the kanban board!" }],
      structuredContent: {}
    };
  }
);

Structure the data your tool returns
Each tool result in the tool response can include three sibling fields that shape how ChatGPT and your component consume the payload:

structuredContent – structured data that is used to hydrate your component, e.g. the tracks for a playlist, the homes for a realtor app, the tasks for a kanban app. ChatGPT injects this object into your iframe as window.openai.toolOutput, so keep it scoped to the data your UI needs. The model reads these values and may narrate or summarize them.
content – Optional free-form text (Markdown or plain strings) that the model receives verbatim.
_meta – Arbitrary JSON passed only to the component. Use it for data that should not influence the model’s reasoning, like the full set of locations that backs a dropdown. _meta is never shown to the model.
Your component receives all three fields, but only structuredContent and content are visible to the model. If you are looking to control the text underneath the component, please use widgetDescription.

Continuing the Kanban example, fetch board data and return the trio of fields so the component hydrates without exposing extra context to the model:

async function loadKanbanBoard() {
  const tasks = [
    { id: "task-1", title: "Design empty states", assignee: "Ada", status: "todo" },
    { id: "task-2", title: "Wireframe admin panel", assignee: "Grace", status: "in-progress" },
    { id: "task-3", title: "QA onboarding flow", assignee: "Lin", status: "done" }
  ];

  return {
    columns: [
      { id: "todo", title: "To do", tasks: tasks.filter((task) => task.status === "todo") },
      { id: "in-progress", title: "In progress", tasks: tasks.filter((task) => task.status === "in-progress") },
      { id: "done", title: "Done", tasks: tasks.filter((task) => task.status === "done") }
    ],
    tasksById: Object.fromEntries(tasks.map((task) => [task.id, task])),
    lastSyncedAt: new Date().toISOString()
  };
}

server.registerTool(
  "kanban-board",
  {
    title: "Show Kanban Board",
    _meta: {
      "openai/outputTemplate": "ui://widget/kanban-board.html",
      "openai/toolInvocation/invoking": "Displaying the board",
      "openai/toolInvocation/invoked": "Displayed the board"
    },
    inputSchema: { tasks: z.string() }
  },
  async () => {
    const board = await loadKanbanBoard();

    return {
      structuredContent: {
        columns: board.columns.map((column) => ({
          id: column.id,
          title: column.title,
          tasks: column.tasks.slice(0, 5) // keep payload concise for the model
        }))
      },
      content: [{ type: "text", text: "Here's your latest board. Drag cards in the component to update status." }],
      _meta: {
        tasksById: board.tasksById, // full task map for the component only
        lastSyncedAt: board.lastSyncedAt
      }
    };
  }
);
Build your component
Now that you have the MCP server scaffold set up, follow the instructions on the Build a custom UX page to build your component experience.

Run locally
Build your component bundle (See instructions on the Build a custom UX page page).
Start the MCP server.
Point MCP Inspector to http://localhost:<port>/mcp, list tools, and call them.
Inspector validates that your response includes both structured content and component metadata and renders the component inline.

Expose a public endpoint
ChatGPT requires HTTPS. During development, you can use a tunnelling service such as ngrok.

In a separate terminal window, run:

ngrok http <port>
# Forwarding: https://<subdomain>.ngrok.app -> http://127.0.0.1:<port>
Use the resulting URL when creating a connector in developer mode. For production, deploy to an HTTPS endpoint with low cold-start latency (see Deploy your app).

Layer in authentication and storage
Once the server handles anonymous traffic, decide whether you need user identity or persistence. The Authentication and Manage state guides show how to add OAuth 2.1 flows, token verification, and user state management.

With these pieces in place you have a functioning MCP server ready to pair with a component bundle.

Advanced
Allow component-initiated tool access

To allow component‑initiated tool access, you should mark tools with _meta.openai/widgetAccessible: true:

"_meta": { 
  "openai/outputTemplate": "ui://widget/kanban-board.html",
  "openai/widgetAccessible": true 
}
Define component content security policies

Widgets are required to have a strict content security policy (CSP) prior to broad distribution within ChatGPT. As part of the MCP review process, a snapshotted CSP will be inspected.

To declare a CSP, your component resource should include the openai/widgetCSP meta property.

server.registerResource(
  "html",
  "ui://widget/widget.html",
  {},
  async (req) => ({
    contents: [
      {
        uri: "ui://widget/widget.html",
        mimeType: "text/html",
        text: `
<div id="kitchen-sink-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/kitchen-sink-2d2b.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/kitchen-sink-2d2b.js"></script>
        `.trim(),
        _meta: {
          "openai/widgetCSP": {
            connect_domains: [],
            resource_domains: ["https://persistent.oaistatic.com"],
          }
        },
      },
    ],
  })
);
The CSP should define two arrays of URLs: connect_domains and resource_domains. These URLs ultimately map to the following CSP definition:

`script-src 'self' ${resources}`,
`img-src 'self' data: ${resources}`,
`font-src 'self' ${resources}`,
`connect-src 'self' ${connects}`,
Configure component subdomains

Components also support a configurable subdomain. If you have public API keys (for example Google Maps) and need to restrict access to specific origins or referrers, you can set a subdomain to render the component under.

By default, all components are rendered on https://web-sandbox.oaiusercontent.com.

"openai/widgetDomain": "https://chatgpt.com"
Since we can’t support dynamic dual-level subdomains, we convert the origin chatgpt.com to chatgpt-com so the final component domain is https://chatgpt-com.web-sandbox.oaiusercontent.com.

We can promise that these domains will be unique to each partner.

Note that we still will not permit the storage or access to browser cookies, even with dedicated subdomains.

Configuring a component domain also enables the ChatGPT punchout button in the desktop fullscreen view.

Configure status strings on tool calls

You can also provide short, localized status strings during and after invocation for better UX:

"_meta": {
  "openai/outputTemplate": "ui://widget/kanban-board.html",
  "openai/toolInvocation/invoking": "Organizing tasks…",
  "openai/toolInvocation/invoked": "Board refreshed."
}
Serve localized content

ChatGPT surfaces your connector to a global audience, and the client will advertise the user’s preferred locale during the MCP initialize handshake. Locale tags follow IETF BCP 47 (for example en-US, fr-FR, es-419). When a server does not echo a supported locale, ChatGPT still renders the connector but informs the user that localization is unavailable. Newer clients set _meta["openai/locale"]; older builds may still send _meta["webplus/i18n"] for backward compatibility.

During initialize the client includes the requested locale in _meta["openai/locale"]:

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {},
      "elicitation": {}
    },
    "_meta": {
      "openai/locale": "en-GB"
    },
    "clientInfo": {
      "name": "ChatGPT",
      "title": "ChatGPT",
      "version": "1.0.0"
    }
  }
}
Servers that support localization should negotiate the closest match using RFC 4647 lookup rules and respond with the locale they will serve. Echo _meta["openai/locale"] with the resolved tag so the client can display accurate UI messaging:

"_meta": {
  "openai/outputTemplate": "ui://widget/kanban-board.html",
  "openai/locale": "en"
}
Every subsequent MCP request from ChatGPT repeats the requested locale in _meta["openai/locale"] (or _meta["webplus/i18n"] on older builds). Include the same metadata key on your responses so the client knows which translation the user received. If a locale is unsupported, fall back to the nearest match (for example respond with es when the request is es-419) and translate only the strings you manage on the server side. Cached structured data, component props, and prompt templates should all respect the resolved locale.

Inside your handlers, persist the resolved locale along with the session or request context. Use it when formatting numbers, dates, currency, and any natural-language responses returned in structuredContent or component props. Testing with MCP Inspector plus varied _meta values helps verify that your locale-switching logic runs end to end.

Inspect client context hints

Operation-phase requests can include extra hints under _meta.openai/* so servers can fine-tune responses without new protocol fields. ChatGPT currently forwards:

_meta["openai/userAgent"] – string identifying the client (for example ChatGPT/1.2025.012)
_meta["openai/userLocation"] – coarse location object hinting at country, region, city, timezone, and approximate coordinates
Treat these values as advisory only; never rely on them for authorization. They are primarily useful for tailoring formatting, regional content, or analytics. When logged, store them alongside the resolved locale and sanitize before sharing outside the service perimeter. Clients may omit either field at any time.

Add component descriptions

Component descriptions will be displayed to the model when a client renders a tool’s component. It will help the model understand what is being displayed to help avoid the model from returning redundant content in its response. Developers should avoid trying to steer the model’s response in the tool payload directly because not all clients of an MCP render tool components. This metadata lets rich-UI clients steer just those experiences while remaining backward compatible elsewhere.

To use this field, set openai/widgetDescription on the resource template inside of your MCP server. Examples below:

Note: You must refresh actions on your MCP in dev mode for your description to take effect. It can only be reloaded this way.

server.registerResource("html", "ui://widget/widget.html", {}, async () => ({
  contents: [
    {
      uri: "ui://widget/widget.html",
      mimeType: "text/html",
      text: componentHtml,
      _meta: {
        "openai/widgetDescription": "Renders an interactive UI showcasing the zoo animals returned by get_zoo_animals.",
      },
    },
  ],
}));

server.registerTool(
  "get_zoo_animals",
  {
    title: "get_zoo_animals",
    description: "Lists zoo animals and facts about them",
    inputSchema: { count: z.number().int().min(1).max(20).optional() },
    annotations: {
      readOnlyHint: true,
    },
    _meta: {
      "openai/outputTemplate": "ui://widget/widget.html",
    },
  },
  async ({ count = 10 }, _extra) => {
    const animals = generateZooAnimals(count);
    return {
      content: [],
      structuredContent: { animals },
    };
  }
);
Next
Build a custom UX
Set up your server

----

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Authenticate your users
Custom auth with OAuth 2.1
Testing and rollout
Client identification
Per‑tool authentication with securitySchemes
Authentication
Authentication patterns for Apps SDK apps.
Authenticate your users
Many Apps SDK apps can operate in a read-only, anonymous mode, but anything that exposes customer-specific data or write actions should authenticate users.

You can integrate with your own authorization server when you need to connect to an existing backend or share data between users.

Custom auth with OAuth 2.1
When you need to talk to an external system—CRM records, proprietary APIs, shared datasets—you can integrate a full OAuth 2.1 flow that conforms to the MCP authorization spec.

Components

Resource server – your MCP server, which exposes tools and verifies access tokens on each request.
Authorization server – your identity provider (Auth0, Okta, Cognito, or a custom implementation) that issues tokens and publishes discovery metadata.
Client – ChatGPT acting on behalf of the user. It supports dynamic client registration and PKCE.
Required endpoints

Your authorization server must expose the discovery metadata described in the MCP authorization spec so the ChatGPT client can locate the OAuth endpoints at runtime:

Authorization server metadata discovery spells out the required discovery document (authorization, token, registration, JWKs, etc.).
Authorization server location defines where that document must be hosted and how the client resolves it from your protected resource metadata.
Flow in practice

ChatGPT queries your MCP server for protected resource metadata. You can configure this with AuthSettings in the official Python SDK’s FastMCP module.
ChatGPT registers itself with your authorization server using the registration_endpoint and obtains a client_id.
When the user first invokes a tool, the ChatGPT client launches the OAuth authorization code + PKCE flow. The user authenticates and consents to the requested scopes.
ChatGPT exchanges the authorization code for an access token and attaches it to subsequent MCP requests (Authorization: Bearer <token>).
Your server verifies the token on each request (issuer, audience, expiration, scopes) before executing the tool.
Client identification roadmap

A frequent question is how your MCP server can confirm that a request actually comes from ChatGPT. Today the MCP spec relies on dynamic client registration (DCR): ChatGPT registers a new OAuth client when it connects, exchanges that client_id during token issuance, and your authorization server uses the resulting record to identify the caller. This satisfies the current spec, but providers such as Auth0 or Okta may end up managing thousands of short-lived clients—sometimes one per user session—which strains dashboards and complicates lifecycle management.

To provide a durable identity signal, the MCP council is advancing Client Metadata Documents (CMID). Instead of provisioning per-session clients, ChatGPT will publish a document such as https://openai.com/chatgpt.json describing its OAuth configuration. Your authorization server can fetch that document over HTTPS, treat it as a stable client identifier, and enforce policies (allowed redirect URIs, scopes, rate limits) while also verifying that the caller is OpenAI.

CMID remains in draft, so continue supporting today’s dynamic registration model until the specification freezes and production-grade implementations are broadly available.

Implementing verification

The official Python SDK’s FastMCP module ships with helpers for token verification. A simplified example:

File: server.py

from mcp.server.fastmcp import FastMCP
from mcp.server.auth.settings import AuthSettings
from mcp.server.auth.provider import TokenVerifier, AccessToken

class MyVerifier(TokenVerifier):
    async def verify_token(self, token: str) -> AccessToken | None:
        payload = validate_jwt(token, jwks_url)
        if "user" not in payload.get("permissions", []):
            return None
        return AccessToken(
            token=token,
            client_id=payload["azp"],
            subject=payload["sub"],
            scopes=payload.get("permissions", []),
            claims=payload,
        )

mcp = FastMCP(
    name="kanban-mcp",
    stateless_http=True,
    token_verifier=MyVerifier(),
    auth=AuthSettings(
        issuer_url="https://your-tenant.us.auth0.com",
        resource_server_url="https://example.com/mcp",
        required_scopes=["user"],
    ),
)
If verification fails, respond with 401 Unauthorized and a WWW-Authenticate header that points back to your protected-resource metadata. This tells the client to run the OAuth flow again.

Choosing an authorization provider

Auth0 is a popular option and supports dynamic client registration, RBAC, and token introspection out of the box. To configure it:

Create an API in the Auth0 dashboard and record the identifier (used as the token audience).
Enable RBAC and add permissions (for example user) so they are embedded in the access token.
Turn on OIDC dynamic application registration so ChatGPT can create a client per connector.
Ensure at least one login connection is enabled for dynamically created clients so users can sign in.
Okta, Azure AD, and custom OAuth 2.1 servers can follow the same pattern as long as they expose the required metadata.

Testing and rollout
Local testing – start with a development tenant that issues short-lived tokens so you can iterate quickly.
Dogfood – once authentication works, gate access to trusted testers before rolling out broadly. You can require linking for specific tools or the entire connector.
Rotation – plan for token revocation, refresh, and scope changes. Your server should treat missing or stale tokens as unauthenticated and return a helpful error message.
With authentication in place you can confidently expose user-specific data and write actions to ChatGPT users.

Client identification
If your MCP server is authenticated, then a user login is always required. ChatGPT does not support machine-to-machine OAuth flows such as client credentials, service accounts, or JWT bearer assertions. The client cannot present custom API keys, sign mutual TLS handshakes, or operate without an interactive user session. Requests to your MCP server always originate from a ChatGPT user session and should be treated accordingly.

If you need to ensure that only ChatGPT can reach a server-to-server endpoint, rely on network-level controls rather than new credential types. Today the supported option is to allowlist ChatGPT’s egress IP addresses, which match the ranges already published for ChatGPT actions.

Once rolled out, CMID directly addresses the client identification problem by giving you a signed, HTTPS-hosted declaration of ChatGPT’s identity. CMID eliminates the churn of dynamic registration, clarifies “which service is this?”, and gives you a consistent way to recognize ChatGPT traffic.

Per‑tool authentication with securitySchemes
Different tools often have different access requirements. Listing tools without auth improves discovery and developer ergonomics, but you should enforce authentication at call time for any tool that needs it. Declaring the requirement in metadata helps clients guide the user, while your server remains the source of truth for enforcement.

Our recommendation is to:

Keep your server discoverable (no auth required for listing)
Enforce auth per tool call
Scope and semantics:

Supported scheme types (initial):
“noauth” — callable anonymously
“oauth2” — requires OAuth 2.0; optional scopes
Missing field: inherit the server default policy
Both “noauth” and “oauth2”: anonymous works, but authenticating in will unlock more behavior
Servers must enforce regardless of client hints
You should declare auth requirements in the first-class securitySchemes field on each tool. Clients use this to guide users; your server must still validate tokens/scopes on every invocation.

Example (public + optional auth) – TypeScript SDK

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

declare const server: McpServer;

server.registerTool(
  "search",
  {
    title: "Public Search",
    description: "Search public documents.",
    inputSchema: {
      type: "object",
      properties: { q: { type: "string" } },
      required: ["q"],
    },
    securitySchemes: [
      { type: "noauth" },
      { type: "oauth2", scopes: ["search.read"] },
    ],
  },
  async ({ input }) => {
    return {
      content: [{ type: "text", text: `Results for ${input.q}` }],
      structuredContent: {},
    };
  }
);
Example (auth required) – TypeScript SDK

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

declare const server: McpServer;

server.registerTool(
  "create_doc",
  {
    title: "Create Document",
    description: "Make a new doc in your account.",
    inputSchema: {
      type: "object",
      properties: { title: { type: "string" } },
      required: ["title"],
    },
    securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
  },
  async ({ input }) => {
    return {
      content: [{ type: "text", text: `Created doc: ${input.title}` }],
      structuredContent: {},
    };
  }
);
Previous
Build a custom UX
Next
Manage state
Authentication

--- 


OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Managing State in ChatGPT Apps
Overview
How UI Components Live Inside ChatGPT
1. Business State (Authoritative)
2. UI State (Ephemeral)
3. Cross-session state
Bring your own backend
Summary
Managing State
How to manage business data, UI state, and cross-session state in ChatGPT apps using the Apps SDK and an MCP server.
Managing State in ChatGPT Apps
This guide explains how to manage state for custom UI components rendered inside ChatGPT when building an app using the Apps SDK and an MCP server. You’ll learn how to decide where each piece of state belongs and how to persist it across renders and conversations.

Overview
State in a ChatGPT app falls into three categories:

State type	Owned by	Lifetime	Examples
Business data (authoritative)	MCP server or backend service	Long-lived	Tasks, tickets, documents
UI state (ephemeral)	The widget instance inside ChatGPT	Only for the active widget	Selected row, expanded panel, sort order
Cross-session state (durable)	Your backend or storage	Cross-session and cross-conversation	Saved filters, view mode, workspace selection
Place every piece of state where it belongs so the UI stays consistent and the chat matches the expected intent.

How UI Components Live Inside ChatGPT
When your app returns a custom UI component, ChatGPT renders that component inside a widget that is tied to a specific message in the conversation. The widget persists as long as that message exists in the thread.

Key behavior:

Widgets are message-scoped: Every response that returns a widget creates a fresh instance with its own UI state.
UI state sticks with the widget: When you reopen or refresh the same message, the widget restores its saved state (selected row, expanded panel, etc.).
Server data drives the truth: The widget only sees updated business data when a tool call completes, and then it reapplies its local UI state on top of that snapshot.
Mental model

The widget’s UI and data layers work together like this:

Server (MCP or backend)
│
├── Authoritative business data (source of truth)
│
▼
ChatGPT Widget
│
├── Ephemeral UI state (visual behavior)
│
└── Rendered view = authoritative data + UI state
This separation keeps UI interaction smooth while ensuring data correctness.

1. Business State (Authoritative)
Business data is the source of truth.
It should live on your MCP server or backend, not inside the widget.

When the user takes an action:

The UI calls a server tool.
The server updates data.
The server returns the new authoritative snapshot.
The widget re-renders using that snapshot.
This prevents divergence between UI and server.

Example: Returning authoritative state from an MCP server (Node.js)

import { Server } from "@modelcontextprotocol/sdk/server";
import { jsonSchema } from "@modelcontextprotocol/sdk/schema";

const tasks = new Map(); // replace with your DB or external service
let nextId = 1;

const server = new Server({
  tools: {
    get_tasks: {
      description: "Return all tasks",
      inputSchema: jsonSchema.object({}),
      async run() {
        return {
          structuredContent: {
            type: "taskList",
            tasks: Array.from(tasks.values()),
          }
        };
      }
    },
    add_task: {
      description: "Add a new task",
      inputSchema: jsonSchema.object({ title: jsonSchema.string() }),
      async run({ title }) {
        const id = `task-${nextId++}`; // simple example id
        tasks.set(id, { id, title, done: false });

        // Always return updated authoritative state
        return this.tools.get_tasks.run({});
      }
    }
  }
});

server.start();
2. UI State (Ephemeral)
UI state describes how data is being viewed, not the data itself.

Widgets do not automatically re-sync UI state when new server data arrives. Instead, the widget keeps its UI state and re-applies it when authoritative data is refreshed.

Store UI state inside the widget instance using:

window.openai.getWidgetState(widgetId)
window.openai.setWidgetState(widgetId, state)
Example (React component)

import { useEffect, useState } from "react";

export function TaskList({ data, widgetId }) {
  const [uiState, setUiState] = useState({ selectedId: null });

  useEffect(() => {
    window.openai.getWidgetState(widgetId).then((saved) => {
      if (saved) setUiState(saved);
    });
  }, [widgetId]);

  const selectTask = (id) => {
    const next = { ...uiState, selectedId: id };
    setUiState(next);
    window.openai.setWidgetState(widgetId, next);
  };

  return (
    <ul>
      {data.tasks.map(task => (
        <li
          key={task.id}
          style={{ fontWeight: uiState.selectedId === task.id ? "bold" : "normal" }}
          onClick={() => selectTask(task.id)}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
3. Cross-session state
Preferences that must persist across conversations, devices, or sessions should be stored in your backend.

Apps SDK handles conversation state automatically, but most real-world apps also need durable storage. You might cache fetched data, keep track of user preferences, or persist artifacts created inside a component. Choosing to add a storage layer adds additional capabilities, but also complexity.

Bring your own backend
If you already run an API or need multi-user collaboration, integrate with your existing storage layer. In this model:

Authenticate the user via OAuth (see Authentication) so you can map ChatGPT identities to your internal accounts.
Use your backend’s APIs to fetch and mutate data. Keep latency low; users expect components to render in a few hundred milliseconds.
Return sufficient structured content so the model can understand the data even if the component fails to load.
When you roll your own storage, plan for:

Data residency and compliance – ensure you have agreements in place before transferring PII or regulated data.
Rate limits – protect your APIs against bursty traffic from model retries or multiple active components.
Versioning – include schema versions in stored objects so you can migrate them without breaking existing conversations.
Example: Widget invokes a tool

import { useState } from "react";

export function PreferencesForm({ widgetId, userId, initialPreferences }) {
  const [formState, setFormState] = useState(initialPreferences);
  const [isSaving, setIsSaving] = useState(false);

  async function savePreferences(next) {
    setIsSaving(true);
    setFormState(next);
    window.openai.setWidgetState(widgetId, next);

    const result = await window.openai.callTool("set_preferences", {
      userId,
      preferences: next,
    });

    const updated = result?.structuredContent?.preferences ?? next;
    setFormState(updated);
    window.openai.setWidgetState(widgetId, updated);
    setIsSaving(false);
  }

  return (
    <form>
      {/* form fields bound to formState */}
      <button type="button" disabled={isSaving} onClick={() => savePreferences(formState)}>
        {isSaving ? "Saving…" : "Save preferences"}
      </button>
    </form>
  );
}
Example: Server handles the tool (Node.js)

import { Server } from "@modelcontextprotocol/sdk/server";
import { jsonSchema } from "@modelcontextprotocol/sdk/schema";
import { request } from "undici";

// Helpers that call your existing backend API
async function readPreferences(userId) {
  const response = await request(`https://api.example.com/users/${userId}/preferences`, {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  if (response.statusCode === 404) return {};
  if (response.statusCode >= 400) throw new Error("Failed to load preferences");
  return await response.body.json();
}

async function writePreferences(userId, preferences) {
  const response = await request(`https://api.example.com/users/${userId}/preferences`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preferences)
  });
  if (response.statusCode >= 400) throw new Error("Failed to save preferences");
  return await response.body.json();
}

const server = new Server({
  tools: {
    get_preferences: {
      inputSchema: jsonSchema.object({ userId: jsonSchema.string() }),
      async run({ userId }) {
        const preferences = await readPreferences(userId);
        return { structuredContent: { type: "preferences", preferences } };
      }
    },
    set_preferences: {
      inputSchema: jsonSchema.object({
        userId: jsonSchema.string(),
        preferences: jsonSchema.object({})
      }),
      async run({ userId, preferences }) {
        const updated = await writePreferences(userId, preferences);
        return { structuredContent: { type: "preferences", preferences: updated } };
      }
    }
  }
});
Summary
Store business data on the server.
Store UI state inside the widget using getWidgetState and setWidgetState.
Store cross-session state in backend storage you control.
Widget state persists only for the widget instance belonging to a specific message.
Avoid using localStorage for core state.
Previous
Authenticate users
Next
Examples
Managing State


---

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Why metadata matters
Gather a golden prompt set
Draft metadata that guides the model
Evaluate in developer mode
Iterate methodically
Production monitoring
Optimize Metadata
Improve discovery and behavior with rich metadata.
Why metadata matters
ChatGPT decides when to call your connector based on the metadata you provide. Well-crafted names, descriptions, and parameter docs increase recall on relevant prompts and reduce accidental activations. Treat metadata like product copy—it needs iteration, testing, and analytics.

Gather a golden prompt set
Before you tune metadata, assemble a labelled dataset:

Direct prompts – users explicitly name your product or data source.
Indirect prompts – users describe the outcome they want without naming your tool.
Negative prompts – cases where built-in tools or other connectors should handle the request.
Document the expected behaviour for each prompt (call your tool, do nothing, or use an alternative). You will reuse this set during regression testing.

Draft metadata that guides the model
For each tool:

Name – pair the domain with the action (calendar.create_event).
Description – start with “Use this when…” and call out disallowed cases (“Do not use for reminders”).
Parameter docs – describe each argument, include examples, and use enums for constrained values.
Read-only hint – annotate readOnlyHint: true on tools that never mutate state so ChatGPT can streamline confirmation.
At the app level supply a polished description, icon, and any starter prompts or sample conversations that highlight your best use cases.

Evaluate in developer mode
Link your connector in ChatGPT developer mode.
Run through the golden prompt set and record the outcome: which tool was selected, what arguments were passed, and whether the component rendered.
For each prompt, track precision (did the right tool run?) and recall (did the tool run when it should?).
If the model picks the wrong tool, revise the descriptions to emphasise the intended scenario or narrow the tool’s scope.

Iterate methodically
Change one metadata field at a time so you can attribute improvements.
Keep a log of revisions with timestamps and test results.
Share diffs with reviewers to catch ambiguous copy before you deploy it.
After each revision, repeat the evaluation. Aim for high precision on negative prompts before chasing marginal recall improvements.

Production monitoring
Once your connector is live:

Review tool-call analytics weekly. Spikes in “wrong tool” confirmations usually indicate metadata drift.
Capture user feedback and update descriptions to cover common misconceptions.
Schedule periodic prompt replays, especially after adding new tools or changing structured fields.
Treat metadata as a living asset. The more intentional you are with wording and evaluation, the easier discovery and invocation become.

Optimize Metadata

---

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Overview
App fundamentals
Safety
Privacy
Developer verification
After submission
App developer guidelines
Preview guidelines for building apps for ChatGPT.
Apps SDK is available in preview today for developers to begin building and testing their apps. We will open for app submission later this year.

Overview
The ChatGPT app ecosystem is built on trust. People come to ChatGPT expecting an experience that is safe, useful, and respectful of their privacy. Developers come to ChatGPT expecting a fair and transparent process. These developer guidelines set the policies every builder is expected to review and follow.

Before we get into the specifics, a great ChatGPT app:

Does something clearly valuable. A good ChatGPT app makes ChatGPT substantially better at a specific task or unlocks a new capability. Our design guidelines can help you evaluate good use cases.
Respects users’ privacy. Inputs are limited to what’s truly needed, and users stay in control of what data is shared with apps.
Behaves predictably. Apps do exactly what they say they’ll do—no surprises, no hidden behavior.
Is safe for a broad audience. Apps comply with OpenAI’s usage policies, handle unsafe requests responsibly, and are appropriate for all users.
Is accountable. Every app comes from a verified developer who stands behind their work and provides responsive support.
The sections below outline the minimum standard a developer must meet for their app to be listed in the app directory. Meeting these standards makes your app searchable and shareable through direct links.

To qualify for enhanced distribution opportunities—such as merchandising in the directory or proactive suggestions in conversations—apps must also meet the higher standards in our design guidelines. Those cover layout, interaction, and visual style so experiences feel consistent with ChatGPT, are simple to use, and clearly valuable to users.

These developer guidelines are an early preview and may evolve as we learn from the community. They nevertheless reflect the expectations for participating in the ecosystem today. We will share more about monetization opportunities and policies once the broader submission review process opens later this year.

App fundamentals
Purpose and originality

Apps should serve a clear purpose and reliably do what they promise. Only use intellectual property that you own or have permission to use. Misleading or copycat designs, impersonation, spam, or static frames with no meaningful interaction will be rejected. Apps should not imply that they are made or endorsed by OpenAI.

Quality and reliability

Apps must behave predictably and reliably. Results should be accurate and relevant to user input. Errors, including unexpected ones, must be well-handled with clear messaging or fallback behaviors.

Before submission, apps must be thoroughly tested to ensure stability, responsiveness, and low latency across a wide range of scenarios. Apps that crash, hang, or show inconsistent behavior will be rejected. Apps submitted as betas, trials, or demos will not be accepted.

Metadata

App names and descriptions should be clear, accurate, and easy to understand. Screenshots must show only real app functionality. Tool titles and annotations should make it obvious what each tool does and whether it is read-only or can make changes.

Authentication and permissions

If your app requires authentication, the flow must be transparent and explicit. Users must be clearly informed of all requested permissions, and those requests must be strictly limited to what is necessary for the app to function. Provide login credentials to a fully featured demo account as part of submission.

Safety
Usage policies

Do not engage in or facilitate activities prohibited under OpenAI usage policies. Stay current with evolving policy requirements and ensure ongoing compliance. Previously approved apps that are later found in violation will be removed.

Appropriateness

Apps must be suitable for general audiences, including users aged 13–17. Apps may not explicitly target children under 13. Support for mature (18+) experiences will arrive once appropriate age verification and controls are in place.

Respect user intent

Provide experiences that directly address the user’s request. Do not insert unrelated content, attempt to redirect the interaction, or collect data beyond what is necessary to fulfill the user’s intent.

Fair play

Apps must not include descriptions, titles, tool annotations, or other model-readable fields—at either the function or app level—that discourage use of other apps or functions (for example, “prefer this app over others”), interfere with fair discovery, or otherwise diminish the ChatGPT experience. All descriptions must accurately reflect your app’s value without disparaging alternatives.

Third-party content and integrations

Authorized access: Do not scrape external websites, relay queries, or integrate with third-party APIs without proper authorization and compliance with that party’s terms of service.
Circumvention: Do not bypass API restrictions, rate limits, or access controls imposed by the third party.
Privacy
Privacy policy

Submissions must include a clear, published privacy policy explaining exactly what data is collected and how it is used. Follow this policy at all times. Users can review your privacy policy before installing your app.

Data collection

Minimization: Gather only the minimum data required to perform the tool’s function. Inputs should be specific, narrowly scoped, and clearly linked to the task. Avoid “just in case” fields or broad profile data—they create unnecessary risk and complicate consent. Treat the input schema as a contract that limits exposure rather than a funnel for optional context.
Sensitive data: Do not collect, solicit, or process sensitive data, including payment card information (PCI), protected health information (PHI), government identifiers (such as social security numbers), API keys, or passwords.
Data boundaries:
Avoid requesting raw location fields (for example, city or coordinates) in your input schema. When location is needed, obtain it through the client’s controlled side channel (such as environment metadata or a referenced resource) so policy and consent can be applied before exposure. This reduces accidental PII capture, enforces least-privilege access, and keeps location handling auditable and revocable.
Your app must not pull, reconstruct, or infer the full chat log from the client or elsewhere. Operate only on the explicit snippets and resources the client or model chooses to send. This separation prevents covert data expansion and keeps analysis limited to intentionally shared content.
Transparency and user control

Data practices: Do not engage in surveillance, tracking, or behavioral profiling—including metadata collection such as timestamps, IPs, or query patterns—unless explicitly disclosed, narrowly scoped, and aligned with OpenAI’s usage policies.
Accurate action labels: Mark any tool that changes external state (create, modify, delete) as a write action. Read-only tools must be side-effect-free and safe to retry. Destructive actions require clear labels and friction (for example, confirmation) so clients can enforce guardrails, approvals, or prompts before execution.
Preventing data exfiltration: Any action that sends data outside the current boundary (for example, posting messages, sending emails, or uploading files) must be surfaced to the client as a write action so it can require user confirmation or run in preview mode. This reduces unintentional data leakage and aligns server behavior with client-side security expectations.
Developer verification
Verification

All submissions must come from verified individuals or organizations. Once the submission process opens broadly, we will provide a straightforward way to confirm your identity and affiliation with any represented business. Repeated misrepresentation, hidden behavior, or attempts to game the system will result in removal from the program.

Support contact details

Provide customer support contact details where end users can reach you for help. Keep this information accurate and up to date.

After submission
Reviews and checks

We may perform automated scans or manual reviews to understand how your app works and whether it may conflict with our policies. If your app is rejected or removed, you will receive feedback and may have the opportunity to appeal.

Maintenance and removal

Apps that are inactive, unstable, or no longer compliant may be removed. We may reject or remove any app from our services at any time and for any reason without notice, such as for legal or security concerns or policy violations.

Re-submission for changes

Once your app is listed in the directory, tool names, signatures, and descriptions are locked. To change or add tools, you must resubmit the app for review.

We believe apps for ChatGPT will unlock entirely new, valuable experiences and give you a powerful way to reach and delight a global audience. We’re excited to work together and see what you build.

App developer guidelines

---


OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
Overview
Understand the window.openai API
Scaffold the component project
Author the React component
Bundle for the iframe
Embed the component in the server response
Build a custom UX
Build custom UI components & app page.
Overview
UI components turn structured tool results into a human-friendly UI. Apps SDK components are typically React components that run inside an iframe, talk to the host via the window.openai API, and render inline with the conversation. This guide describes how to structure your component project, bundle it, and wire it up to your MCP server.

You can also check out the examples repository on GitHub.

Understand the window.openai API
window.openai is the bridge between your frontend and ChatGPT. Use this quick reference to first understand how to wire up data, state, and layout concerns before you dive into component scaffolding.

declare global {
  interface Window {
    openai: API & OpenAiGlobals;
  }

  interface WindowEventMap {
    [SET_GLOBALS_EVENT_TYPE]: SetGlobalsEvent;
  }
}

type OpenAiGlobals<
  ToolInput extends UnknownObject = UnknownObject,
  ToolOutput extends UnknownObject = UnknownObject,
  ToolResponseMetadata extends UnknownObject = UnknownObject,
  WidgetState extends UnknownObject = UnknownObject
> = {
  theme: Theme;
  userAgent: UserAgent;
  locale: string;

  // layout
  maxHeight: number;
  displayMode: DisplayMode;
  safeArea: SafeArea;

  // state
  toolInput: ToolInput;
  toolOutput: ToolOutput | null;
  toolResponseMetadata: ToolResponseMetadata | null;
  widgetState: WidgetState | null;
};

type API<WidgetState extends UnknownObject> = {
  /** Calls a tool on your MCP. Returns the full response. */
  callTool: (
    name: string,
    args: Record<string, unknown>
  ) => Promise<CallToolResponse>;

  /** Triggers a followup turn in the ChatGPT conversation */
  sendFollowUpMessage: (args: { prompt: string }) => Promise<void>;

  /** Opens an external link, redirects web page or mobile app */
  openExternal(payload: { href: string }): void;

  /** For transitioning an app from inline to fullscreen or pip */
  requestDisplayMode: (args: { mode: DisplayMode }) => Promise<{
    /**
     * The granted display mode. The host may reject the request.
     * For mobile, PiP is always coerced to fullscreen.
     */
    mode: DisplayMode;
  }>;

  setWidgetState: (state: WidgetState) => Promise<void>;
};

// Dispatched when any global changes in the host page
export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals";
export class SetGlobalsEvent extends CustomEvent<{
  globals: Partial<OpenAiGlobals>;
}> {
  readonly type = SET_GLOBALS_EVENT_TYPE;
}

export type CallTool = (
  name: string,
  args: Record<string, unknown>
) => Promise<CallToolResponse>;

export type DisplayMode = "pip" | "inline" | "fullscreen";

export type Theme = "light" | "dark";

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SafeArea = {
  insets: SafeAreaInsets;
};

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export type UserAgent = {
  device: { type: DeviceType };
  capabilities: {
    hover: boolean;
    touch: boolean;
  };
};
useOpenAiGlobal

Many Apps SDK projects wrap window.openai access in small hooks so views remain testable. This example hook listens for host openai:set_globals events and lets React components subscribe to a single global value:

export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K
): OpenAiGlobals[K] {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => window.openai[key]
  );
}
useOpenAiGlobal is an important primitive to make your app reactive to changes in display mode, theme, and “props” via subsequent tool calls.

For example, read the tool input, output, and metadata:

export function useToolInput() {
  return useOpenAiGlobal("toolInput");
}

export function useToolOutput() {
  return useOpenAiGlobal("toolOutput");
}

export function useToolResponseMetadata() {
  return useOpenAiGlobal("toolResponseMetadata");
}
Persist component state, expose context to ChatGPT

Widget state can be used for persisting data across user sessions, and exposing data to ChatGPT. Anything you pass to setWidgetState will be shown to the model, and hydrated into window.openai.widgetState

Widget state is scoped to the specific widget instance that lives on a single conversation message. When your component calls window.openai.setWidgetState(payload), the host stores that payload under that widget’s message_id/widgetId pair and rehydrates it only for that widget. The state does not travel across the whole conversation or between different widgets.

Follow-up turns keep the same widget (and therefore the same state) only when the user submits through that widget’s controls—inline follow-ups, PiP composer, or fullscreen composer. If the user types into the main chat composer, the request is treated as a new widget run with a fresh widgetId and empty widgetState.

Anything you pass to setWidgetState is sent to the model, so keep the payload focused and well under 4k tokens for performance.

Trigger server actions

window.openai.callTool lets the component directly make MCP tool calls. Use this for direct manipulations (refresh data, fetch nearby restaurants). Design tools to be idempotent where possible and return updated structured content that the model can reason over in subsequent turns.

Please note that your tool needs to be marked as able to be initiated by the component.

async function refreshPlaces(city: string) {
  await window.openai?.callTool("refresh_pizza_list", { city });
}
Send conversational follow-ups

Use window.openai.sendFollowUpMessage to insert a message into the conversation as if the user asked it.

await window.openai?.sendFollowUpMessage({
  prompt: "Draft a tasting itinerary for the pizzerias I favorited.",
});
Request alternate layouts

If the UI needs more space—like maps, tables, or embedded editors—ask the host to change the container. window.openai.requestDisplayMode negotiates inline, PiP, or fullscreen presentations.

await window.openai?.requestDisplayMode({ mode: "fullscreen" });
// Note: on mobile, PiP may be coerced to fullscreen
Use host-backed navigation

Skybridge (the sandbox runtime) mirrors the iframe’s history into ChatGPT’s UI. Use standard routing APIs—such as React Router—and the host will keep navigation controls in sync with your component.

Router setup (React Router’s BrowserRouter):

export default function PizzaListRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaListApp />}>
          <Route path="place/:placeId" element={<PizzaListApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
Programmatic navigation:

const navigate = useNavigate();

function openDetails(placeId: string) {
  navigate(`place/${placeId}`, { replace: false });
}

function closeDetails() {
  navigate("..", { replace: true });
}
Scaffold the component project
Now that you understand the window.openai API, it’s time to scaffold your component project.

As best practice, keep the component code separate from your server logic. A common layout is:

app/
  server/            # MCP server (Python or Node)
  web/               # Component bundle source
    package.json
    tsconfig.json
    src/component.tsx
    dist/component.js   # Build output
Create the project and install dependencies (Node 18+ recommended):

cd app/web
npm init -y
npm install react@^18 react-dom@^18
npm install -D typescript esbuild
If your component requires drag-and-drop, charts, or other libraries, add them now. Keep the dependency set lean to reduce bundle size.

Author the React component
Your entry file should mount a component into a root element and read initial data from window.openai.toolOutput or persisted state.

We have provided some example apps under the examples page, for example, for a “Pizza list” app, which is a list of pizza restaurants.

Explore the Pizzaz component gallery

We provide a number of example components in the Apps SDK examples. Treat them as blueprints when shaping your own UI:

Pizzaz List – ranked card list with favorites and call-to-action buttons.
Screenshot of the Pizzaz list component
Pizzaz Carousel – embla-powered horizontal scroller that demonstrates media-heavy layouts.
Screenshot of the Pizzaz carousel component
Pizzaz Map – Mapbox integration with fullscreen inspector and host state sync.
Screenshot of the Pizzaz map component
Pizzaz Album – stacked gallery view built for deep dives on a single place.
Screenshot of the Pizzaz album component
Pizzaz Video – scripted player with overlays and fullscreen controls.
Each example shows how to bundle assets, wire host APIs, and structure state for real conversations. Copy the one closest to your use case and adapt the data layer for your tool responses.

React helper hooks

Using useOpenAiGlobal in a useWidgetState hook to keep host-persisted widget state aligned with your local React state:

export function useWidgetState<T extends WidgetState>(
  defaultState: T | (() => T)
): readonly [T, (state: SetStateAction<T>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useWebplusGlobal("widgetState") as T;

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }

    return typeof defaultState === "function"
      ? defaultState()
      : defaultState ?? null;
  });

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;

        if (newState != null) {
          window.openai.setWidgetState(newState);
        }

        return newState;
      });
    },
    [window.openai.setWidgetState]
  );

  return [widgetState, setWidgetState] as const;
}
The hooks above make it easy to read the latest tool output, layout globals, or widget state directly from React components while still delegating persistence back to ChatGPT.

Bundle for the iframe
Once you are done writing your React component, you can build it into a single JavaScript module that the server can inline:

// package.json
{
  "scripts": {
    "build": "esbuild src/component.tsx --bundle --format=esm --outfile=dist/component.js"
  }
}
Run npm run build to produce dist/component.js. If esbuild complains about missing dependencies, confirm you ran npm install in the web/ directory and that your imports match installed package names (e.g., @react-dnd/html5-backend vs react-dnd-html5-backend).

Embed the component in the server response
See the Set up your server docs for how to embed the component in your MCP server response.

Component UI templates are the recommended path for production.

During development you can rebuild the component bundle whenever your React code changes and hot-reload the server.

Previous
Set up your server
Next
Authenticate users
Build a custom UX

--

OpenAI Developers
Resources
Codex
ChatGPT
Blog

Search
⌘K

ChatGPT
>
Apps SDK
Home
Core Concepts

MCP Server
User interaction
Design guidelines
Plan

Research use cases
Define tools
Design components
Build

Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy

Deploy your app
Connect from ChatGPT
Test your integration
Guides

Optimize Metadata
Security & Privacy
Troubleshooting
Resources

Reference
App developer guidelines
How to triage issues
Server-side issues
Widget issues
Discovery and entry-point issues
Authentication problems
Deployment problems
When to escalate
Troubleshooting
Troubleshoot issues in Apps SDK apps.
How to triage issues
When something goes wrong—components failing to render, discovery missing prompts, auth loops—start by isolating which layer is responsible: server, component, or ChatGPT client. The checklist below covers the most common problems and how to resolve them.

Server-side issues
No tools listed – confirm your server is running and that you are connecting to the /mcp endpoint. If you changed ports, update the connector URL and restart MCP Inspector.
Structured content only, no component – confirm the tool response sets _meta["openai/outputTemplate"] to a registered HTML resource with mimeType: "text/html+skybridge", and that the resource loads without CSP errors.
Schema mismatch errors – ensure your Pydantic or TypeScript models match the schema advertised in outputSchema. Regenerate types after making changes.
Slow responses – components feel sluggish when tool calls take longer than a few hundred milliseconds. Profile backend calls and cache results when possible.
Widget issues
Widget fails to load – open the browser console (or MCP Inspector logs) for CSP violations or missing bundles. Make sure the HTML inlines your compiled JS and that all dependencies are bundled.
Drag-and-drop or editing doesn’t persist – verify you call window.openai.setWidgetState after each update and that you rehydrate from window.openai.widgetState on mount.
Layout problems on mobile – inspect window.openai.displayMode and window.openai.maxHeight to adjust layout. Avoid fixed heights or hover-only actions.
Discovery and entry-point issues
Tool never triggers – revisit your metadata. Rewrite descriptions with “Use this when…” phrasing, update starter prompts, and retest using your golden prompt set.
Wrong tool selected – add clarifying details to similar tools or specify disallowed scenarios in the description. Consider splitting large tools into smaller, purpose-built ones.
Launcher ranking feels off – refresh your directory metadata and ensure the app icon and descriptions match what users expect.
Authentication problems
401 errors – include a WWW-Authenticate header in the error response so ChatGPT knows to start the OAuth flow again. Double-check issuer URLs and audience claims.
Dynamic client registration fails – confirm your authorization server exposes registration_endpoint and that newly created clients have at least one login connection enabled.
Deployment problems
Ngrok tunnel times out – restart the tunnel and verify your local server is running before sharing the URL. For production, use a stable hosting provider with health checks.
Streaming breaks behind proxies – ensure your load balancer or CDN allows server-sent events or streaming HTTP responses without buffering.
When to escalate
If you have validated the points above and the issue persists:

Collect logs (server, component console, ChatGPT tool call transcript) and screenshots.
Note the prompt you issued and any confirmation dialogs.
Share the details with your OpenAI partner contact so they can reproduce the issue internally.
A crisp troubleshooting log shortens turnaround time and keeps your connector reliable for users.

Troubleshooting
