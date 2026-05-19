import { NextResponse } from 'next/server';

import {
  getBitcodeAppContext,
  readBitcodeRequestBody,
  toBitcodeErrorResponse,
} from '@/lib/bitcode-app-context';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    return NextResponse.json(
      getBitcodeAppContext().getReadReview({
        scenarioId: url.searchParams.get('scenarioId') || undefined,
      }),
    );
  } catch (error) {
    console.error(error);
    return toBitcodeErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readBitcodeRequestBody(request);
    const action = readNeedAction(body);
    if (action === 'synthesize_read_need' || action === 'resynthesize_read_need') {
      const { synthesizeReadNeedForPipelineInputWithInference } = await import('@bitcode/pipeline-asset-pack/read-need');
      const {
        READ_NEED_COMPREHENSION_SYNTHESIS,
        READ_NEED_COMPREHENSION_SYNTHESIS_CONTRACT,
        summarizeReadingPipelineContract,
      } = await import('@bitcode/pipeline-asset-pack/reading-pipeline-contract');
      const inferenceCapture = createRouteInferenceCapture();
      const readNeed = await synthesizeReadNeedForPipelineInputWithInference(
        readNeedPipelineInput(body),
        inferenceCapture.execution,
      );
      const synthesisStep =
        READ_NEED_COMPREHENSION_SYNTHESIS_CONTRACT.phases
          .flatMap((phase) => phase.agents)
          .flatMap((agent) => agent.ptrrSteps)
          .find((step) => step.ptrrStepId === 'ReadNeedComprehensionSynthesis.comprehend.need-synthesizer.try');

      return NextResponse.json({
        ok: true,
        pipelineName: READ_NEED_COMPREHENSION_SYNTHESIS,
        stage: 'review_synthesized_need',
        action,
        readNeed,
        telemetry: {
          schema: 'bitcode.read-need.synthesis-telemetry',
          pipelineName: READ_NEED_COMPREHENSION_SYNTHESIS,
          pipelineContract: summarizeReadingPipelineContract(READ_NEED_COMPREHENSION_SYNTHESIS_CONTRACT),
          phaseId: 'ReadNeedComprehensionSynthesis.comprehend',
          agentId: 'ReadNeedComprehensionSynthesis.comprehend.need-synthesizer',
          ptrrStepId: synthesisStep?.ptrrStepId || 'ReadNeedComprehensionSynthesis.comprehend.need-synthesizer.try',
          thricifiedGenerationIds: synthesisStep?.thricifiedGenerationIds || [],
          promptTemplate: synthesisStep?.prompt || null,
          promptInput: readNeed.read,
          interpolatedContext: {
            sourceConstraints: readNeed.sourceConstraints,
            targetArtifactKinds: readNeed.targetArtifactKinds,
            closureCriteria: readNeed.closureCriteria,
            feedbackHistory: readNeed.feedbackHistory,
          },
          modelOutput: {
            runtime: 'structured-read-need-synthesis',
            outputKind: 'typed-protocol-synthesis',
            requirements: readNeed.requirements,
            failureModes: readNeed.failureModes,
            proofExpectations: readNeed.proofExpectations,
          },
          rawModelResponse: {
            runtime: 'structured-read-need-synthesis',
            outputKind: 'typed-protocol-synthesis',
            content: readNeed,
          },
          thricifiedGeneration: {
            mode: inferenceCapture.value('bounded-inference', 'mode') || 'deterministic-typed-witness',
            status: inferenceCapture.value('bounded-inference', 'status') || 'deterministic-fallback',
            provider: inferenceCapture.value('bounded-inference', 'provider') || null,
            reasoningOutput: inferenceCapture.value('llm', 'reasoningOutput') || null,
            judgmentOutput: inferenceCapture.value('llm', 'judgmentOutput') || null,
            structuredOutput: inferenceCapture.value('llm', 'parsedOutput') || null,
          },
          parsedTypedOutput: readNeed,
          returnType: 'ReadNeed',
          parsedNeed: readNeed,
          measurementRoot: readNeed.measurementRoot,
          reviewState: readNeed.reviewState,
          resynthesisAttempt: action === 'resynthesize_read_need',
        },
        nextProtocolAction: 'Review and accept the synthesized Read-Need before Finding Fits.',
      });
    }

    if (action === 'accept_read_need') {
      const { acceptReadNeed, admitReadFindingFits } = await import('@bitcode/pipeline-asset-pack/read-need');
      const {
        READ_NEED_COMPREHENSION_SYNTHESIS,
        READ_NEED_COMPREHENSION_SYNTHESIS_CONTRACT,
        READ_FINDING_FITS_SYNTHESIS,
      } = await import('@bitcode/pipeline-asset-pack/reading-pipeline-contract');
      const readNeed = objectValue(body.readNeed) || objectValue(body.acceptedReadNeed);
      if (!readNeed || readNeed.schema !== 'bitcode.read.need') {
        return NextResponse.json({ error: 'readNeed is required' }, { status: 400 });
      }

      const acceptedReadNeed = acceptReadNeed(readNeed as unknown as Parameters<typeof acceptReadNeed>[0]);
      const findingFitsAdmission = admitReadFindingFits({
        acceptedReadNeed,
        requireAcceptedReadNeed: true,
      });
      const acceptanceStep =
        READ_NEED_COMPREHENSION_SYNTHESIS_CONTRACT.phases
          .flatMap((phase) => phase.agents)
          .flatMap((agent) => agent.ptrrSteps)
          .find((step) => step.ptrrStepId === 'ReadNeedComprehensionSynthesis.review.operator-review.try');
      return NextResponse.json({
        ok: true,
        pipelineName: READ_NEED_COMPREHENSION_SYNTHESIS,
        nextPipelineName: READ_FINDING_FITS_SYNTHESIS,
        stage: 'request_fit_ready',
        action,
        acceptedReadNeed,
        readNeed: acceptedReadNeed,
        findingFitsAdmission,
        telemetry: {
          schema: 'bitcode.read-need.acceptance-telemetry',
          pipelineName: READ_NEED_COMPREHENSION_SYNTHESIS,
          phaseId: 'ReadNeedComprehensionSynthesis.review',
          agentId: 'ReadNeedComprehensionSynthesis.review.operator-review',
          ptrrStepId: acceptanceStep?.ptrrStepId || 'ReadNeedComprehensionSynthesis.review.operator-review.try',
          thricifiedGenerationIds: acceptanceStep?.thricifiedGenerationIds || [],
          needId: acceptedReadNeed.needId,
          measurementRoot: acceptedReadNeed.measurementRoot,
          reviewState: acceptedReadNeed.reviewState,
          acceptanceRoot: acceptedReadNeed.review?.acceptanceRoot || null,
          nextStage: acceptedReadNeed.review?.nextStage || 'finding_fits',
          nextPipelineName: READ_FINDING_FITS_SYNTHESIS,
          returnType: 'AcceptedReadNeed',
        },
        nextProtocolAction: 'Run Finding Fits with the accepted Read-Need.',
      });
    }

    return NextResponse.json(getBitcodeAppContext().reviewRead(body));
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readNeedAction(body: Record<string, unknown>): string | null {
  return stringValue(body.action) || stringValue(body.readNeedAction);
}

function createRouteInferenceCapture() {
  const values = new Map<string, unknown>();
  type CapturedExecution = {
    child: (name?: string) => CapturedExecution;
    getRoot: () => CapturedExecution;
    store: (namespace: string, key: string, value: unknown) => void;
    get: (namespace: string, key: string) => unknown;
    findUp: (namespace: string, key: string) => unknown;
    llms: { getDefaultLLM: () => undefined };
  };
  const execution: CapturedExecution = {
    child() {
      return execution;
    },
    getRoot() {
      return execution;
    },
    store(namespace: string, key: string, value: unknown) {
      values.set(`${namespace}:${key}`, value);
    },
    get(namespace: string, key: string) {
      return values.get(`${namespace}:${key}`);
    },
    findUp(namespace: string, key: string) {
      return values.get(`${namespace}:${key}`);
    },
    llms: {
      getDefaultLLM() {
        return undefined;
      },
    },
  };

  return {
    execution,
    value(namespace: string, key: string) {
      return values.get(`${namespace}:${key}`);
    },
  };
}

function readNeedPipelineInput(body: Record<string, unknown>) {
  const readRequest = objectValue(body.readRequest);
  const read = objectValue(body.read);
  const sourceRevision = objectValue(body.sourceRevision);
  const prompt =
    stringValue(body.readPrompt) ||
    stringValue(body.prompt) ||
    stringValue(readRequest?.prompt) ||
    stringValue(read?.prompt) ||
    '';

  return {
    read: {
      ...read,
      id: stringValue(body.readId) || stringValue(read?.id) || stringValue(readRequest?.id),
      prompt,
      repositoryFullName:
        stringValue(body.repositoryFullName) ||
        stringValue(sourceRevision?.repositoryFullName) ||
        stringValue(read?.repositoryFullName) ||
        stringValue(readRequest?.repositoryFullName),
      sourceBranch:
        stringValue(body.sourceBranch) ||
        stringValue(sourceRevision?.branch) ||
        stringValue(read?.sourceBranch) ||
        stringValue(readRequest?.sourceBranch),
      sourceCommit:
        stringValue(body.sourceCommit) ||
        stringValue(sourceRevision?.commit) ||
        stringValue(read?.sourceCommit) ||
        stringValue(readRequest?.sourceCommit),
    },
    readRequest,
    sourceRevision,
    targetArtifactKinds: body.targetArtifactKinds || body.targetKinds,
    targetKinds: body.targetKinds,
    closureCriteria: body.closureCriteria,
    failureModes: body.failureModes,
    feedback: body.feedback || body.readNeedFeedback,
  };
}
