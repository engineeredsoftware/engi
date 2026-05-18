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
    return toBitcodeErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readBitcodeRequestBody(request);
    const action = readNeedAction(body);
    if (action === 'synthesize_read_need' || action === 'resynthesize_read_need') {
      const { synthesizeReadNeedForPipelineInput } = await import('@bitcode/pipeline-asset-pack/read-need');
      const readNeed = synthesizeReadNeedForPipelineInput(readNeedPipelineInput(body));

      return NextResponse.json({
        ok: true,
        stage: 'read_need_review',
        action,
        readNeed,
        telemetry: {
          schema: 'bitcode.read-need.synthesis-telemetry',
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
          parsedNeed: readNeed,
          measurementRoot: readNeed.measurementRoot,
          reviewState: readNeed.reviewState,
          resynthesisAttempt: action === 'resynthesize_read_need',
        },
        nextProtocolAction: 'Review and accept the synthesized Read-Need before Need-Fit search.',
      });
    }

    if (action === 'accept_read_need') {
      const { acceptReadNeed, admitNeedFitSearch } = await import('@bitcode/pipeline-asset-pack/read-need');
      const readNeed = objectValue(body.readNeed) || objectValue(body.acceptedReadNeed);
      if (!readNeed || readNeed.schema !== 'bitcode.read.need') {
        return NextResponse.json({ error: 'readNeed is required' }, { status: 400 });
      }

      const acceptedReadNeed = acceptReadNeed(readNeed as unknown as Parameters<typeof acceptReadNeed>[0]);
      const fitSearchAdmission = admitNeedFitSearch({
        acceptedReadNeed,
        requireAcceptedReadNeed: true,
      });
      return NextResponse.json({
        ok: true,
        stage: 'need_fit_ready',
        action,
        acceptedReadNeed,
        readNeed: acceptedReadNeed,
        fitSearchAdmission,
        telemetry: {
          schema: 'bitcode.read-need.acceptance-telemetry',
          needId: acceptedReadNeed.needId,
          measurementRoot: acceptedReadNeed.measurementRoot,
          reviewState: acceptedReadNeed.reviewState,
          acceptanceRoot: acceptedReadNeed.review?.acceptanceRoot || null,
          nextStage: acceptedReadNeed.review?.nextStage || 'need_fit_search',
        },
        nextProtocolAction: 'Run Need-Fit search with the accepted Read-Need.',
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
