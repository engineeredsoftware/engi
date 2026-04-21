// header of agent page including inline template selection
//
// how the template selection experience should be:
// - terms: "deliverable categories" (explicitly the words 'pull request', 'pull request review', 'issue', 'issue comment'), "non-hover" (how the paragraph looks at right ie the state of the previously-interacted-with deliverable categories selected template(s)
// - behaviors:
//  - each deliverable category is itself an interactive element that when clicked, populates some template text
//  - templates are provided and include basic/default ones (it is always possible to click)
//  - there are 2 sub-interactive elements, the word of the deliverable category is clickable to use the template that was last selected, and the element to change the selected template
//  - whenever the user is in the mode where they are changing the selected template for the deliverable category, it should show that name in the place of the deliverable category word. we should also use a placeholder in the mode the first time to make it clear that the selection experience is in progress
//  - from a UI perspective, it is imperative that these 2 interactive elements are clear easy to interact with and integrate seamlessly into what should look like effectively a partial interactive/live paragraph of text
//
"use client";

/* eslint-disable react/no-multi-comp */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
// ReactMarkdown is only needed after a run completes; code-split to keep the
// initial header bundle small. The chunk loads long before the user can see
// the summary, so there is no visible delay.
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });
import DeliverablesHeaderShinyText from "@/components/base/bitcode/deliverables-header-shiny-text";
import ExecutionsHeaderTitle from '@/app/executions/components/ExecutionsHeaderTitle';
import { ScrollContainer } from '@/components/base/bitcode/panels/ScrollContainer';
import Logo from '@/components/base/bitcode/branding/logo';
import WordRotate from "@/components/base/bitcode/word-rotate";
import GuideIndicator from "@/components/base/bitcode/execution/GuideIndicator";
import InstructionConfidenceTimer from "@/components/base/bitcode/execution/InstructionConfidenceTimer";
import type { HeaderProcessingStats } from '@/app/executions/components/ExecutionsCompleteHeaderContent';
// Load the heavy prism-based code highlighter lazily so the header bundle
// stays small until a markdown section with a <code> block is actually
// rendered.
const CodeBlock = dynamic(() => import("@/components/base/bitcode/media/syntax-highlighter"), {
  ssr: false,
});
import { ProcessingIndicator } from "@/components/base/bitcode/indicators/processing-indicator";
// global styles for the header
import "@/styles/deliverables-header.css";

// Extracted component & styles
import DeliverableTemplateText from "@/app/executions/components/ExecutionsDeliverableTemplateText";
  import { PageHeaderSection } from '@/components/base/bitcode/page-header/PageHeaderSection';
  import { CompleteHeaderContent } from '@/app/executions/components/ExecutionsCompleteHeaderContent';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

// Variants for individual lines / elements to create a smooth, staggered
// "line‑by‑line" reveal when the summary accordion first opens.
const lineItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] }
  }
} as const;

// Container variants to stagger children.
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: 'beforeChildren'
    }
  }
} as const;

const INSTRUCTION_WAIT_THRESHOLD = 0.8;
const INSTRUCTION_CONFIDENCE_MEDIUM = 0.6;
const INSTRUCTION_CONFIDENCE_LOW = 0.4;

const markdownComponents = {

  // Enhanced table styling
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-md border border-purple-500/20 bg-black/20">
      <table {...props} className="min-w-full">
        {props.children}
      </table>
    </div>
  ),
  // Enhanced code block styling with syntax highlighting
  code: ({ node, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <CodeBlock language={match[1]} className={className}>
        {children as string}
      </CodeBlock>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
  // Enhanced blockquote styling
  blockquote: ({ node, ...props }) => (
    <motion.blockquote
      variants={lineItemVariants}
      {...props}
      className="border-l-4 border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 to-transparent pl-4 py-1 my-4 italic"
    >
      {props.children}
    </motion.blockquote>
  ),
  // Enhanced image styling
  img: ({ node, ...props }) => (
    <div className="my-6 flex justify-center">
      <img
        {...props}
        className="rounded-lg shadow-glow-emerald-subtle max-w-full border border-emerald-500/20 transition-all duration-300 hover:shadow-glow-emerald"
      />
    </div>
  ),
  // Enhanced heading styling
  h1: ({ node, ...props }) => (
    <motion.h1
      variants={lineItemVariants}
      {...props}
      className="text-2xl font-bold text-emerald-300 mt-6 mb-4 pb-2 border-b border-emerald-500/20"
    >
      {props.children}
    </motion.h1>
  ),
  h2: ({ node, ...props }) => (
    <motion.h2
      variants={lineItemVariants}
      {...props}
      className="text-xl font-semibold text-emerald-300 mt-5 mb-3 pb-1 border-b border-emerald-500/10"
    >
      {props.children}
    </motion.h2>
  ),
  // Enhanced list styling
  ul: ({ node, ...props }) => (
    <motion.ul
      variants={lineItemVariants}
      {...props}
      className="pl-6 my-4 space-y-2 list-disc"
    >
      {props.children}
    </motion.ul>
  ),
  ol: ({ node, ...props }) => (
    <motion.ol
      variants={lineItemVariants}
      {...props}
      className="pl-6 my-4 space-y-2 list-decimal"
    >
      {props.children}
    </motion.ol>
  ),
  li: ({ node, ...props }) => (
    <motion.li
      variants={lineItemVariants}
      {...props}
      className="my-1"
    >
      {props.children}
    </motion.li>
  ),
  p: ({ node, ...props }) => (
    <motion.p
      variants={lineItemVariants}
      {...props}
    >
      {props.children}
    </motion.p>
  ),
}

interface Deliverable {
  url: string;
  number?: number;
  title?: string;
  description?: string;
  content?: string;
  status?: 'open' | 'closed' | 'merged' | 'draft';
  createdAt?: string;
}

interface FileChanges {
  edited: number;
  created: number;
  deleted: number;
  paths: string[];
  /** Optional character-level diff. */
  charDiff?: {
    edited: number;
    created: number;
    deleted: number;
  };
}

interface EduContent {
  title: string;
  subtitle: string;
  body: string | React.ReactNode;
}

interface DeliverableTemplate {
  id: string;
  name: string;
  text: string;
}

type ExtendedProcessingStats = HeaderProcessingStats & {
  gate?: string | null;
  phase?: string | null;
  agent?: string | null;
  iteration?: number | null;
  confidence?: number | null;
  selfInstruction?: string | null;
  suggestions?: string[];
  latestIterationTimestamp?: string | null;
  timeoutSeconds?: number | undefined;
  timeRemainingSeconds?: number | undefined;
  awaitingInstruction?: boolean | undefined;
  runId?: string;
  digest?: {
    agentsDocUpdated: boolean;
    readyToShip: boolean;
    summary?: string | null;
    questionsAnswered?: number;
    patternsDocumented?: number;
    capturedAt?: string;
  };
};

interface DeliverableTemplates {
  pullRequests: DeliverableTemplate[];
  pullRequestReviews: DeliverableTemplate[];
  issues: DeliverableTemplate[];
  comments: DeliverableTemplate[];
}

interface ExecutionPageHeaderProps {
  executionStatus: "execute" | "executing" | "executed";
  onExecuteDeliverableClickSetDefinitionOfDone: (definitionOfDone: string) => void;
  /** If false, suppresses rendering of the summary/TL;DR doc area inside the header */
  renderDocInsideHeader?: boolean;
  /** If false, suppresses rendering of the cards panel inside the header */
  renderCardsInsideHeader?: boolean;
  /** Unified postprocessed object to render under TL;DR */
  postprocessed?: any;
  showSourceEdu?: boolean;
  showAttachmentsEdu?: boolean;
  showComputeEdu?: boolean;
  showMultiAgentEdu?: boolean;
  showEnhanceEdu?: boolean;
  showSaveTemplateEdu?: boolean;
  showExecuteButtonEdu?: boolean;
  showIterationsEdu?: boolean | 'minimize' | 'maximize';
  templates?: DeliverableTemplates;
  onTemplateSelect?: (templateId: string, deliverableType: keyof DeliverableTemplates) => void;
  deliverables?: {
    pullRequest?: Deliverable | null; // why isn't this list?
    pullRequestReviews?: Deliverable[] | null;
    comments?: Deliverable[] | null;
    issues?: Deliverable[] | null;
    fileChanges?: FileChanges | null;
    summary?: string | null;
  };
  /** Processing metrics from real execution */
  processingStats?: ExtendedProcessingStats;
  /** Repository snapshot metadata */
  repoSnapshot?: { org: string; repo: string; branch: string; commit: string };
  /** Execution type to drive header visuals */
  executionType?: 'agentic-execution:branch-artifact';
}

// Define our variants for the header content
const contentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    scale: 1,
    transition: {
      height: { duration: 0.25, ease: [0.33, 1, 0.68, 1] },
      opacity: { duration: 0.2, ease: "linear" },
      scale: { duration: 0.2, ease: [0.33, 1, 0.68, 1] }
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      height: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
      opacity: { duration: 0.15 },
      scale: { duration: 0.15, ease: [0.33, 1, 0.68, 1] }
    },
  },
};

