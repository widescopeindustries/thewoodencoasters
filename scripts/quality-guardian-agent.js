#!/usr/bin/env node

/**
 * CODE QUALITY GUARDIAN AGENT
 *
 * Pursuit Agent #1: Continuous code quality enforcement
 *
 * Monitors and enforces:
 * - ESLint rules and code standards
 * - TypeScript type checking (strict mode)
 * - Code complexity and maintainability
 * - Import/export consistency
 *
 * Run: node scripts/quality-guardian-agent.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const REPORT_DIR = path.join(PROJECT_ROOT, 'scripts', 'reports');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`  ${title}`, 'bright');
  console.log('='.repeat(60) + '\n');
}

function ensureReportDir() {
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }
}

function runCommand(command, description) {
  try {
    log(`Running: ${description}...`, 'cyan');
    const output = execSync(command, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || '',
      error: error.stderr || error.message
    };
  }
}

function checkESLint() {
  logSection('📋 ESLint Code Standards Check');

  const result = runCommand(
    'npm run lint -- --max-warnings 0',
    'ESLint validation'
  );

  if (result.success) {
    log('✓ All ESLint checks passed!', 'green');
    return { passed: true, issues: 0 };
  } else {
    log('✗ ESLint issues found:', 'red');
    console.log(result.output || result.error);

    // Count issues
    const issueCount = (result.output + result.error).split('\n')
      .filter(line => line.includes('error') || line.includes('warning')).length;

    return { passed: false, issues: issueCount };
  }
}

function checkTypeScript() {
  logSection('🔍 TypeScript Type Checking');

  const result = runCommand(
    'npx tsc --noEmit --pretty',
    'TypeScript type validation'
  );

  if (result.success) {
    log('✓ No TypeScript errors found!', 'green');
    return { passed: true, errors: 0 };
  } else {
    log('✗ TypeScript errors found:', 'red');
    console.log(result.error || result.output);

    // Count errors
    const errorCount = (result.output + result.error).split('\n')
      .filter(line => line.includes('error TS')).length;

    return { passed: false, errors: errorCount };
  }
}

function analyzeCodeComplexity() {
  logSection('🧮 Code Complexity Analysis');

  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const dirs = ['app', 'components', 'lib'];

  let totalFiles = 0;
  let largeFiles = [];
  let lineStats = { total: 0, min: Infinity, max: 0 };

  dirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(dirPath)) return;

    function scanDirectory(currentPath) {
      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          totalFiles++;
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n').length;

          lineStats.total += lines;
          lineStats.min = Math.min(lineStats.min, lines);
          lineStats.max = Math.max(lineStats.max, lines);

          // Flag files over 200 lines (per .claude/rules standard)
          if (lines > 200) {
            largeFiles.push({
              path: path.relative(PROJECT_ROOT, fullPath),
              lines
            });
          }
        }
      });
    }

    scanDirectory(dirPath);
  });

  const avgLines = Math.round(lineStats.total / totalFiles);

  log(`Total files analyzed: ${totalFiles}`, 'cyan');
  log(`Average lines per file: ${avgLines}`, 'cyan');
  log(`Largest file: ${lineStats.max} lines`, 'cyan');
  log(`Smallest file: ${lineStats.min} lines`, 'cyan');

  if (largeFiles.length > 0) {
    log(`\n⚠️  Files exceeding 200 lines (${largeFiles.length}):`, 'yellow');
    largeFiles.forEach(file => {
      log(`  - ${file.path} (${file.lines} lines)`, 'yellow');
    });
  } else {
    log('\n✓ All files under 200 lines!', 'green');
  }

  return {
    totalFiles,
    avgLines,
    largeFiles: largeFiles.length,
    maxLines: lineStats.max
  };
}

function checkImportConsistency() {
  logSection('📦 Import/Export Consistency Check');

  const issues = [];
  const dirs = ['app', 'components', 'lib'];

  dirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(dirPath)) return;

    function scanFiles(currentPath) {
      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanFiles(fullPath);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const relativePath = path.relative(PROJECT_ROOT, fullPath);

          // Check for relative imports that should use @/ alias
          const relativeImports = content.match(/from ['"]\.\.\/\.\.\//g);
          if (relativeImports && relativeImports.length > 0) {
            issues.push({
              file: relativePath,
              type: 'relative-import',
              message: `Consider using @/ path alias instead of ../../`
            });
          }

          // Check for unused imports (simple heuristic)
          const importMatches = content.match(/import\s+{([^}]+)}/g);
          if (importMatches) {
            importMatches.forEach(importStatement => {
              const imports = importStatement.match(/{\s*([^}]+)\s*}/)[1]
                .split(',')
                .map(i => i.trim());

              imports.forEach(importName => {
                const cleanName = importName.split(' as ')[0].trim();
                // Simple check: see if imported name appears in code after import
                const usageRegex = new RegExp(`\\b${cleanName}\\b`, 'g');
                const matches = content.match(usageRegex);
                if (matches && matches.length === 1) { // Only in import statement
                  issues.push({
                    file: relativePath,
                    type: 'potentially-unused',
                    message: `Potentially unused import: ${cleanName}`
                  });
                }
              });
            });
          }
        }
      });
    }

    scanFiles(dirPath);
  });

  if (issues.length > 0) {
    log(`⚠️  Found ${issues.length} import/export suggestions:`, 'yellow');
    issues.slice(0, 10).forEach(issue => {
      log(`  - ${issue.file}: ${issue.message}`, 'yellow');
    });
    if (issues.length > 10) {
      log(`  ... and ${issues.length - 10} more`, 'yellow');
    }
  } else {
    log('✓ Import/export consistency looks good!', 'green');
  }

  return { issues: issues.length };
}

function generateReport(results) {
  logSection('📊 Quality Guardian Report');

  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    agent: 'Code Quality Guardian',
    results: {
      eslint: results.eslint,
      typescript: results.typescript,
      complexity: results.complexity,
      imports: results.imports
    },
    summary: {
      overallStatus: results.eslint.passed && results.typescript.passed ? 'PASS' : 'FAIL',
      totalIssues: results.eslint.issues + results.typescript.errors + results.imports.issues,
      recommendations: []
    }
  };

  // Generate recommendations
  if (!results.eslint.passed) {
    report.summary.recommendations.push(
      `Fix ${results.eslint.issues} ESLint issues to meet code standards`
    );
  }
  if (!results.typescript.passed) {
    report.summary.recommendations.push(
      `Resolve ${results.typescript.errors} TypeScript type errors`
    );
  }
  if (results.complexity.largeFiles > 0) {
    report.summary.recommendations.push(
      `Refactor ${results.complexity.largeFiles} files exceeding 200 lines`
    );
  }
  if (results.imports.issues > 5) {
    report.summary.recommendations.push(
      `Review import statements for ${results.imports.issues} potential improvements`
    );
  }

  // Save report
  ensureReportDir();
  const reportFile = path.join(REPORT_DIR, `quality-guardian-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

  // Display summary
  const status = report.summary.overallStatus;
  const statusColor = status === 'PASS' ? 'green' : 'red';

  log(`Status: ${status}`, statusColor);
  log(`Total Issues: ${report.summary.totalIssues}`, 'cyan');

  if (report.summary.recommendations.length > 0) {
    log('\n📝 Recommendations:', 'yellow');
    report.summary.recommendations.forEach(rec => {
      log(`  • ${rec}`, 'yellow');
    });
  }

  log(`\n💾 Report saved: ${path.relative(PROJECT_ROOT, reportFile)}`, 'blue');

  return report;
}

async function main() {
  log('\n🛡️  CODE QUALITY GUARDIAN AGENT', 'bright');
  log('Pursuing code perfection for thewoodencoasters.com...', 'cyan');

  const results = {
    eslint: checkESLint(),
    typescript: checkTypeScript(),
    complexity: analyzeCodeComplexity(),
    imports: checkImportConsistency()
  };

  const report = generateReport(results);

  logSection('✨ Guardian Sweep Complete');

  if (report.summary.overallStatus === 'PASS') {
    log('Code quality is excellent! Keep it up! 🎉', 'green');
  } else {
    log('Action required to maintain code perfection standards.', 'yellow');
  }

  // Exit with error code if there are critical issues
  if (!results.eslint.passed || !results.typescript.passed) {
    process.exit(1);
  }
}

main().catch(error => {
  log(`\n❌ Guardian agent error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
