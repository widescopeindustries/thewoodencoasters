# 🚀 Pursuit Agents - Code Perfection System

Welcome to the **Pursuit Agents** - an automated system in constant pursuit of code perfection for thewoodencoasters.com!

## Overview

Three specialized agents continuously monitor and enforce code quality standards:

1. **🛡️ Code Quality Guardian** - Enforces coding standards and type safety
2. **🧪 Test Coverage Enforcer** - Ensures comprehensive testing
3. **🐕 Performance & Accessibility Watchdog** - Monitors performance and accessibility

## Quick Start

### Run All Agents

```bash
# From project root
./scripts/run-pursuit-agents.sh

# Or using npm
npm run pursuit
```

### Run Individual Agents

```bash
# Code Quality Guardian only
./scripts/run-pursuit-agents.sh quality
npm run pursuit:quality

# Test Coverage Enforcer only
./scripts/run-pursuit-agents.sh test
npm run pursuit:test

# Performance & Accessibility Watchdog only
./scripts/run-pursuit-agents.sh perf
npm run pursuit:perf
```

---

## Agent Details

### 🛡️ Code Quality Guardian

**Purpose:** Maintains code quality, consistency, and type safety across the codebase.

**What it checks:**
- ✅ ESLint rules compliance
- ✅ TypeScript strict type checking
- ✅ Code complexity (files under 200 lines)
- ✅ Import/export consistency
- ✅ Path alias usage (@/ vs ../..)
- ✅ Potentially unused imports

**Run directly:**
```bash
node scripts/quality-guardian-agent.js
```

**Exit codes:**
- `0` - All checks passed
- `1` - ESLint or TypeScript errors found (requires fixes)

**Reports:** `scripts/reports/quality-guardian-*.json`

---

### 🧪 Test Coverage Enforcer

**Purpose:** Ensures comprehensive test coverage and identifies testing gaps.

**What it checks:**
- ✅ Test file existence for source files
- ✅ Coverage percentage tracking
- ✅ Critical business logic testing
- ✅ Testing infrastructure setup
- ✅ Test case suggestions

**Critical paths monitored:**
- `lib/store/cart.ts` - Shopping cart logic
- `lib/data/products.ts` - Product data
- `components/ProductCard.tsx` - Product display
- `components/Header.tsx` - Navigation
- `app/cart/page.tsx` - Checkout flow
- `app/products/page.tsx` - Product listing

**Run directly:**
```bash
node scripts/test-enforcer-agent.js
```

**Exit codes:**
- `0` - Always (informational, doesn't block)

**Reports:** `scripts/reports/test-enforcer-*.json`

**Recommendations:**
The agent provides specific test case suggestions for untested components and business logic.

---

### 🐕 Performance & Accessibility Watchdog

**Purpose:** Monitors performance metrics and accessibility compliance.

**What it checks:**

**Performance:**
- ⚡ Build bundle size analysis
- ⚡ Image optimization (size, format)
- ⚡ Next.js Image component usage
- ⚡ Dynamic imports and code splitting
- ⚡ Server vs. client component ratio

**Accessibility:**
- ♿ WCAG AA compliance checks
- ♿ Image alt text presence
- ♿ Button aria-labels
- ♿ Form input labels
- ♿ Semantic HTML usage
- ♿ Color contrast issues

**SEO:**
- 🔍 Sitemap generation
- 🔍 Robots.txt configuration
- 🔍 Metadata implementation
- 🔍 Structured data (JSON-LD)

**Run directly:**
```bash
node scripts/perf-a11y-agent.js
```

**Exit codes:**
- `0` - No critical issues (may have recommendations)

**Reports:** `scripts/reports/perf-a11y-*.json`

**Status levels:**
- `EXCELLENT` - Everything optimized
- `GOOD` - Minor improvements suggested
- `HEALTHY` - Some optimizations recommended
- `NEEDS_ATTENTION` - Critical issues found

---

## Reports

All agents generate detailed JSON reports in `scripts/reports/`:

```
scripts/reports/
├── quality-guardian-{timestamp}.json
├── test-enforcer-{timestamp}.json
└── perf-a11y-{timestamp}.json
```

Each report includes:
- Timestamp
- Agent name
- Detailed results
- Summary with overall status
- Actionable recommendations

**Note:** The `reports/` directory is git-ignored to keep the repository clean.

---

## Integration

### NPM Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "pursuit": "./scripts/run-pursuit-agents.sh",
    "pursuit:quality": "node scripts/quality-guardian-agent.js",
    "pursuit:test": "node scripts/test-enforcer-agent.js",
    "pursuit:perf": "node scripts/perf-a11y-agent.js"
  }
}
```

### CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Run Pursuit Agents
  run: npm run pursuit
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run quality guardian before commits
npm run pursuit:quality
```