// Define text fade variants with stagger
const textFadeVariants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.05,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Child variant for staggered animations
const childVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// (lineItemVariants & staggerContainerVariants now declared near top imports)

/**
 * DeliverablesPageHeader
 * Final styling updates:
 * - Perfect corner dot alignment
 * - Clean file changes sub-columns
 * - Larger spacing for comfortable reading
 */
// Mock data for development mode - Rust Distributed Database Project
const mockDeliverables = {
  pullRequest: {
    url: "https://github.com/rustdb/distributed-db/pull/123",
    number: 123,
    title: "Implement distributed consensus protocol with Raft",
    description: "This PR implements a complete Raft consensus protocol for our distributed database system, enabling leader election, log replication, and cluster membership changes. The implementation follows the Raft paper specifications with optimizations for our specific use case.",
    status: 'open' as const,
    createdAt: "2025-04-07"
  },
  pullRequestReviews: [
    {
      url: "https://github.com/rustdb/distributed-db/pull/120#pullrequestreview-123",
      number: 120,
      title: "Review for network layer implementation",
      content: "The network layer implementation looks solid overall. I have some concerns about the error handling in the connection manager:\n\n```rust\nfn handle_connection_error(&self, err: ConnectionError) -> Result<(), NetworkError> {\n    match err {\n        ConnectionError::Timeout(duration) => {\n            // We should implement exponential backoff here instead of fixed retry\n            self.retry_connection()\n        },\n        ConnectionError::Refused => {\n            // Need to check if node is in maintenance mode before marking as down\n            self.mark_node_down(err.node_id())\n        },\n        _ => Err(NetworkError::from(err))\n    }\n}\n```\n\nConsider implementing exponential backoff for timeout handling and checking node status before marking as down.",
      status: 'open' as const,
      createdAt: "2025-04-06"
    },
    {
      url: "https://github.com/rustdb/distributed-db/pull/118#pullrequestreview-122",
      number: 118,
      title: "Review for storage engine optimizations",
      content: "The B-tree implementation looks efficient, but I'm concerned about the memory usage during large range scans. Consider implementing a cursor-based approach:\n\n```rust\npub struct BTreeCursor<K, V> {\n    tree: Arc<BTree<K, V>>,\n    current_node: NodeId,\n    position: usize,\n    _phantom: PhantomData<(K, V)>,\n}\n\nimpl<K: Ord + Clone, V: Clone> BTreeCursor<K, V> {\n    pub fn new(tree: Arc<BTree<K, V>>) -> Self {\n        let root_id = tree.root_id();\n        Self {\n            tree,\n            current_node: root_id,\n            position: 0,\n            _phantom: PhantomData,\n        }\n    }\n    \n    pub fn next(&mut self) -> Option<(K, V)> {\n        // Implementation details...\n    }\n}\n```\n\nThis would reduce memory pressure during large scans.",
      status: 'open' as const,
      createdAt: "2025-04-05"
    },
    {
      url: "https://github.com/rustdb/distributed-db/pull/116#pullrequestreview-121",
      number: 116,
      title: "Review for query optimizer",
      content: "The query optimizer could benefit from cost-based optimization rather than just rule-based. Consider tracking statistics about data distribution:\n\n```rust\npub struct ColumnStatistics {\n    distinct_values: usize,\n    min_value: Option<Value>,\n    max_value: Option<Value>,\n    null_fraction: f64,\n    histogram: Option<Histogram>,\n}\n\nimpl QueryOptimizer {\n    fn estimate_cost(&self, plan: &QueryPlan) -> Cost {\n        // Use statistics to make better join ordering decisions\n        let table_stats = self.statistics_manager.get_table_statistics(plan.table_id());\n        // Implementation details...\n    }\n}\n```\n\nThis would significantly improve query performance for complex joins.",
      status: 'open' as const,
      createdAt: "2025-04-04"
    }
  ],
  issues: [
    {
      url: "https://github.com/rustdb/distributed-db/issues/45",
      number: 45,
      title: "Performance degradation during node recovery",
      description: "When a node rejoins the cluster after failure, we're seeing significant performance degradation across the entire cluster. Metrics show increased CPU usage and memory pressure on all nodes, not just the recovering one.\n\nReproduction steps:\n1. Start a 5-node cluster\n2. Run the benchmark suite to establish baseline\n3. Forcibly terminate one node\n4. Wait 30 seconds\n5. Restart the terminated node\n6. Observe performance metrics\n\nExpected: Minimal impact on non-recovering nodes\nActual: All nodes show 30-40% performance degradation for 3-5 minutes\n\nPossible causes:\n- Log replay mechanism might be too aggressive\n- Recovery traffic might not be properly rate-limited\n- Consensus protocol might be requiring too many round-trips during recovery",
      status: 'open' as const,
      createdAt: "2025-04-07"
    },
    {
      url: "https://github.com/rustdb/distributed-db/issues/46",
      number: 46,
      title: "Feature request: Support for distributed transactions",
      description: "We need to implement distributed transactions with ACID guarantees across the cluster. This should include:\n\n1. Two-phase commit protocol implementation\n2. Transaction coordinator selection mechanism\n3. Deadlock detection and resolution\n4. Recovery mechanism for in-progress transactions after node failure\n5. Isolation level configuration (read committed, repeatable read, serializable)\n\nProposed implementation approach:\n```rust\npub struct TransactionManager {\n    coordinator: Option<NodeId>,\n    participants: HashSet<NodeId>,\n    state: TransactionState,\n    isolation_level: IsolationLevel,\n    timeout: Duration,\n}\n\nimpl TransactionManager {\n    pub async fn begin_transaction(&mut self, isolation_level: IsolationLevel) -> Result<TransactionId, TransactionError> {\n        // Implementation details...\n    }\n    \n    pub async fn prepare(&mut self, txn_id: TransactionId) -> Result<PrepareStatus, TransactionError> {\n        // Implementation details...\n    }\n    \n    pub async fn commit(&mut self, txn_id: TransactionId) -> Result<(), TransactionError> {\n        // Implementation details...\n    }\n    \n    pub async fn rollback(&mut self, txn_id: TransactionId) -> Result<(), TransactionError> {\n        // Implementation details...\n    }\n}\n```",
      status: 'open' as const,
      createdAt: "2025-04-07"
    },
    {
      url: "https://github.com/rustdb/distributed-db/issues/47",
      number: 47,
      title: "Query performance regression for complex joins",
      description: "We've identified a performance regression in query execution for complex joins involving more than 3 tables. The regression appears to be related to the recent changes in the query optimizer.\n\nBenchmark results:\n- Simple queries: No change\n- 2-table joins: No change\n- 3-table joins: 5% slower\n- 4-table joins: 35% slower\n- 5+ table joins: 60-80% slower\n\nThe issue appears to be in the join ordering algorithm. The current greedy approach doesn't consider enough join combinations for complex queries.\n\nProposed fix:\n```rust\nfn find_optimal_join_order(&self, tables: &[TableRef], predicates: &[Predicate]) -> JoinOrder {\n    if tables.len() <= 3 {\n        // Use existing greedy algorithm for simple cases\n        return self.greedy_join_order(tables, predicates);\n    }\n    \n    // For complex joins, use dynamic programming approach\n    let mut best_plans: HashMap<BitSet, (Cost, JoinOrder)> = HashMap::new();\n    \n    // Initialize single-table plans\n    for (i, table) in tables.iter().enumerate() {\n        let bitset = BitSet::singleton(i);\n        let plan = self.create_table_scan(table, predicates);\n        best_plans.insert(bitset, (self.estimate_cost(&plan), JoinOrder::single(table.clone())));\n    }\n    \n    // Build up increasingly larger plans\n    for size in 2..=tables.len() {\n        for subset in BitSet::combinations(tables.len(), size) {\n            // Try all ways to join a subset of size-1 with a single table\n            // Implementation details...\n        }\n    }\n    \n    // Return the plan for all tables\n    best_plans.get(&BitSet::all(tables.len())).unwrap().1.clone()\n}\n```",
      status: 'open' as const,
      createdAt: "2025-04-07"
    }
  ],
  comments: [
    {
      url: "https://github.com/rustdb/distributed-db/issues/40#issuecomment-123",
      number: 40,
      title: "Comment on replication protocol documentation",
      content: "I've reviewed the replication protocol documentation and found some inconsistencies with the actual implementation. The documentation states that we use a pull-based replication model, but the code actually implements a hybrid push/pull approach:\n\n```rust\nimpl ReplicationManager {\n    fn replicate_logs(&self, target_node: NodeId) -> Result<(), ReplicationError> {\n        let last_index = self.get_last_replicated_index(target_node);\n        let entries = self.log_store.get_entries_after(last_index, MAX_BATCH_SIZE);\n        if entries.is_empty() {\n            return Ok(());\n        }\n\n        // This is push-based replication\n        match self.rpc_client.append_entries(target_node, entries) {\n            Ok(response) => {\n                if response.success {\n                    self.update_replication_progress(target_node, entries.last().unwrap().index);\n                    Ok(())\n                } else {\n                    // Handle conflict - this is where we switch to pull-based\n                    self.handle_replication_conflict(target_node, response.last_agreement_index)\n                }\n            }\n            Err(e) => Err(ReplicationError::from(e))\n        }\n    }\n    \n    fn handle_replication_conflict(&self, target_node: NodeId, last_agreement_index: LogIndex) -> Result<(), ReplicationError> {\n        // Pull-based recovery when there's a conflict\n        let missing_entries = self.rpc_client.get_entries(\n            target_node,\n            last_agreement_index + 1,\n            self.log_store.last_log_index()\n        )?;\n\n        // Process and apply missing entries\n        // Implementation details...\n\n        Ok(())\n    }\n}\n```\n\nWe should update the documentation to accurately reflect this hybrid approach.",
      createdAt: "2025-04-07"
    },
    {
      url: "https://github.com/rustdb/distributed-db/issues/42#issuecomment-124",
      number: 42,
      title: "Comment on test coverage for partition tolerance",
      content: "We should increase test coverage for partition tolerance scenarios. Currently, we only test simple network partitions, but we need more comprehensive tests for:\n\n1. Split-brain scenarios with equal-sized partitions\n2. Majority/minority partitions with subsequent healing\n3. Flaky network conditions with intermittent connectivity\n\nHere's a proposed test case for split-brain detection and resolution:\n\n```rust\n#[test]\nfn test_split_brain_detection_and_resolution() {\n    let mut cluster = TestCluster::new(6); // 6-node cluster\n\n    // Create a perfect split: 3 nodes in each partition\n    let partition1 = vec![0, 1, 2];\n    let partition2 = vec![3, 4, 5];\n\n    // Isolate the partitions from each other\n    cluster.create_network_partition(partition1.clone(), partition2.clone());\n\n    // Let both partitions elect leaders\n    cluster.wait_for_leader_in_subset(&partition1);\n    cluster.wait_for_leader_in_subset(&partition2);\n\n    // Verify we have two leaders (split-brain)\n    let leaders = cluster.get_all_leaders();\n    assert_eq!(leaders.len(), 2, \"Should have exactly two leaders during split-brain\");\n\n    // Heal the partition\n    cluster.heal_network_partition();\n\n    // Wait for resolution\n    cluster.wait_for_leader_convergence(Duration::from_secs(10));\n\n    // Verify we now have exactly one leader\n    let leaders_after_healing = cluster.get_all_leaders();\n    assert_eq!(leaders_after_healing.len(), 1, \"Should have exactly one leader after healing\");\n\n    // Verify the cluster is still operational\n    cluster.assert_can_process_writes();\n}\n```\n\nWe should implement this and similar tests to ensure our system is robust against all types of network partitions.",
      createdAt: "2025-04-06"
    },
    {
      url: "https://github.com/rustdb/distributed-db/issues/43#issuecomment-125",
      number: 43,
      title: "Comment on query parser implementation",
      content: "The current recursive descent parser for SQL has some issues with complex expressions. I suggest we switch to a more robust approach using a parser combinator library like `nom` or `pest`:\n\n```rust\nuse nom::{\n    IResult,\n    branch::alt,\n    bytes::complete::{tag, tag_no_case},\n    character::complete::{alpha1, alphanumeric1, multispace0, multispace1},\n    combinator::{map, opt, recognize},\n    multi::{many0, separated_list1},\n    sequence::{delimited, pair, preceded, terminated},\n};\n\n#[derive(Debug, PartialEq)]\npub enum SqlStatement {\n    Select(SelectStatement),\n    Insert(InsertStatement),\n    Update(UpdateStatement),\n    Delete(DeleteStatement),\n}\n\n#[derive(Debug, PartialEq)]\npub struct SelectStatement {\n    columns: Vec<String>,\n    from: String,\n    where_clause: Option<Expr>,\n    // Other clauses...\n}\n\nfn parse_select(input: &str) -> IResult<&str, SqlStatement> {\n    let(input, _) = tag_no_case(\"SELECT\")(input)?;\n    let(input, _) = multispace1(input)?;\n\n    let(input, columns) = separated_list1(\n        delimited(multispace0, tag(\",\"), multispace0),\n        parse_identifier\n    )(input)?;\n\n    let(input, _) = multispace1(input)?;\n    let(input, _) = tag_no_case(\"FROM\")(input)?;\n    let(input, _) = multispace1(input)?;\n\n    let(input, table) = parse_identifier(input)?;\n\n    let(input, where_clause) = opt(parse_where_clause)(input)?;\n\n    Ok((input, SqlStatement::Select(SelectStatement {\n        columns,\n        from: table.to_string(),\n        where_clause,\n    })))\n}\n\n// Additional parser functions...\n```\n\nThis approach would be more maintainable and handle edge cases better than our current implementation.",
      createdAt: "2025-04-05"
    }
  ],
  fileChanges: {
    edited: 14,
    created: 7,
    deleted: 2,
    paths: [
      "src/consensus/raft.rs",
      "src/consensus/log_replication.rs",
      "src/consensus/state_machine.rs",
      "src/consensus/leader_election.rs",
      "src/consensus/membership.rs",
      "src/network/rpc.rs",
      "src/network/connection_manager.rs",
      "src/storage/log_store.rs",
      "src/storage/snapshot.rs",
      "src/common/types.rs",
      "src/common/error.rs",
      "tests/consensus/raft_tests.rs",
      "tests/consensus/leader_election_tests.rs",
      "tests/consensus/log_replication_tests.rs",
      "tests/network/network_partition_tests.rs",
      "benches/consensus_benchmark.rs",
      "docs/consensus_protocol.md"
    ],
    charDiff: {
      edited: 8245,
      created: 12567,
      deleted: 1890
    },
    fileDiffs: [
      { path: "src/consensus/raft.rs", added: 524, removed: 132 },
      { path: "src/consensus/log_replication.rs", added: 356, removed: 78 },
      { path: "src/consensus/state_machine.rs", added: 287, removed: 42 },
      { path: "src/consensus/leader_election.rs", added: 312, removed: 56 },
      { path: "src/consensus/membership.rs", added: 245, removed: 0 },
      { path: "src/network/rpc.rs", added: 187, removed: 34 },
      { path: "src/network/connection_manager.rs", added: 165, removed: 23 },
      { path: "src/storage/log_store.rs", added: 278, removed: 45 },
      { path: "src/storage/snapshot.rs", added: 234, removed: 0 },
      { path: "src/common/types.rs", added: 112, removed: 24 },
      { path: "src/common/error.rs", added: 87, removed: 12 },
      { path: "tests/consensus/raft_tests.rs", added: 423, removed: 67 },
      { path: "tests/consensus/leader_election_tests.rs", added: 345, removed: 0 },
      { path: "tests/consensus/log_replication_tests.rs", added: 378, removed: 0 },
      { path: "tests/network/network_partition_tests.rs", added: 412, removed: 0 },
      { path: "benches/consensus_benchmark.rs", added: 156, removed: 0 },
      { path: "docs/consensus_protocol.md", added: 245, removed: 32 }
    ]
  },
  summary: `# Distributed Consensus Implementation with Raft

## Overview
I've implemented a complete Raft consensus protocol for our distributed database system as requested. The implementation includes:

  - Leader election with randomized timeouts
    - Log replication with strong consistency guarantees
      - Cluster membership changes(dynamic node addition / removal)
        - Snapshot creation and transfer for log compaction
          - Optimized network layer for efficient RPC communication

## Technical Details

### Raft Implementation
The core Raft implementation follows the paper specifications with optimizations for our specific use case:

\`\`\`rust
pub struct RaftNode {
    // Node state
    id: NodeId,
    state: AtomicRaftState,
    current_term: AtomicU64,
    voted_for: Mutex<Option<NodeId>>,
    
    // Log management
    log: Arc<LogStore>,
    commit_index: AtomicU64,
    last_applied: AtomicU64,
    
    // Cluster membership
    peers: RwLock<HashMap<NodeId, PeerState>>,
    
    // Components
    rpc_client: Arc<RpcClient>,
    state_machine: Arc<StateMachine>,
    
    // Background tasks
    election_task: Mutex<Option<JoinHandle<()>>>,
    replication_task: Mutex<Option<JoinHandle<()>>>,
}

impl RaftNode {
    pub fn start(&self) -> Result<(), RaftError> {
        // Initialize node state
        self.state.store(RaftState::Follower, Ordering::SeqCst);
        self.reset_election_timeout();
        
        // Start background tasks
        self.start_election_task()?;
        self.start_replication_task()?;
        
        Ok(())
    }
    
    fn become_candidate(&self) -> Result<(), RaftError> {
        // Implementation details for leader election
        let new_term = self.current_term.fetch_add(1, Ordering::SeqCst) + 1;
        self.state.store(RaftState::Candidate, Ordering::SeqCst);
        
        // Vote for self
        let mut voted_for = self.voted_for.lock().unwrap();
        *voted_for = Some(self.id);
        
        // Request votes from peers
        self.request_votes(new_term)
    }
    
    fn replicate_logs(&self) -> Result<(), RaftError> {
        // Implementation details for log replication
        if self.state.load(Ordering::SeqCst) != RaftState::Leader {
            return Ok(());
        }
        
        for (peer_id, peer_state) in self.peers.read().unwrap().iter() {
            let next_index = peer_state.next_index.load(Ordering::SeqCst);
            let entries = self.log.get_entries_after(next_index - 1, MAX_BATCH_SIZE)?;
            
            // Send AppendEntries RPC
            // Implementation details...
        }
        
        Ok(())
    }
}
\`\`\`

### Log Replication
The log replication mechanism ensures strong consistency across the cluster:

\`\`\`rust
impl LogReplication {
    fn append_entries(&self, target: NodeId, prev_log_index: u64, prev_log_term: u64, entries: Vec<LogEntry>, leader_commit: u64) -> Result<AppendEntriesResponse, RpcError> {
        // Implementation details...
        
        // Check term
        if term < self.current_term.load(Ordering::SeqCst) {
            return Ok(AppendEntriesResponse {
                term: self.current_term.load(Ordering::SeqCst),
                success: false,
                last_log_index: self.log.last_index(),
            });
        }
        
        // Check log consistency
        if !self.log.entry_matches(prev_log_index, prev_log_term)? {
            return Ok(AppendEntriesResponse {
                term: self.current_term.load(Ordering::SeqCst),
                success: false,
                last_log_index: self.log.last_index(),
            });
        }
        
        // Append new entries
        self.log.append_entries(prev_log_index, entries.clone())?;
        
        // Update commit index
        if leader_commit > self.commit_index.load(Ordering::SeqCst) {
            let new_commit_index = min(leader_commit, self.log.last_index());
            self.commit_index.store(new_commit_index, Ordering::SeqCst);
            self.apply_committed_entries()?;
        }
        
        Ok(AppendEntriesResponse {
            term: self.current_term.load(Ordering::SeqCst),
            success: true,
            last_log_index: self.log.last_index(),
        })
    }
}
\`\`\`

### Membership Changes
The implementation supports dynamic cluster membership changes:

\`\`\`rust
impl MembershipManager {
    pub fn add_server(&self, server_id: NodeId, address: SocketAddr) -> Result<(), MembershipError> {
        // Implementation using joint consensus for safe configuration changes
        let old_config = self.get_current_configuration()?;
        let mut new_config = old_config.clone();
        new_config.servers.insert(server_id, ServerConfig { address });
        
        // Phase 1: Joint consensus (old ∪ new)
        let joint_config = Configuration {
            old_servers: old_config.servers.clone(),
            new_servers: new_config.servers.clone(),
            is_joint: true,
        };
        
        self.commit_configuration(joint_config)?;
        
        // Wait for joint configuration to be committed
        self.wait_for_config_commit()?;
        
        // Phase 2: Switch to new configuration
        self.commit_configuration(new_config)?;
        
        Ok(())
    }
}
\`\`\`

## Performance Benchmarks
Performance testing shows excellent scalability with increasing cluster sizes:

| Cluster Size | Write Throughput | Read Throughput | Commit Latency (p99) |
| ------------ | --------------- | --------------- | -------------------- |
| 3 nodes      | 15,200 ops/sec  | 42,500 ops/sec  | 8.5ms                |
| 5 nodes      | 14,800 ops/sec  | 68,300 ops/sec  | 12.3ms               |
| 7 nodes      | 14,100 ops/sec  | 95,700 ops/sec  | 18.7ms               |

## Fault Tolerance Testing
The implementation has been thoroughly tested for various failure scenarios:

> During our chaos testing, we randomly killed nodes while maintaining a constant write workload. The system maintained availability and consistency with up to (N-1)/2 node failures, exactly as expected from the Raft protocol.

## Next Steps
Consider implementing these enhancements:

1. Optimized log compaction with incremental snapshots
2. Read-only quorum reads for improved read scalability
3. Follower reads with consistency guarantees
4. Pre-vote protocol to prevent disruptions during network partitions
5. Prioritized log replication for high-priority transactions

## References
* [Raft Consensus Paper](https://raft.github.io/raft.pdf)
* [Raft Dissertation](https://web.stanford.edu/~ouster/cgi-bin/papers/OngaroPhD.pdf)
* [Consensus: Bridging Theory and Practice](https://github.com/ongardie/dissertation)`,
  completionMetrics: {
    time: "4m 18s",
    tokens: {
      input: 15456,
      output: 6328,
      total: 21784
    },
    models: [
      { name: "GPT-4o", usage: "Primary reasoning" },
      { name: "Claude 3 Opus", usage: "Code analysis" }
    ],
    filesConsidered: [
      "src/consensus/**/*.rs",
      "src/network/**/*.rs",
      "src/storage/**/*.rs",
      "src/common/**/*.rs",
      "tests/consensus/**/*.rs",
      "benches/consensus_benchmark.rs",
      "docs/consensus_protocol.md"
    ],
    repoSnapshot: {
      org: "rustdb",
      repo: "distributed-db",
      branch: "feature/raft",
      commit: "abc1234"
    },
    attachments: [
      { name: "raft-consensus-paper.pdf", type: "FILE", fileType: "PDF", size: "1.8 MB" },
      { name: "system-architecture.json", type: "FILE", fileType: "JSON", size: "425 KB" },
      { name: "https://raft.github.io", type: "URL" },
      { name: "rustdb/distributed-db#123", type: "PR" },
      { name: "Figma Frame id: abcdef", type: "INTEGRATION", integrationType: "Figma" },
      { name: "Notion Page id: yz-987", type: "INTEGRATION", integrationType: "Notion" }
    ],
    ai_documents: [
      { name: "Enhanced Compute", used: true },
      { name: "Multi-Agent", used: true, agents: 3 }
    ],
    completed: "2025-04-15T14:32:45Z"
  }
};

