#!/usr/bin/env python3
"""
Shared utility functions for blog processing scripts.
"""
from pathlib import Path


def get_in_progress_blog_files(root: Path = None) -> list[Path]:
    """
    Get all blog markdown files that have 'in progress' in their tags.
    Returns a list of Path objects.
    """
    if root is None:
        root = Path(__file__).resolve().parents[1]
    
    in_progress_files = []
    for md in root.glob('blog/*.md'):
        if has_in_progress_tag(md):
            in_progress_files.append(md)
    return in_progress_files


def has_in_progress_tag(md_path: Path) -> bool:
    """
    Check if a markdown file has 'in progress' in its tags frontmatter.
    Handles both single-line and multi-line tag formats:
    - Single-line: tags: ["tag1", "in progress"] or tags: [tag1, "in progress"]
    - Multi-line: 
      tags:
        - "in progress"
        - tag2
    """
    content = md_path.read_text()
    if not content.startswith('---'):
        return False
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False
    frontmatter = parts[1]
    in_tags = False
    for line in frontmatter.split('\n'):
        stripped = line.strip()
        if stripped.startswith('tags:'):
            # Check if "in progress" is on the same line (single-line format)
            # Handle both quoted and unquoted, and array format
            line_lower = line.lower()
            if 'in progress' in line_lower:
                return True
            in_tags = True
            continue
        if in_tags:
            # Stop if we hit a new key (line doesn't start with whitespace or is empty)
            if line and not line[0].isspace():
                in_tags = False
            # Check for "in progress" in multi-line format
            # Handle: - "in progress", - 'in progress', - in progress
            elif 'in progress' in line.lower():
                return True
    return False

