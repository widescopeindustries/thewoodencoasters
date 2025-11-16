#!/usr/bin/env node

/**
 * TEST COVERAGE ENFORCER AGENT
 *
 * Pursuit Agent #2: Comprehensive testing and coverage tracking
 *
 * Monitors and enforces:
 * - Component test coverage
 * - Critical business logic testing
 * - Test file existence for components
 * - Test quality and assertions
 *
 * Run: node scripts/test-enforcer-agent.js
 */

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

function findSourceFiles() {
  const sourceFiles = [];
  const dirs = ['app', 'components', 'lib'];
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];

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
          // Skip test files
          if (!item.includes('.test.') && !item.includes('.spec.')) {
            sourceFiles.push({
              fullPath,
              relativePath: path.relative(PROJECT_ROOT, fullPath),
              name: item,
              dir: path.dirname(path.relative(PROJECT_ROOT, fullPath))
            });
          }
        }
      });
    }

    scanDirectory(dirPath);
  });

  return sourceFiles;
}

function findTestFiles() {
  const testFiles = [];
  const testDirs = ['__tests__', 'tests', 'app', 'components', 'lib'];
  const testPatterns = ['.test.', '.spec.'];

  testDirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(dirPath)) return;

    function scanDirectory(currentPath) {
      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (testPatterns.some(pattern => item.includes(pattern))) {
          testFiles.push({
            fullPath,
            relativePath: path.relative(PROJECT_ROOT, fullPath),
            name: item
          });
        }
      });
    }

    scanDirectory(dirPath);
  });

  return testFiles;
}

function analyzeTestCoverage() {
  logSection('🧪 Test Coverage Analysis');

  const sourceFiles = findSourceFiles();
  const testFiles = findTestFiles();

  log(`Source files found: ${sourceFiles.length}`, 'cyan');
  log(`Test files found: ${testFiles.length}`, 'cyan');

  const uncoveredFiles = [];
  const testFileNames = new Set(testFiles.map(t => {
    // Extract the source filename from test file
    return t.name.replace('.test.', '.').replace('.spec.', '.');
  }));

  sourceFiles.forEach(file => {
    const hasTest = testFileNames.has(file.name);
    if (!hasTest) {
      uncoveredFiles.push(file);
    }
  });

  const coveragePercent = sourceFiles.length > 0
    ? Math.round(((sourceFiles.length - uncoveredFiles.length) / sourceFiles.length) * 100)
    : 0;

  log(`\nTest Coverage: ${coveragePercent}%`, coveragePercent >= 80 ? 'green' : 'yellow');

  if (uncoveredFiles.length > 0) {
    log(`\n⚠️  Files without tests (${uncoveredFiles.length}):`, 'yellow');
    uncoveredFiles.slice(0, 15).forEach(file => {
      log(`  - ${file.relativePath}`, 'yellow');
    });
    if (uncoveredFiles.length > 15) {
      log(`  ... and ${uncoveredFiles.length - 15} more`, 'yellow');
    }
  } else {
    log('\n✓ All source files have corresponding tests!', 'green');
  }

  return {
    totalSources: sourceFiles.length,
    totalTests: testFiles.length,
    uncovered: uncoveredFiles.length,
    coveragePercent,
    uncoveredFiles: uncoveredFiles.map(f => f.relativePath)
  };
}

