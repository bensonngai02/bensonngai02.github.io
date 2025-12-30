#!/usr/bin/env python3
"""
Validate blog markdown files:
- Skip files without 'in progress' tag in frontmatter.
- Ensure asset references (/assets..., ./assets..., assets/...) exist.
Print missing references and exit 1 on failure.
"""
import re
import sys
from pathlib import Path

# Import shared utility function
sys.path.insert(0, str(Path(__file__).parent))
from utils import get_in_progress_blog_files

root = Path(__file__).resolve().parents[1]
missing = []
asset_pattern = re.compile(r'\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)')


def main():
    for md in get_in_progress_blog_files(root):

        content = md.read_text()
        for match in asset_pattern.finditer(content):
            url = match.group(1)
            if url.startswith(('http://', 'https://', '#')):
                continue
            if not (url.startswith('/assets') or url.startswith('./assets') or url.startswith('assets/')):
                continue

            if url.startswith('/'):
                target = root / 'public' / url.lstrip('/')
            else:
                target = (md.parent / url).resolve()

            if not target.exists():
                missing.append(f"{md.name}: missing {url} (resolved: {target.relative_to(root)})")

    if missing:
        print("Missing referenced assets:")
        for m in missing:
            print("  " + m)
        sys.exit(1)


if __name__ == "__main__":
    main()