export default function ExecutionsPageHeader({
  executionStatus: mode,
  deliverables,
  processingStats,
  repoSnapshot,
  onExecuteDeliverableClickSetDefinitionOfDone,
  renderDocInsideHeader,
  renderCardsInsideHeader,
  showSourceEdu,
  showAttachmentsEdu,
  showComputeEdu,
  showMultiAgentEdu,
  showEnhanceEdu,
  showSaveTemplateEdu,
  showExecuteButtonEdu,
  showIterationsEdu,
  templates,
  onTemplateSelect,
  executionType,
  postprocessed
}: ExecutionPageHeaderProps) {
  const [activeEdu, setActiveEdu] = React.useState<EduContent | null>(null);
  
  // Memoized education content setters to prevent infinite loops
  const handlePullRequestHover = useCallback(() => {
    setActiveEdu({
      title: "Pull Requests",
      subtitle: "Code Integration",
      body: "Complete code changes that integrate with your architecture. Includes tests, documentation, and adherence to codebase standards."
    });
  }, []);
  
  const handlePRReviewHover = useCallback(() => {
    setActiveEdu({
      title: "PR Reviews",
      subtitle: "Code Quality",
      body: "Thorough analysis with actionable feedback on bugs, completeness, quality, and security. Identifies and suggests specific improvements."
    });
  }, []);
  
  const handleIssueHover = useCallback(() => {
    setActiveEdu({
      title: "Issues",
      subtitle: "Task Tracking",
      body: "Structured problem statements with reproduction steps and acceptance criteria. Includes context, priority, and implementation suggestions."
    });
  }, []);
  
  const handleIssueCommentHover = useCallback(() => {
    setActiveEdu({
      title: "Comments",
      subtitle: "Discussion",
      body: "Technical discourse with proposed solutions, clarifications, and implementation details. Advances issue resolution through constructive dialogue."
    });
  }, []);
  
  // Dev Mode feature flag (always off in production)
  const devMode = false;
  // State hooks for dev mode controls (not used when devMode=false)
  const [devModeActive, setDevModeActive] = useState(false);
  const [devModeSettings, setDevModeSettings] = useState({
    mode: 'execute',
    slowEntranceAnimations: false,
    showMockData: false,
    enabledDeliverables: {
      pullRequest: false,
      pullRequestReviews: false,
      issues: false,
      comments: false,
      fileChanges: false,
      summary: false,
    },
  });
  // Controls collapsible final summary details
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [entranceKey, setEntranceKey] = useState(0);
  // Refs for scrolling to sections during entrance animation
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Animation speed factor
  const entranceSpeedFactor = 1;

  // Helper to scroll a section into view with top margin
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const margin = vh * 0.2;
    let deltaY = 0;
    if (rect.top < margin) {
      // Section starts above desired top margin: scroll up
      deltaY = rect.top - margin;
    } else if (rect.bottom > vh - margin) {
      // Section ends below bottom margin: scroll down
      deltaY = rect.bottom - (vh - margin);
    } else {
      // Already within visible margin bounds
      return;
    }
    window.scrollTo({ top: window.scrollY + deltaY, behavior: 'smooth' });
  };
  // Dynamically scale variants for debugging entrance animations
  const scaledContentVariants = React.useMemo(() => {
    if (entranceSpeedFactor === 1) return contentVariants;
    return {
      open: {
        ...contentVariants.open,
        transition: {
          ...contentVariants.open.transition,
          height: {
            ...contentVariants.open.transition.height,
            duration: contentVariants.open.transition.height.duration * entranceSpeedFactor,
          },
          opacity: {
            ...contentVariants.open.transition.opacity,
            duration: contentVariants.open.transition.opacity.duration * entranceSpeedFactor,
          },
          scale: {
            ...contentVariants.open.transition.scale,
            duration: contentVariants.open.transition.scale.duration * entranceSpeedFactor,
          },
        },
      },
      closed: {
        ...contentVariants.closed,
        transition: {
          ...contentVariants.closed.transition,
          height: {
            ...contentVariants.closed.transition.height,
            duration: contentVariants.closed.transition.height.duration * entranceSpeedFactor,
          },
          opacity: {
            ...contentVariants.closed.transition.opacity,
            duration: contentVariants.closed.transition.opacity.duration * entranceSpeedFactor,
          },
          scale: {
            ...contentVariants.closed.transition.scale,
            duration: contentVariants.closed.transition.scale.duration * entranceSpeedFactor,
          },
        },
      },
    };
  }, [entranceSpeedFactor]);

  const scaledTextFadeVariants = React.useMemo(() => {
    if (entranceSpeedFactor === 1) return textFadeVariants;
    return {
      initial: textFadeVariants.initial,
      animate: {
        ...textFadeVariants.animate,
        transition: {
          ...textFadeVariants.animate.transition,
          duration: (textFadeVariants.animate.transition.duration || 0) * entranceSpeedFactor,
          delay: (textFadeVariants.animate.transition.delay || 0) * entranceSpeedFactor,
          staggerChildren: 0.4 * entranceSpeedFactor,
        },
      },
      exit: {
        ...textFadeVariants.exit,
        transition: {
          ...textFadeVariants.exit.transition,
          duration: (textFadeVariants.exit.transition.duration || 0) * entranceSpeedFactor,
        },
      },
    };
  }, [entranceSpeedFactor]);

  const scaledChildVariants = React.useMemo(() => {
    if (entranceSpeedFactor === 1) return childVariants;
    return {
      initial: childVariants.initial,
      animate: {
        ...childVariants.animate,
        transition: {
          ...childVariants.animate.transition,
          duration: (childVariants.animate.transition.duration || 0) * entranceSpeedFactor,
        },
      },
    };
  }, [entranceSpeedFactor]);

  // Use actual deliverables prop and mode
  const effectiveDeliverables = deliverables ?? {} as ExecutionPageHeaderProps['deliverables'];
  const effectiveMode = mode;
  const activeGuide = (processingStats?.guide ?? processingStats?.gate ?? 'Develop') as string;
  const iterationConfidence = typeof processingStats?.confidence === 'number' ? processingStats?.confidence : undefined;
  const awaitingInstruction = processingStats?.awaitingInstruction ?? (typeof iterationConfidence === 'number' ? iterationConfidence < INSTRUCTION_WAIT_THRESHOLD : false);
  const timerInitialSecondsRaw = typeof processingStats?.timeRemainingSeconds === 'number'
    ? processingStats.timeRemainingSeconds
    : typeof processingStats?.timeoutSeconds === 'number'
      ? processingStats.timeoutSeconds
      : undefined;
  const timerInitialSeconds = typeof timerInitialSecondsRaw === 'number' && Number.isFinite(timerInitialSecondsRaw)
    ? Math.max(0, Math.round(timerInitialSecondsRaw))
    : undefined;
  const confidenceLevel: 'high' | 'medium' | 'low' = iterationConfidence === undefined
    ? 'high'
    : iterationConfidence >= INSTRUCTION_WAIT_THRESHOLD
      ? 'high'
      : iterationConfidence >= INSTRUCTION_CONFIDENCE_MEDIUM
        ? 'medium'
        : 'low';
  const shouldShowInstructionTimer =
    effectiveMode === 'executing' &&
    activeGuide === 'Develop' &&
    awaitingInstruction &&
    typeof timerInitialSeconds === 'number';
  const instructionSuggestions = (processingStats?.suggestions || []).filter(Boolean);
  const instructionSummary = processingStats?.selfInstruction;
  const digestStatus = (processingStats as any)?.digest || (processingStats as any)?.digestStatus;
  const canShipDigest = activeGuide !== 'Digest' || !!digestStatus?.agentsDocUpdated;
  const confidencePercent = iterationConfidence !== undefined ? Math.round(iterationConfidence * 100) : undefined;

  // Track the last shown edu content
  const [lastEduContent, setLastEduContent] = useState<EduContent | null>(null);

  // Handle edu content updates
  useEffect(() => {
    if (showSourceEdu) {
      const sourceEdu = {
        title: "Source",
        subtitle: "Repository Selection",
        body: "Select the codebase snapshot as foundation for generated work. For pull requests, this defines the base branch for changes."
      };
      setActiveEdu(sourceEdu);
      setLastEduContent(sourceEdu);
    } else if (showAttachmentsEdu) {
      const attachmentsEdu = {
        title: "Attachments",
        subtitle: "Contextual Materials",
        body: "Provide files, URLs, and references that establish context. These materials help the agent understand requirements and implementation details."
      };
      setActiveEdu(attachmentsEdu);
      setLastEduContent(attachmentsEdu);
    } else if (showComputeEdu) {
      const computeEdu = {
        title: "Compute",
        subtitle: "Processing Power",
        body: "Activate enhanced resources for complex tasks requiring intensive analysis. Ideal for large codebases, refactoring, or architectural changes."
      };
      setActiveEdu(computeEdu);
      setLastEduContent(computeEdu);
    } else if (showMultiAgentEdu) {
      const multiAgentEdu = {
        title: "Multi-Deliverables",
        subtitle: "Chain-of-Agents",
        body: "Allow Bitcode to create a series of deliverables toward your task. This will typically include at least one of each in sequence."
      };
      setActiveEdu(multiAgentEdu);
      setLastEduContent(multiAgentEdu);
    } else if (showEnhanceEdu) {
      const enhanceEdu = {
        title: "Enhance Writing",
        subtitle: "Improve Definition of Done",
        body: "Use AI to refine and elaborate your Definition of Done, making it more precise and informative."
      };
      setActiveEdu(enhanceEdu);
      setLastEduContent(enhanceEdu);
    } else if (showSaveTemplateEdu) {
      const saveTemplateEdu = {
        title: "Save as Template",
        subtitle: "Save Definition of Done",
        body: "Save your current Definition of Done as a reusable template for future deliverables."
      };
      setActiveEdu(saveTemplateEdu);
      setLastEduContent(saveTemplateEdu);
    } else if (showExecuteButtonEdu) {
      const executeButtonEdu = {
        title: "Execute",
        subtitle: "Initiate Work",
        body: <EducationBodyWithLogo />
      };
      setActiveEdu(executeButtonEdu);
      setLastEduContent(executeButtonEdu);
    } else if (showIterationsEdu) {
      const iterationsEdu = (showIterationsEdu === 'minimize')
        ? {
            title: "Auto-Minimize",
            subtitle: "Efficiency Mode",
            body: (
              <div className="space-y-2 text-sm">
                <div className="text-blue-300">Automatically determines minimum iterations needed to complete the Definition of Done.</div>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><span className="text-white">Focus on efficiency</span>: Completes requirements with minimal processing</li>
                  <li><span className="text-white">Smart optimization</span>: Balances speed with correctness</li>
                  <li><span className="text-white">Ideal for</span>: Simple fixes, routine tasks, or when speed matters most</li>
                </ul>
                <div className="text-xs text-gray-500 mt-2">The pipeline will self-regulate to find the optimal minimum iteration count.</div>
              </div>
            )
          }
        : (showIterationsEdu === 'maximize')
        ? {
            title: "Auto-Maximize",
            subtitle: "Quality Mode",
            body: (
              <div className="space-y-2 text-sm">
                <div className="text-purple-300">Aggressively ensures comprehensive quality with exhaustive refinement.</div>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><span className="text-white">Exhaustive testing</span>: Comprehensive test coverage and edge cases</li>
                  <li><span className="text-white">Full documentation</span>: Detailed docs, comments, and explanations</li>
                  <li><span className="text-white">Maximum abstraction</span>: Optimal code organization and reusability</li>
                  <li><span className="text-white">Error handling</span>: Robust error management and recovery</li>
                </ul>
                <div className="text-xs text-gray-500 mt-2">Ideal for production-critical deliverables requiring maximum reliability.</div>
              </div>
            )
          }
        : {
            title: "Pipeline Iterations",
            subtitle: "DIV Inner Loop Control",
            body: (
              <div className="space-y-2 text-sm">
                <p>Controls the number of Discovery-Implementation-Validation (DIV) cycles the pipeline will execute.</p>
                <p className="text-emerald-300">Each iteration refines and improves the deliverable through intelligent feedback loops.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><span className="text-white">3 iterations (MIN)</span>: Quick first pass, suitable for simple tasks</li>
                  <li><span className="text-white">10-20 iterations</span>: Balanced quality for most deliverables</li>
                  <li><span className="text-white">50+ iterations</span>: Deep refinement for complex work</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">Auto-Minimize/Maximize toggles enable automatic iteration adjustment based on pipeline feedback.</p>
              </div>
            )
          };
      setActiveEdu(iterationsEdu);
      setLastEduContent(iterationsEdu);
    } else if (lastEduContent) {
      setActiveEdu(lastEduContent);
    }
  }, [showSourceEdu, showAttachmentsEdu, showComputeEdu, showMultiAgentEdu, showEnhanceEdu, showSaveTemplateEdu, showExecuteButtonEdu, showIterationsEdu]);

  // Prepare TL;DR items for summary of deliverables
  const tldrItems: React.ReactNode[] = [];

  // Individual deliverable links with icons and titles (works for both real and
  // mock data).  We no longer fall back to the older single‑sentence mock
  // summary so that the rich format is always shown when mock data is enabled.

  const pr = effectiveDeliverables?.pullRequest;
  if (pr) {
    tldrItems.push(
      <a
        key={`pr-${pr.number}`}
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-emerald-300 hover:text-emerald-200 text-sm"
      >
        <svg className="w-4 h-4 mr-1 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 0v12m0 0 4-4m-4 4-4-4" />
        </svg>
        <strong className="mr-1">PR:</strong> {pr.title || `#${pr.number}`}
      </a>
    );
  }

  (effectiveDeliverables?.pullRequestReviews || []).forEach((r) => {
    tldrItems.push(
      <a
        key={`review-${r.number}`}
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-purple-300 hover:text-purple-200 text-sm"
      >
        <svg className="w-4 h-4 mr-1 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <strong className="mr-1">Review:</strong> {r.title || `#${r.number}`}
      </a>
    );
  });

  (effectiveDeliverables?.issues || []).forEach((issue) => {
    tldrItems.push(
      <a
        key={`issue-${issue.number}`}
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-amber-300 hover:text-amber-200 text-sm"
      >
        <svg className="w-4 h-4 mr-1 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <strong className="mr-1">Issue:</strong> {issue.title || `#${issue.number}`}
      </a>
    );
  });

  (effectiveDeliverables?.comments || []).forEach((c) => {
    tldrItems.push(
      <a
        key={`comment-${c.number}`}
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-300 hover:text-blue-200 text-sm"
      >
        <svg className="w-4 h-4 mr-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <strong className="mr-1">Comment:</strong> {c.title || `#${c.number}`}
      </a>
    );
  });

  if (tldrItems.length === 0) {
    tldrItems.push(<span key="none">No deliverables to summarize</span>);
  }
  return (
    <section data-experience="deliverables">
      <div
        className={`
          relative
          flex flex-col items-center justify-center text-left space-y-8
          overflow-visible
          max-w-4.5xl
          mx-auto
          transition-[margin,padding] duration-700 ease-orbit-snap
          ${effectiveMode === "execute"
            ? "mb-10 mt-18"
            : effectiveMode === "executing"
              ? "mb-0 mt-18 pointer-events-none"
              : "mb-8 mt-18"
          }
        `}
      >
        {/* Header content */}
        <motion.div
          key={entranceKey}
          className="flex flex-col space-y-8 relative overflow-visible w-full"
          variants={scaledContentVariants}
          initial="open"
          animate={effectiveMode === "executing" ? "closed" : "open"}
        >
          {/* Meta-phase indicator and transition buttons (executing/executed modes) */}
          {(effectiveMode === "executing" || effectiveMode === "executed") && (
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Gate indicator (dynamic from execution state) */}
              <GuideIndicator
                currentGuide={activeGuide as any}
                completedGuides={
                  activeGuide === 'Develop' ? ['Design'] :
                  activeGuide === 'Digest' ? ['Design', 'Develop'] : []
                }
                collaborative={(activeGuide === 'Design' || activeGuide === 'Digest')}
                compact={false}
              />

              {/* Transition buttons (user-gated) */}
              {effectiveMode === "executed" && (
                <div className="flex gap-3">
                  {activeGuide === 'Design' && (
                    <button
                      onClick={async () => {
                        await fetch(`/api/executions/${processingStats?.runId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ gate: 'Develop' })
                        });
                      }}
                      className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      Ready to Develop
                    </button>
                  )}

                  {activeGuide === 'Develop' && (
                    <button
                      onClick={async () => {
                        await fetch(`/api/executions/${processingStats?.runId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ gate: 'Digest' })
                        });
                      }}
                      className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg hover:bg-amber-500/30 transition-colors"
                    >
                      Ready to Digest
                    </button>
                  )}

                  {activeGuide === 'Digest' && (
                    <div className="flex flex-col gap-2 w-full max-w-lg">
                      <button
                        onClick={async () => {
                          if (!canShipDigest) return;
                          await fetch(`/api/executions/${processingStats?.runId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'completed' })
                          });
                        }}
                        disabled={!canShipDigest}
                        className={`px-4 py-2 rounded-lg transition-colors border ${canShipDigest
                          ? 'bg-sky-500/20 border-sky-500/30 text-sky-300 hover:bg-sky-500/30'
                          : 'bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed'}`}
                      >
                        Ship
                      </button>
                      {digestStatus && (
                        <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-sm text-sky-100">
                          <p className="font-semibold text-sky-200">
                            {digestStatus.agentsDocUpdated
                              ? '.ai/AGENTS.md update detected'
                              : 'Awaiting .ai/AGENTS.md update before shipping'}
                          </p>
                          {digestStatus.summary && (
                            <p className="mt-1 text-sky-100/80 whitespace-pre-wrap">{digestStatus.summary}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Confidence timer / status (Develop guide) */}
              {effectiveMode === "executing" && activeGuide === 'Develop' && (
                <div className="space-y-3 w-full">
                  {shouldShowInstructionTimer ? (
                    <InstructionConfidenceTimer
                      timeRemaining={timerInitialSeconds!}
                      confidenceLevel={confidenceLevel}
                      isActive={awaitingInstruction}
                      currentPhase={processingStats?.phase || "Implementation"}
                      currentAgent={processingStats?.agent}
                      onTimerExpire={() => {
                        console.log('[Confidence] Timer expired, agent proceeding autonomously');
                      }}
                    />
                  ) : awaitingInstruction && iterationConfidence !== undefined ? (
                    <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 shadow-sm">
                      <p className="font-semibold text-amber-100">
                        Awaiting your instruction ({confidencePercent ?? 0}% confidence).
                      </p>
                      <p className="mt-1 text-amber-100/80">
                        Provide guidance to unlock the next iteration, or choose “No notes” to proceed.
                      </p>
                    </div>
                  ) : iterationConfidence !== undefined ? (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 shadow-sm">
                      <p className="font-semibold text-emerald-100">
                        Confidence {confidencePercent ?? 0}% — continuing autonomously.
                      </p>
                      <p className="mt-1 text-emerald-100/80">
                        Add a note at any time to shape the next iteration.
                      </p>
                    </div>
                  ) : null}

                  {(instructionSummary || instructionSuggestions.length > 0) && (
                    <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-200 space-y-2">
                      {instructionSummary && (
                        <p className="font-medium text-sky-100">{instructionSummary}</p>
                      )}
                      {instructionSuggestions.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1">
                          {instructionSuggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sky-100/90">
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* execute-mode instructions */}
          {(effectiveMode === "execute" || effectiveMode == "executing") && (
            <motion.div
              className={`relative flex flex-col space-y-6 ${effectiveMode == 'executing' && 'invisible'}`}
              variants={scaledTextFadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h1
                className="text-3xl tablet:text-4xl desktop:text-5xl font-bold tracking-tight leading-normal mb-2 break-words"
                variants={scaledChildVariants}
              >
                <div className="relative inline-block">
                  <ExecutionsHeaderTitle type={(executionType ?? 'agentic-execution:branch-artifact') as any} className="max-w-[100%]" />
                </div>
              </motion.h1>

              <motion.div
                className="flex flex-col desktop:flex-row space-y-6 desktop:space-y-0 desktop:space-x-6"
                variants={scaledChildVariants}
              >
                <motion.div
                  className="space-y-8 max-w-xl flex-shrink-0 pr-4"
                  variants={scaledChildVariants}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-gray-400 text-lg bg-transparent">
                        Connect your codebase, attach multi-modal context, and describe your task's{' '}
                        <span
                          className="text-gray-300 hover:border-b hover:border-purple-300/90 transition-all duration-150 cursor-help"
                          onMouseEnter={() => setActiveEdu({
                            title: executionType?.includes('ai_documents') ? 'Intent to Improve' : 'Definition of Done',
                            subtitle: executionType?.includes('ai_documents') ? 'Targeted Enhancement' : 'Success Criteria',
                            body: executionType?.includes('ai_documents')
                              ? 'Describe what you intend to improve and why — focused, actionable, and beneficial to users or maintainers.'
                              : 'Articulate the precise outcome that defines success. Clear criteria ensure shared understanding of the expected deliverable.'
                          })}
                        >
                          {executionType?.includes('ai_documents') ? 'Intent to Improve' : 'Definition of Done'}
                        </span>.
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-400 text-lg self-start">
                    {!executionType?.includes('ai_documents') ? (
                      <>
                        A deliverable is a{' '}
                    <DeliverableTemplateText
                      text="pull request"
                      templates={templates?.pullRequests}
                      defaultTask="an opened pull request for:"
                      onSelect={onExecuteDeliverableClickSetDefinitionOfDone}
                      onTemplateSelect={(templateId) => onTemplateSelect?.(templateId, 'pullRequests')}
                      onMouseEnter={handlePullRequestHover}
                      duration={3.2}
                      width={250}
                    />, {' '}
                    <DeliverableTemplateText
                      text="pull request review"
                      templates={templates?.pullRequestReviews}
                      defaultTask="a pull request review that addresses..."
                      onSelect={onExecuteDeliverableClickSetDefinitionOfDone}
                      onTemplateSelect={(templateId) => onTemplateSelect?.(templateId, 'pullRequestReviews')}
                      onMouseEnter={handlePRReviewHover}
                      duration={3.2}
                      delay={0.8}
                      width={250}
                    />, {' '}
                    <DeliverableTemplateText
                      text="issue"
                      templates={templates?.issues}
                      defaultTask="an issue created describing..."
                      onSelect={onExecuteDeliverableClickSetDefinitionOfDone}
                      onTemplateSelect={(templateId) => onTemplateSelect?.(templateId, 'issues')}
                      onMouseEnter={handleIssueHover}
                      duration={3.2}
                      delay={1.6}
                      width={250}
                    />, or {' '}
                    <DeliverableTemplateText
                      text="issue comment"
                      templates={templates?.comments}
                      defaultTask="a helpful comment that..."
                      onSelect={onExecuteDeliverableClickSetDefinitionOfDone}
                      onTemplateSelect={(templateId) => onTemplateSelect?.(templateId, 'comments')}
                      onMouseEnter={handleIssueCommentHover}
                      duration={3.2}
                      delay={2.4}
                      width={250}
                    />, always supplemented by a final work summary.
                      </>
                    ) : (
                      <>
                        An ai_document can be a{' '}
                        <span className="text-gray-300">knowledge extension</span>,{' '}
                        <span className="text-gray-300">deliverable feedback</span>, or{' '}
                        <span className="text-gray-300">MCP Config</span> — keep the intent focused and actionable.
                      </>
                    )}
                  </div>
                </motion.div>

                <div className="w-full">
                  <DocBox content={activeEdu} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {effectiveMode === "executed" && effectiveDeliverables && (renderDocInsideHeader !== false) && (
            <CompleteHeaderContent
              deliverables={effectiveDeliverables as any}
              processingStats={processingStats as any}
              repoSnapshot={repoSnapshot as any}
              executionType={executionType}
              postprocessed={postprocessed}
            />
          )}
        </motion.div>
      </div>

    </section>
  );
}

// Removed unused local MetalPlate (shared variant lives at components/base/bitcode/metal-plate)

function EducationBodyWithLogo() {
  return (
    <div>
      <span><span className="font-bold">This action costs <span className="text-green-primary font-black">$BTD</span>!</span> The source, attachments, and task will be iterated on until you receive a single high-quality deliverable. (<span className="font-normal">~200-500&nbsp;</span>
        <Logo width="w-3.5" height="h-3.5" beta={false} className="inline-block align-middle relative -top-0.5" />
        <span className="font-normal">&nbsp;/&nbsp;Deliverable</span>)</span>
    </div>
  );
}

function DocBox({ content }: { content: EduContent | null }) {
  return (
    <motion.div
      className="w-full sticky top-4"
      initial={false}
      animate={{
        opacity: content ? 1 : 0,
        scale: content ? 1 : 0.97,
      }}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
        scale: { duration: 0.4 }
      }}
    >
      <motion.div
        className="relative rounded-lg border border-emerald-500/20 bg-black/40 backdrop-blur-sm p-4 overflow-hidden h-[150px]"
        animate={{
          boxShadow: content
            ? "0 0 25px rgba(186, 84, 236, 0.05)"
            : "0 0 0 rgba(186, 84, 236, 0)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"
          animate={{
            opacity: content ? 1 : 0,
            scale: content ? 1 : 1.1
          }}
          transition={{
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
        />

        {/* Content */}
        <div className="relative h-full">
          <AnimatePresence mode="sync">
            {content && (
              <motion.div
                key={content.title}
                initial={{
                  opacity: 0,
                  y: 15,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.3, // Slightly faster overall duration
                  ease: [0.23, 1, 0.32, 1],
                  opacity: { duration: 0.2 }, // Faster fade for tighter transition
                  scale: { duration: 0.3 },
                  exitBeforeEnter: false // Allow overlap between exit/enter
                }}
                className="absolute inset-0 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <motion.h3
                    className="text-purple-300 font-medium text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {content.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-xs font-medium ml-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    {content.subtitle}
                  </motion.p>
                </div>
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed mt-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {content.body}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500/20 rounded-full" />
          <div className="absolute top-2 right-6 w-1 h-1 bg-purple-500/10 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