function identifyCriticalPaths() {
  logSection('🎯 Critical Path Identification');

  const criticalFiles = [
    { path: 'lib/store/cart.ts', reason: 'Core business logic - shopping cart' },
    { path: 'lib/data/products.ts', reason: 'Product data management' },
    { path: 'components/ProductCard.tsx', reason: 'Key UI component' },
    { path: 'components/Header.tsx', reason: 'Navigation component' },
    { path: 'app/cart/page.tsx', reason: 'Critical checkout flow' },
    { path: 'app/products/page.tsx', reason: 'Main product listing' },
  ];

  const criticalNeeds = [];

  criticalFiles.forEach(({ path: filePath, reason }) => {
    const fullPath = path.join(PROJECT_ROOT, filePath);
    if (!fs.existsSync(fullPath)) {
      return; // Skip if file doesn't exist
    }

    // Check if test exists
    const dir = path.dirname(fullPath);
    const name = path.basename(filePath);
    const testPatterns = [
      name.replace(/\.(tsx?|jsx?)$/, '.test.$1'),
      name.replace(/\.(tsx?|jsx?)$/, '.spec.$1'),
      path.join(dir, '__tests__', name),
    ];

    const hasTest = testPatterns.some(pattern => {
      const testPath = typeof pattern === 'string' && !pattern.includes('__tests__')
        ? path.join(dir, path.basename(pattern))
        : pattern;
      return fs.existsSync(testPath);
    });

    if (!hasTest) {
      criticalNeeds.push({ path: filePath, reason });
    }
  });

  if (criticalNeeds.length > 0) {
    log(`⚠️  Critical files needing tests (${criticalNeeds.length}):`, 'red');
    criticalNeeds.forEach(({ path, reason }) => {
      log(`  - ${path}`, 'red');
      log(`    Reason: ${reason}`, 'yellow');
    });
  } else {
    log('✓ All critical paths have test coverage!', 'green');
  }

  return {
    totalCritical: criticalFiles.length,
    needsTests: criticalNeeds.length,
    criticalNeeds: criticalNeeds.map(c => c.path)
  };
}

function suggestTestCases() {
  logSection('💡 Test Case Suggestions');

  const suggestions = [];

  // Check cart store
  const cartStorePath = path.join(PROJECT_ROOT, 'lib/store/cart.ts');
  if (fs.existsSync(cartStorePath)) {
    const content = fs.readFileSync(cartStorePath, 'utf8');

    suggestions.push({
      file: 'lib/store/cart.ts',
      cases: [
        'Test addItem adds product to cart with quantity',
        'Test addItem increments quantity for existing items',
        'Test removeItem removes product from cart',
        'Test updateQuantity updates item quantity',
        'Test clearCart empties the cart',
        'Test cart persistence to localStorage',
        'Test cart total calculation',
      ]
    });
  }

  // Check ProductCard component
  const productCardPath = path.join(PROJECT_ROOT, 'components/ProductCard.tsx');
  if (fs.existsSync(productCardPath)) {
    suggestions.push({
      file: 'components/ProductCard.tsx',
      cases: [
        'Test component renders with product data',
        'Test "Add to Cart" button calls addItem',
        'Test price formatting displays correctly',
        'Test image rendering with proper alt text',
        'Test responsive layout on mobile/desktop',
      ]
    });
  }

  // Check product filtering
  const productsPagePath = path.join(PROJECT_ROOT, 'app/products/page.tsx');
  if (fs.existsSync(productsPagePath)) {
    suggestions.push({
      file: 'app/products/page.tsx',
      cases: [
        'Test category filter functionality',
        'Test price range filter',
        'Test search/filter combination',
        'Test "no results" state displays',
        'Test product count displays correctly',
      ]
    });
  }

  if (suggestions.length > 0) {
    suggestions.forEach(({ file, cases }) => {
      log(`\n📝 ${file}:`, 'cyan');
      cases.forEach(testCase => {
        log(`  • ${testCase}`, 'blue');
      });
    });
  }

  return { suggestions };
}

