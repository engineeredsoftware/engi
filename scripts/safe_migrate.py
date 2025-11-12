#!/usr/bin/env python3
import os
import sys

# List of all conversation files to move
files = [
    "conversation_context_window_management_atomic.ts",
    "conversation_turn_taking_detection_atomic.ts",
    "conversation_intent_classification_atomic.ts",
    "conversation_emotion_recognition_atomic.ts",
    "conversation_response_tone_modulation_atomic.ts",
    "conversation_clarification_needed_atomic.ts",
    "conversation_topic_tracking_atomic.ts",
    "conversation_engagement_metrics_atomic.ts",
    "conversation_repair_detection_atomic.ts",
    "conversation_multimodal_integration_atomic.ts",
    "conversation_context_window_pruning_atomic.ts",
    "conversation_context_compression_atomic.ts",
    "conversation_turn_prediction_atomic.ts",
    "conversation_turn_timing_atomic.ts",
    "conversation_intent_disambiguation_atomic.ts",
    "conversation_intent_evolution_atomic.ts",
    "conversation_emotion_dynamics_atomic.ts",
    "conversation_emotion_mirroring_strategy.ts",
    "conversation_tone_prefix.ts",
    "conversation_clarification_postfix.ts",
    "conversation_intent_response_template.ts",
    "conversation_engagement_check_prefix.ts",
    "conversation_topic_transition_template.ts",
    "conversation_repair_prefix.ts",
    "conversation_multimodal_acknowledgment_postfix.ts",
    "conversation_context_summary_template.ts",
    "conversation_emotion_validation_prefix.ts",
    "conversation_turn_handoff_postfix.ts",
    "conversation_intent_confirmation_template.ts",
    "conversation_clarification_request_template.ts",
    "conversation_topic_depth_prefix.ts",
    "conversation_engagement_boost_template.ts",
    "conversation_repair_acknowledgment_prefix.ts",
    "conversation_multimodal_integration_template.ts",
    "conversation_context_recall_postfix.ts",
    "conversation_turn_yield_signal.ts",
    "conversation_intent_pivot_template.ts",
    "conversation_emotion_deescalation_prefix.ts",
    "conversation_response_pacing_marker.ts",
    "conversation_topic_summary_postfix.ts",
    "conversation_engagement_question_template.ts",
    "conversation_repair_strategy_template.ts",
    "conversation_multimodal_prompt_prefix.ts",
    "conversation_context_boundary_marker.ts",
    "conversation_turn_interrupt_handler.ts",
    "conversation_intent_fallback_template.ts",
    "conversation_emotion_reflection_postfix.ts",
    "conversation_tone_calibration_template.ts",
    "conversation_clarification_priority_marker.ts",
    "conversation_topic_relevance_score.ts",
    "conversation_engagement_metric_tracker.ts",
    "conversation_repair_success_postfix.ts",
    "conversation_multimodal_sync_template.ts"
]

source_dir = "/Users/g/Developer/engi/engi/packages/pipelines/conversation/src/raw"
dest_dir = "/Users/g/Developer/engi/engi/packages/prompts/src/raw/specifics"

# Process each file
for filename in files:
    source_path = os.path.join(source_dir, filename)
    dest_path = os.path.join(dest_dir, filename)
    
    # Read content
    with open(source_path, 'r') as f:
        content = f.read()
    
    # Write to new location
    with open(dest_path, 'w') as f:
        f.write(content)
    
    # Delete original
    os.remove(source_path)
    
    print(f"Moved: {filename}")

print(f"\nSuccessfully moved {len(files)} files")