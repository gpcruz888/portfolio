import os
import glob
import json
import re

with open("translations_map.json", "r", encoding="utf-8") as f:
    mapping = json.load(f)

# Sort all keys by length descending
# Separate into multi-word / tagged / structured phrases and isolated single words
phrases = []
single_words = []

for k, v in mapping.items():
    if any(c in k for c in (" ", "\n", "<", ">", "/", "-", '"', '“', '”', ':', '*', '.')) or len(k) > 15:
        phrases.append((k, v))
    else:
        single_words.append((k, v))

phrases.sort(key=lambda x: len(x[0]), reverse=True)
single_words.sort(key=lambda x: len(x[0]), reverse=True)

print(f"Loaded {len(phrases)} phrases and {len(single_words)} single words.")

html_files = sorted(glob.glob("*.html"))

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. First, replace lang attributes
    content = content.replace('lang="en-US"', 'lang="pt-PT"').replace('xml:lang="en-US"', 'xml:lang="pt-PT"')

    # 2. Replace all multi-word phrases and tagged snippets
    for k, v in phrases:
        if k in content:
            content = content.replace(k, v)

    # 3. For single words, replace them only inside HTML text nodes or placeholders, avoiding tag attributes or filenames
    # Specifically, single words should match when preceded by > or whitespace and followed by < or whitespace
    for word, trans in single_words:
        # Match >\s*WORD\s*<
        pattern1 = re.compile(rf'(>[\s\n\r]*){re.escape(word)}([\s\n\r]*<)')
        content = pattern1.sub(rf'\g<1>{trans}\g<2>', content)
        
        # Match placeholder="WORD"
        pattern2 = re.compile(rf'(placeholder=[\'"]){re.escape(word)}([\'"])')
        content = pattern2.sub(rf'\g<1>{trans}\g<2>', content)

    # Extra refinements for menu items, titles, and breadcrumbs that might have leading/trailing whitespace
    extra_menu_items = [
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Home([\s\n\r]*</a>)', r'\g<1>Início\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)About Us([\s\n\r]*</a>)', r'\g<1>Sobre Nós\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Services([\s\n\r]*</a>)', r'\g<1>Serviços\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Page([\s\n\r]*</a>)', r'\g<1>Páginas\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Pages([\s\n\r]*</a>)', r'\g<1>Páginas\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Blog([\s\n\r]*</a>)', r'\g<1>Blog\g<2>'),
        (r'(<a\s+href="[^"]*"\s+class="[^"]*">[\s\n\r]*)Contact([\s\n\r]*</a>)', r'\g<1>Contacto\g<2>'),
        (r'(<span>[\s\n\r]*)Home([\s\n\r]*</span>)', r'\g<1>Início\g<2>'),
        (r'(<span>[\s\n\r]*)About Us([\s\n\r]*</span>)', r'\g<1>Sobre Nós\g<2>'),
        (r'(<span>[\s\n\r]*)Services([\s\n\r]*</span>)', r'\g<1>Serviços\g<2>'),
        (r'(<span>[\s\n\r]*)Page([\s\n\r]*</span>)', r'\g<1>Páginas\g<2>'),
        (r'(<span>[\s\n\r]*)Pages([\s\n\r]*</span>)', r'\g<1>Páginas\g<2>'),
        (r'(<span>[\s\n\r]*)Blog([\s\n\r]*</span>)', r'\g<1>Blog\g<2>'),
        (r'(<span>[\s\n\r]*)Contact([\s\n\r]*</span>)', r'\g<1>Contacto\g<2>'),
    ]
    for pat, rep in extra_menu_items:
        content = re.sub(pat, rep, content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Processed {filepath}")

print("All files translated successfully!")