### VS Code Tasks

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Pursuit Agents",
      "type": "shell",
      "command": "npm run pursuit",
      "group": "test"
    }
  ]
}
```

---

## Configuration

### Agent Behavior

Each agent can be customized by editing its source file:

**Quality Guardian** (`quality-guardian-agent.js`):
- Modify file size threshold (default: 200 lines)
- Add custom complexity checks
- Configure ESLint/TypeScript options

**Test Enforcer** (`test-enforcer-agent.js`):
- Add more critical paths to monitor
- Adjust coverage percentage targets
- Customize test case suggestions

**Perf/A11y Watchdog** (`perf-a11y-agent.js`):
- Set image size thresholds (default: 200KB)
- Configure build size limits (default: 5MB)
- Add custom accessibility rules

---

## Philosophy

The Pursuit Agents embody a philosophy of **continuous improvement**:

1. **Automated vigilance** - Constant monitoring without manual effort
2. **Actionable insights** - Clear recommendations, not just problems
3. **Non-blocking** - Inform and guide, don't break workflows
4. **Comprehensive** - Cover quality, testing, performance, and accessibility
5. **Transparent** - Detailed reports for full visibility

---

## Troubleshooting

### Agent fails to run

**Problem:** Permission denied
```bash
chmod +x scripts/run-pursuit-agents.sh
chmod +x scripts/*.js
```

**Problem:** Command not found
```bash
# Run from project root
cd /path/to/thewoodencoasters
./scripts/run-pursuit-agents.sh
```

### Reports not generating

**Problem:** Directory doesn't exist
```bash
mkdir -p scripts/reports
```

### Build analysis fails

**Problem:** No build directory
```bash
# Create a production build first
npm run build
```

---

## Development

### Adding a New Agent

1. Create `scripts/new-agent.js`
2. Follow the existing pattern:
   - Import dependencies
   - Define check functions
   - Generate reports
   - Export main function
3. Add to `run-pursuit-agents.sh`
4. Update documentation

### Modifying Checks

Each agent is self-contained and can be modified independently:

```javascript
// Example: Add new check to quality guardian
function checkMyCustomRule() {
  logSection('🎯 My Custom Check');
  // ... implementation
  return { passed: true, issues: [] };
}
```

---

## Roadmap

Future enhancements planned:

- [ ] Integration with GitHub Actions
- [ ] Slack/Discord notifications
- [ ] Historical trend tracking
- [ ] Coverage diff between commits
- [ ] Automated PR comments
- [ ] Dashboard visualization
- [ ] Custom rule configuration files
- [ ] Plugin system for extensibility

---

## Credits

Built with ❤️ for thewoodencoasters.com by the Pursuit of Perfection team.

**Agent Stack:**
- Node.js for execution
- Native `fs` and `child_process` modules
- ESLint for code quality
- TypeScript for type safety
- Next.js build tools for analysis

---

## License

Part of the thewoodencoasters.com project.

---

## Questions?

For issues or suggestions, check the main project README or open an issue.

**Keep pursuing perfection! 🚀**
