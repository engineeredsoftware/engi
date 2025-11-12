#!/bin/bash

# Complete Conversation Pipeline Migration Script
# This script moves all conversation prompt files and cleans up

echo "Starting Conversation Pipeline Migration..."

# Source and destination directories
SOURCE_DIR="/Users/g/Developer/engi/engi/packages/pipelines/conversation/src/raw"
DEST_DIR="/Users/g/Developer/engi/engi/packages/prompts/src/raw/specifics"

# Ensure destination exists
mkdir -p "$DEST_DIR"

# List of all conversation files to move
FILES=(
  "conversation_clarification_needed_atomic.ts"
  "conversation_clarification_postfix.ts"
  "conversation_clarification_priority_marker.ts"
  "conversation_clarification_request_template.ts"
  "conversation_context_boundary_marker.ts"
  "conversation_context_compression_atomic.ts"
  "conversation_context_recall_postfix.ts"
  "conversation_context_summary_template.ts"
  "conversation_context_window_management_atomic.ts"
  "conversation_context_window_pruning_atomic.ts"
  "conversation_emotion_deescalation_prefix.ts"
  "conversation_emotion_dynamics_atomic.ts"
  "conversation_emotion_mirroring_strategy.ts"
  "conversation_emotion_recognition_atomic.ts"
  "conversation_emotion_reflection_postfix.ts"
  "conversation_emotion_validation_prefix.ts"
  "conversation_engagement_boost_template.ts"
  "conversation_engagement_check_prefix.ts"
  "conversation_engagement_metric_tracker.ts"
  "conversation_engagement_metrics_atomic.ts"
  "conversation_engagement_question_template.ts"
  "conversation_intent_classification_atomic.ts"
  "conversation_intent_confirmation_template.ts"
  "conversation_intent_disambiguation_atomic.ts"
  "conversation_intent_evolution_atomic.ts"
  "conversation_intent_fallback_template.ts"
  "conversation_intent_pivot_template.ts"
  "conversation_intent_response_template.ts"
  "conversation_multimodal_acknowledgment_postfix.ts"
  "conversation_multimodal_integration_atomic.ts"
  "conversation_multimodal_integration_template.ts"
  "conversation_multimodal_prompt_prefix.ts"
  "conversation_multimodal_sync_template.ts"
  "conversation_repair_acknowledgment_prefix.ts"
  "conversation_repair_detection_atomic.ts"
  "conversation_repair_prefix.ts"
  "conversation_repair_strategy_template.ts"
  "conversation_repair_success_postfix.ts"
  "conversation_response_pacing_marker.ts"
  "conversation_response_tone_modulation_atomic.ts"
  "conversation_tone_calibration_template.ts"
  "conversation_tone_prefix.ts"
  "conversation_topic_depth_prefix.ts"
  "conversation_topic_relevance_score.ts"
  "conversation_topic_summary_postfix.ts"
  "conversation_topic_tracking_atomic.ts"
  "conversation_topic_transition_template.ts"
  "conversation_turn_handoff_postfix.ts"
  "conversation_turn_interrupt_handler.ts"
  "conversation_turn_prediction_atomic.ts"
  "conversation_turn_taking_detection_atomic.ts"
  "conversation_turn_timing_atomic.ts"
  "conversation_turn_yield_signal.ts"
)

# Move each file
echo "Moving ${#FILES[@]} conversation prompt files..."
for file in "${FILES[@]}"; do
  if [ -f "$SOURCE_DIR/$file" ]; then
    mv "$SOURCE_DIR/$file" "$DEST_DIR/$file"
    echo "  ✓ Moved $file"
  else
    echo "  ⚠ File not found: $file"
  fi
done

# Remove the old raw directory if empty
if [ -d "$SOURCE_DIR" ]; then
  if [ -z "$(ls -A $SOURCE_DIR)" ]; then
    rmdir "$SOURCE_DIR"
    echo "✓ Removed empty raw directory"
  else
    echo "⚠ Raw directory not empty, keeping it"
    ls -la "$SOURCE_DIR"
  fi
fi

echo ""
echo "Migration Summary:"
echo "==================="
echo "✓ Created composition structure at: packages/pipelines/conversation/src/prompts/compositions/"
echo "✓ Created 9 composition files grouping related prompts"
echo "✓ Files should be moved to: $DEST_DIR"
echo ""
echo "Next Steps:"
echo "1. Run this script to complete the file moves"
echo "2. Update imports in conversation tools to use new locations"
echo "3. Test the conversation pipeline with new structure"
echo ""
echo "To run this script: chmod +x complete-conversation-migration.sh && ./complete-conversation-migration.sh"