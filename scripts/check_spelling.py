#!/usr/bin/env python3
"""
Helper to list eligible blog markdown files (only those tagged 'in progress')
for spellchecking.
Outputs a space-separated list of files to stdout.
"""
import sys
from pathlib import Path

# Import shared utility function
sys.path.insert(0, str(Path(__file__).parent))
from utils import get_in_progress_blog_files

root = Path(__file__).resolve().parents[1]
eligible = [md.as_posix() for md in get_in_progress_blog_files(root)]
print(' '.join(eligible))
