#!/usr/bin/env python3
"""
Script to automatically convert all generic agents to use PTRR as primary
and remove variations pattern completely.
"""

import os
import re
import sys

def process_agent_file(filepath, agent_name):
    """Process a single agent file to use PTRR pattern."""
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already processed
    if 'export const ' + agent_name.replace('-', '') + 'Agent = factory' not in content:
        print(f"  ✅ Already updated or different pattern")
        return False
    
    # Find the main agent export with variations
    pattern = r'export const (\w+)Agent = factoryAgent<[^>]+>\s*\(\s*\{[^}]+variations:\s*\[([^\]]+)\][^}]+selectVariation:[^}]+\}\s*\);'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print(f"  ⚠️  Could not find agent definition with variations")
        return False
    
    agent_var_name = match.group(1)
    variations_content = match.group(2)
    
    # Extract variation names
    variation_names = re.findall(r'(\w+Variation)', variations_content)
    
    if not variation_names:
        print(f"  ⚠️  No variations found")
        return False
    
    # Find the PTRR variation (usually first or one with "comprehensive" in name)
    ptrr_variation = None
    quick_variation = None
    
    for var_name in variation_names:
        if 'comprehensive' in var_name.lower() or 'ptrr' in var_name.lower():
            ptrr_variation = var_name
        elif 'quick' in var_name.lower() or 'simple' in var_name.lower() or 'stub' in var_name.lower():
            quick_variation = var_name
    
    # If no comprehensive found, use first as PTRR
    if not ptrr_variation and variation_names:
        ptrr_variation = variation_names[0]
        if len(variation_names) > 1:
            quick_variation = variation_names[1]
    
    # Create new export section
    new_export = f"""// ==================== AGENT EXPORTS ====================

/**
 * {agent_name.replace('-', ' ').title()} Agent - Primary PTRR implementation
 * Uses full Plan-Try-Refine-Retry cycle for comprehensive processing
 */
export const {agent_var_name}Agent = {ptrr_variation};"""
    
    if quick_variation:
        new_export += f"""

/**
 * Quick version for simple operations
 * Note: ALL agents should use PTRR, this is for backward compatibility only
 */
export const {agent_var_name}QuickAgent = {quick_variation};"""
    
    # Replace the old agent definition with new exports
    content = re.sub(pattern, new_export, content, count=1, flags=re.DOTALL)
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  ✅ Updated to use {ptrr_variation} as primary")
    return True

def main():
    agents_dir = '/Users/g/Developer/engi/engi/packages/generic-agents'
    
    # List of all generic agents
    agents = [
        'audio-processor',
        'code-searcher',
        'danger-wall',
        'digester',
        'document-processor',
        'figma-processor',
        'file-pick',
        'image-processor',
        'jira-processor',
        'language',
        'mcps-initializer',
        'ready-to-short-circuit',
        'tech-types-identifier',
        'text-searcher',
        'video-processor',
        'web-search'
    ]
    
    print("Converting all agents to PTRR pattern...")
    print("=" * 50)
    
    for agent in agents:
        print(f"\n{agent}:")
        filepath = os.path.join(agents_dir, agent, 'src', 'index.ts')
        
        if not os.path.exists(filepath):
            print(f"  ⚠️  File not found")
            continue
        
        try:
            process_agent_file(filepath, agent)
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("Conversion complete!")
    print("\nNext steps:")
    print("1. Review each file to ensure correct PTRR variation is primary")
    print("2. Run TypeScript compilation to verify")
    print("3. Update any imports in pipeline code")

if __name__ == '__main__':
    main()