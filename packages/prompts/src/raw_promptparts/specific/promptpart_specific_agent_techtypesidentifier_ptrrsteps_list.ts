import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Tech Types Identifier agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "PTRR (PLAN-THINK-REFINE-REFLECT) FOR TECHNICAL TECHNOLOGY WORKFLOW:\n\nPLAN (TECHNOLOGY DIMENSIONAL ORCHESTRATION):\n- Manifest comprehensive tech awareness across all advanced classification states\n- Design high-precision technology identification strategies transcending conventional categorization workflows\n- Architect machine learning tech classification solutions\n- Synthesize advanced identification sequences for optimal reality manipulation\n\nTHINK (WORKFLOW-INTEGRATED TECH ANALYSIS):\n- Achieve high-precision understanding of technology structure and innovation topology\n- Analyze tech classification operations through elevated computational intelligence\n- Perceive abstract patterns in technology requirements through advanced awareness\n- Process complex tech scenarios through intelligent classification algorithms\n\nREFINE (MULTIVERSAL TECH OPTIMIZATION):\n- Optimize technology operations through advanced tech intelligence\n- Enhance classification workflows through advanced computational patterns\n- Refine tech identification through machine learning precision\n- Perfect technology orchestration through comprehensive advanced optimization\n\nREFLECT (TECHNOLOGY WORKFLOW MASTERY):\n- Evaluate tech classification outcomes across all advanced technology states\n- Synthesize machine learning lessons from technology identification experiences\n- Achieve advanced understanding of classification effectiveness\n- Manifest ultimate technology mastery wisdom through high-precision reflection processes",
 *     "score": 0.06,
 *     "reason": "Non-industrial: technical context, dimensional orchestration, multiversal optimization, context mastery"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "ptrr_specificity", "test": "Does it define concrete PTRR execution steps? Rate 0-1", "score": 0.95 },
 *   { "name": "methodology_clarity", "test": "Are methodology steps clearly actionable? Rate 0-1", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-TRY-REFINE-REFLECT) FOR TECHNOLOGY STACK ANALYSIS:

PLAN (ANALYSIS STRATEGY DESIGN):
- Define target codebase scope and directory traversal patterns
- Select appropriate parsers and detection tools based on project indicators
- Configure dependency analysis pipeline for package manager identification
- Design technology classification workflow with confidence thresholds

TRY (STATIC ANALYSIS EXECUTION):
- Execute file system traversal using glob patterns for technology fingerprinting
- Parse configuration files (package.json, requirements.txt, pom.xml) for dependency extraction
- Run AST analysis on source code files for language and framework detection
- Process build and deployment files for infrastructure technology identification

REFINE (ACCURACY OPTIMIZATION):
- Validate detection results against heuristic rules and pattern matching
- Cross-reference findings with known technology signatures and version constraints
- Apply confidence scoring algorithms to rank technology detection certainty
- Filter false positives through technology compatibility matrices

REFLECT (RESULTS VALIDATION):
- Evaluate technology classification accuracy against expected patterns
- Generate structured technology inventory with dependency graphs
- Document detection methodology performance and edge case handling
- Update detection rules based on analysis effectiveness metrics` as PromptPart;