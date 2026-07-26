# Installation

Install the `quality` runtime pack from the independently versioned
`gabros20/quality-skill` repository.

## Prerequisites

- An Agent Skills-compatible client.
- No skill-specific credentials or tools are required. `quality` is tool-agnostic; it names which
  class of tool a job needs (an accessibility scanner, a load-testing tool, a security scanner, a
  mutation-testing runner) and recommends re-verifying current versions/thresholds at analysis time
  (anti-staleness), but ships no keys and requires no fixed toolchain.

## Install with skills.sh

```bash
npx skills add gabros20/quality-skill
```

## Clone and install

```bash
git clone https://github.com/gabros20/quality-skill.git
cd quality-skill
./install.sh codex
```

Available targets:

| Argument | Destination |
|---|---|
| `codex` | `${CODEX_HOME:-$HOME/.codex}/skills/quality/` |
| `agents` | `~/.agents/skills/quality/` |
| `claude` | `~/.claude/skills/quality/` |
| `cursor` | `~/.cursor/skills/quality/` |
| `antigravity` | Gemini IDE and Antigravity CLI skill paths |
| `opencode` | `~/.config/opencode/skills/quality/` |
| `grok` | `~/.grok/skills/quality/` |
| `hermes` | `~/.hermes/skills/quality/` |
| `all` | Claude, Codex, and the cross-agent path |

The installer stages a complete copy before replacing an existing installation. If replacement
fails, it restores the previous copy.

## Verify

Start a new client session and use the client's supported invocation form:

- Codex: `$quality`
- Slash-command clients: `/quality`
- Other clients: an `@` mention, skill tool, or natural-language trigger

For Codex, verify the installed files directly:

```bash
test -f "${CODEX_HOME:-$HOME/.codex}/skills/quality/SKILL.md"
```

## Update

```bash
cd quality-skill
git pull --ff-only
./install.sh codex
```

Review `CHANGELOG.md` and GitHub Releases for version history. Version metadata intentionally stays
outside runtime `SKILL.md`.

## Uninstall

```bash
rm -rf "${CODEX_HOME:-$HOME/.codex}/skills/quality"
```