function checkTestingInfrastructure() {
  logSection('🏗️  Testing Infrastructure Check');

  const infrastructure = {
    jest: fs.existsSync(path.join(PROJECT_ROOT, 'jest.config.js')) ||
          fs.existsSync(path.join(PROJECT_ROOT, 'jest.config.ts')),
    vitest: fs.existsSync(path.join(PROJECT_ROOT, 'vitest.config.ts')) ||
            fs.existsSync(path.join(PROJECT_ROOT, 'vitest.config.js')),
    testingLibrary: false,
    playwright: fs.existsSync(path.join(PROJECT_ROOT, 'playwright.config.ts')),
    cypress: fs.existsSync(path.join(PROJECT_ROOT, 'cypress.config.ts')),
  };

  // Check package.json for testing dependencies
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    infrastructure.testingLibrary = '@testing-library/react' in allDeps;
    infrastructure.jest = infrastructure.jest || 'jest' in allDeps;
    infrastructure.vitest = infrastructure.vitest || 'vitest' in allDeps;
    infrastructure.playwright = infrastructure.playwright || '@playwright/test' in allDeps;
    infrastructure.cypress = infrastructure.cypress || 'cypress' in allDeps;
  }

  const installed = Object.entries(infrastructure)
    .filter(([_, value]) => value)
    .map(([key, _]) => key);

  const missing = Object.entries(infrastructure)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  if (installed.length > 0) {
    log('✓ Installed testing tools:', 'green');
    installed.forEach(tool => log(`  • ${tool}`, 'green'));
  }

  if (missing.length > 0) {
    log('\n⚠️  Missing testing tools:', 'yellow');
    missing.forEach(tool => log(`  • ${tool}`, 'yellow'));

    log('\n💡 Recommended setup:', 'cyan');
    log('  npm install --save-dev @testing-library/react @testing-library/jest-dom', 'blue');
    log('  npm install --save-dev vitest @vitejs/plugin-react', 'blue');
    log('  npm install --save-dev @playwright/test', 'blue');
  }

  return infrastructure;
}

function generateReport(results) {
  logSection('📊 Test Enforcer Report');

  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    agent: 'Test Coverage Enforcer',
    results: {
      coverage: results.coverage,
      critical: results.critical,
      infrastructure: results.infrastructure,
      suggestions: results.suggestions
    },
    summary: {
      overallStatus: results.coverage.coveragePercent >= 80 && results.critical.needsTests === 0 ? 'PASS' : 'NEEDS_WORK',
      coveragePercent: results.coverage.coveragePercent,
      criticalCovered: results.critical.totalCritical - results.critical.needsTests,
      recommendations: []
    }
  };

  // Generate recommendations
  if (results.coverage.coveragePercent < 80) {
    report.summary.recommendations.push(
      `Increase test coverage from ${results.coverage.coveragePercent}% to at least 80%`
    );
  }

  if (results.critical.needsTests > 0) {
    report.summary.recommendations.push(
      `Add tests for ${results.critical.needsTests} critical business logic files`
    );
  }

  if (!results.infrastructure.vitest && !results.infrastructure.jest) {
    report.summary.recommendations.push(
      'Install a test framework (Vitest recommended for Next.js)'
    );
  }

  if (!results.infrastructure.testingLibrary) {
    report.summary.recommendations.push(
      'Install @testing-library/react for component testing'
    );
  }

  if (!results.infrastructure.playwright && !results.infrastructure.cypress) {
    report.summary.recommendations.push(
      'Add E2E testing framework (Playwright recommended)'
    );
  }

  // Save report
  ensureReportDir();
  const reportFile = path.join(REPORT_DIR, `test-enforcer-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

  // Display summary
  const status = report.summary.overallStatus;
  const statusColor = status === 'PASS' ? 'green' : 'yellow';

  log(`Status: ${status}`, statusColor);
  log(`Coverage: ${report.summary.coveragePercent}%`, 'cyan');
  log(`Critical Paths Covered: ${report.summary.criticalCovered}/${results.critical.totalCritical}`, 'cyan');

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
  log('\n🧪 TEST COVERAGE ENFORCER AGENT', 'bright');
  log('Pursuing comprehensive testing for thewoodencoasters.com...', 'cyan');

  const results = {
    coverage: analyzeTestCoverage(),
    critical: identifyCriticalPaths(),
    infrastructure: checkTestingInfrastructure(),
    suggestions: suggestTestCases()
  };

  const report = generateReport(results);

  logSection('✨ Enforcement Sweep Complete');

  if (report.summary.overallStatus === 'PASS') {
    log('Test coverage is excellent! Keep it up! 🎉', 'green');
  } else {
    log('Action recommended to improve test coverage and quality.', 'yellow');
  }

  // Note: We don't exit with error code as this is aspirational
  // Tests should be encouraged but not block deployment
}

main().catch(error => {
  log(`\n❌ Enforcer agent error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
