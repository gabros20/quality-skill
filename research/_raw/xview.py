#!/usr/bin/env python3
"""Compact viewer for xrelay archive files.

Usage:
  python3 xview.py <file.json> [--min-faves N] [--grep REGEX] [--limit N] [--full ID]

Prints one line per tweet: LIKES|REPLIES|BOOKMARKS|VIEWS @handle(followers) DATE URL
                            TEXT (single line)
--full ID prints the complete record for one tweet id.
"""
import json, re, sys, argparse

p = argparse.ArgumentParser()
p.add_argument("file")
p.add_argument("--min-faves", type=int, default=0)
p.add_argument("--grep", default=None)
p.add_argument("--handle", default=None)
p.add_argument("--limit", type=int, default=80)
p.add_argument("--full", default=None)
a = p.parse_args()

d = json.load(open(a.file))
tw = d.get("tweets", d.get("data", {}).get("tweets", []))

if a.full:
    for t in tw:
        if t["id"] == a.full:
            print(json.dumps(t, indent=2, ensure_ascii=False))
            sys.exit(0)
    print("not found"); sys.exit(1)

rx = re.compile(a.grep, re.I) if a.grep else None
rows = []
for t in tw:
    m = t.get("metrics", {}) or {}
    au = t.get("author", {}) or {}
    txt = " ".join((t.get("text") or "").split())
    if m.get("likes", 0) < a.min_faves:
        continue
    if rx and not rx.search(txt) and not rx.search(au.get("handle", "")):
        continue
    if a.handle and a.handle.lower() != (au.get("handle") or "").lower():
        continue
    score = m.get("likes", 0) + 3 * m.get("replies", 0) + 2 * m.get("bookmarks", 0)
    rows.append((score, t, m, au, txt))

rows.sort(key=lambda r: -r[0])
print(f"# {len(rows)} matches (showing {min(len(rows), a.limit)}) from {a.file}")
for score, t, m, au, txt in rows[: a.limit]:
    print(
        f"\n[{t['id']}] L{m.get('likes',0)} R{m.get('replies',0)} B{m.get('bookmarks',0)} V{m.get('views',0)} "
        f"@{au.get('handle')} ({au.get('followers')} foll, verified={au.get('verified')}) "
        f"{t.get('createdAtISO','')[:10]}\n{t.get('url')}\n{txt}"
    )
    for u in (t.get("urls") or [])[:4]:
        if isinstance(u, dict):
            e = u.get("expanded") or u.get("expanded_url") or u.get("url")
        else:
            e = u
        if e and "x.com" not in str(e) and "twitter.com" not in str(e):
            print(f"  -> {e}")
