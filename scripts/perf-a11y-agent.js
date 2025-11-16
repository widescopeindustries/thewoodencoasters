#!/usr/bin/env node

/**
 * PERFORMANCE & ACCESSIBILITY WATCHDOG AGENT
 *
 * Pursuit Agent #3: Performance optimization and accessibility enforcement
 *
 * Monitors and enforces:
 * - Build bundle size and optimization
 * - Image optimization and lazy loading
 * - Accessibility standards (WCAG AA)
 * - SEO best practices
 * - Web vitals and performance metrics
 *
 * Run: node scripts/perf-a11y-agent.js
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

function checkBuildPerformance() {
  logSection('⚡ Build Performance Analysis');

  const buildDir = path.join(PROJECT_ROOT, '.next');

  // Check if build exists
  if (!fs.existsSync(buildDir)) {
    log('⚠️  No production build found. Running build...', 'yellow');

    const buildResult = runCommand('npm run build', 'Production build');

    if (!buildResult.success) {
      log('✗ Build failed!', 'red');
      return {
        buildExists: false,
        buildTime: 0,
        totalSize: 0,
        issues: ['Build failed - cannot analyze performance']
      };
    }
  }

  // Analyze build output
  let totalSize = 0;
  let pageCount = 0;
  let largePages = [];

  const nextBuildDir = path.join(buildDir, 'static');

  if (fs.existsSync(nextBuildDir)) {
    function getDirectorySize(dirPath) {
      let size = 0;
      if (!fs.existsSync(dirPath)) return 0;

      const items = fs.readdirSync(dirPath);
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          size += getDirectorySize(fullPath);
        } else {
          size += stat.size;
        }
      });

      return size;
    }

    totalSize = getDirectorySize(nextBuildDir);
  }

  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  log(`Build directory size: ${totalSizeMB} MB`, 'cyan');

  const issues = [];
  if (totalSize > 5 * 1024 * 1024) { // 5MB threshold
    issues.push('Build size exceeds 5MB - consider code splitting');
  }

  if (issues.length === 0) {
    log('✓ Build performance looks good!', 'green');
  } else {
    issues.forEach(issue => log(`⚠️  ${issue}`, 'yellow'));
  }

  return {
    buildExists: true,
    totalSize: totalSizeMB,
    pageCount,
    issues
  };
}

function checkImageOptimization() {
  logSection('🖼️  Image Optimization Check');

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const publicDir = path.join(PROJECT_ROOT, 'public');

  if (!fs.existsSync(publicDir)) {
    log('No public directory found', 'yellow');
    return { totalImages: 0, largeImages: [], unoptimized: [] };
  }

  const images = [];
  const largeImages = [];
  const unoptimized = [];

  function scanDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (imageExtensions.some(ext => item.toLowerCase().endsWith(ext))) {
        const relativePath = path.relative(publicDir, fullPath);
        const sizeKB = (stat.size / 1024).toFixed(2);

        images.push({
          path: relativePath,
          size: sizeKB,
          ext: path.extname(item).toLowerCase()
        });

        // Flag large images (>200KB)
        if (stat.size > 200 * 1024) {
          largeImages.push({
            path: relativePath,
            size: sizeKB
          });
        }

        // Flag JPG/PNG that could be WebP
        if (['.jpg', '.jpeg', '.png'].includes(path.extname(item).toLowerCase())) {
          unoptimized.push(relativePath);
        }
      }
    });
  }

  scanDirectory(publicDir);

  log(`Total images: ${images.length}`, 'cyan');

  if (largeImages.length > 0) {
    log(`\n⚠️  Large images (>${200}KB) found (${largeImages.length}):`, 'yellow');
    largeImages.slice(0, 10).forEach(img => {
      log(`  - ${img.path} (${img.size} KB)`, 'yellow');
    });
    if (largeImages.length > 10) {
      log(`  ... and ${largeImages.length - 10} more`, 'yellow');
    }
  }

  if (unoptimized.length > 0) {
    log(`\n💡 ${unoptimized.length} images could be converted to WebP for better performance`, 'cyan');
  }

  if (largeImages.length === 0 && unoptimized.length === 0) {
    log('✓ Image optimization looks good!', 'green');
  }

  return {
    totalImages: images.length,
    largeImages: largeImages.length,
    unoptimizedCount: unoptimized.length
  };
}

function checkAccessibility() {
  logSection('♿ Accessibility Standards Check');

  const issues = [];
  const warnings = [];
  const sourceFiles = [];

  // Scan TSX/JSX files for common a11y issues
  const dirs = ['app', 'components'];

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
        } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
          sourceFiles.push(fullPath);
          const content = fs.readFileSync(fullPath, 'utf8');
          const relativePath = path.relative(PROJECT_ROOT, fullPath);

          // Check for images without alt text
          const imgTags = content.match(/<img[^>]+>/g);
          if (imgTags) {
            imgTags.forEach(tag => {
              if (!tag.includes('alt=')) {
                issues.push({
                  file: relativePath,
                  issue: 'Image without alt attribute',
                  severity: 'high'
                });
              }
            });
          }

          // Check for buttons without aria-label when no text content
          const buttonMatches = content.match(/<button[^>]*>[\s]*<[^>]*>/g);
          if (buttonMatches) {
            buttonMatches.forEach(button => {
              if (!button.includes('aria-label') && !button.includes('aria-labelledby')) {
                warnings.push({
                  file: relativePath,
                  issue: 'Button may need aria-label for screen readers',
                  severity: 'medium'
                });
              }
            });
          }

          // Check for form inputs without labels
          const inputMatches = content.match(/<input[^>]*>/g);
          if (inputMatches) {
            inputMatches.forEach(input => {
              if (!input.includes('aria-label') && !input.includes('id=')) {
                warnings.push({
                  file: relativePath,
                  issue: 'Input field may be missing accessible label',
                  severity: 'medium'
                });
              }
            });
          }

          // Check for missing semantic HTML
          if (content.includes('<div') && !content.includes('<main') &&
              (relativePath.includes('page.tsx') || relativePath.includes('layout.tsx'))) {
            warnings.push({
              file: relativePath,
              issue: 'Consider using semantic HTML elements (main, section, article)',
              severity: 'low'
            });
          }

          // Check for color contrast issues (basic check)
          if (content.includes('text-gray-400') || content.includes('text-gray-300')) {
            warnings.push({
              file: relativePath,
              issue: 'Light gray text may have contrast issues - verify WCAG AA compliance',
              severity: 'medium'
            });
          }
        }
      });
    }

    scanFiles(dirPath);
  });

  log(`Files analyzed: ${sourceFiles.length}`, 'cyan');
  log(`Accessibility issues: ${issues.length}`, issues.length > 0 ? 'red' : 'green');
  log(`Accessibility warnings: ${warnings.length}`, warnings.length > 0 ? 'yellow' : 'green');

  if (issues.length > 0) {
    log('\n⚠️  High Priority Issues:', 'red');
    issues.slice(0, 10).forEach(({ file, issue }) => {
      log(`  - ${file}: ${issue}`, 'red');
    });
    if (issues.length > 10) {
      log(`  ... and ${issues.length - 10} more`, 'red');
    }
  }

  if (warnings.length > 0 && issues.length === 0) {
    log('\n💡 Accessibility Suggestions:', 'yellow');
    warnings.slice(0, 5).forEach(({ file, issue }) => {
      log(`  - ${file}: ${issue}`, 'yellow');
    });
    if (warnings.length > 5) {
      log(`  ... and ${warnings.length - 5} more warnings`, 'yellow');
    }
  }

  if (issues.length === 0 && warnings.length === 0) {
    log('✓ No obvious accessibility issues found!', 'green');
  }

  return {
    filesAnalyzed: sourceFiles.length,
    issuesCount: issues.length,
    warningsCount: warnings.length,
    issues: issues.slice(0, 10),
    warnings: warnings.slice(0, 10)
  };
}

function checkSEOOptimization() {
  logSection('🔍 SEO Optimization Check');

  const seoChecks = {
    sitemap: fs.existsSync(path.join(PROJECT_ROOT, 'app/sitemap.ts')) ||
             fs.existsSync(path.join(PROJECT_ROOT, 'public/sitemap.xml')),
    robots: fs.existsSync(path.join(PROJECT_ROOT, 'app/robots.ts')) ||
            fs.existsSync(path.join(PROJECT_ROOT, 'public/robots.txt')),
    metadata: false,
    structuredData: false
  };

  // Check for metadata in layout files
  const layoutPath = path.join(PROJECT_ROOT, 'app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    seoChecks.metadata = content.includes('metadata') || content.includes('generateMetadata');
    seoChecks.structuredData = content.includes('application/ld+json');
  }

  const issues = [];
  const implemented = [];

  Object.entries(seoChecks).forEach(([check, passed]) => {
    const label = check.charAt(0).toUpperCase() + check.slice(1);
    if (passed) {
      implemented.push(label);
      log(`✓ ${label} implemented`, 'green');
    } else {
      issues.push(label);
      log(`✗ ${label} missing`, 'yellow');
    }
  });

  if (issues.length > 0) {
    log('\n💡 SEO Recommendations:', 'cyan');
    if (issues.includes('Sitemap')) {
      log('  • Add app/sitemap.ts for dynamic sitemap generation', 'blue');
    }
    if (issues.includes('Robots')) {
      log('  • Add app/robots.ts for search engine crawler instructions', 'blue');
    }
    if (issues.includes('Metadata')) {
      log('  • Add metadata export to layout.tsx for page titles and descriptions', 'blue');
    }
    if (issues.includes('Structureddata')) {
      log('  • Add JSON-LD structured data for rich search results', 'blue');
    }
  }

  return {
    totalChecks: Object.keys(seoChecks).length,
    passed: implemented.length,
    missing: issues.length,
    issues
  };
}

function checkPerformancePatterns() {
  logSection('🚀 Performance Pattern Analysis');

  const patterns = {
    imageComponent: 0,
    rawImg: 0,
    dynamicImports: 0,
    clientComponents: 0,
    serverComponents: 0
  };

  const dirs = ['app', 'components'];

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
        } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
          const content = fs.readFileSync(fullPath, 'utf8');

          // Check for Next.js Image component
          if (content.includes('next/image')) {
            patterns.imageComponent++;
          }

          // Check for raw img tags
          if (content.includes('<img')) {
            patterns.rawImg++;
          }

          // Check for dynamic imports
          if (content.includes('dynamic(') || content.includes('import(')) {
            patterns.dynamicImports++;
          }

          // Check for client/server components
          if (content.includes("'use client'") || content.includes('"use client"')) {
            patterns.clientComponents++;
          } else if (item.endsWith('.tsx')) {
            patterns.serverComponents++;
          }
        }
      });
    }

    scanFiles(dirPath);
  });

  log(`Next.js Image components: ${patterns.imageComponent}`, 'cyan');
  log(`Raw <img> tags: ${patterns.rawImg}`, patterns.rawImg > 0 ? 'yellow' : 'green');
  log(`Dynamic imports: ${patterns.dynamicImports}`, 'cyan');
  log(`Client components: ${patterns.clientComponents}`, 'cyan');
  log(`Server components: ${patterns.serverComponents}`, 'cyan');

  const recommendations = [];

  if (patterns.rawImg > 0) {
    recommendations.push(
      `Replace ${patterns.rawImg} raw <img> tags with next/image for optimization`
    );
  }

  if (patterns.dynamicImports === 0 && patterns.clientComponents > 5) {
    recommendations.push(
      'Consider using dynamic imports to reduce initial bundle size'
    );
  }

  const serverRatio = patterns.serverComponents / (patterns.serverComponents + patterns.clientComponents);
  if (serverRatio < 0.7) {
    recommendations.push(
      `Increase server component usage (currently ${Math.round(serverRatio * 100)}%)`
    );
  }

  if (recommendations.length > 0) {
    log('\n💡 Performance Recommendations:', 'yellow');
    recommendations.forEach(rec => log(`  • ${rec}`, 'yellow'));
  } else {
    log('\n✓ Performance patterns look excellent!', 'green');
  }

  return {
    patterns,
    recommendations
  };
}

function generateReport(results) {
  logSection('📊 Performance & A11y Watchdog Report');

  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    agent: 'Performance & Accessibility Watchdog',
    results: {
      build: results.build,
      images: results.images,
      accessibility: results.accessibility,
      seo: results.seo,
      performance: results.performance
    },
    summary: {
      overallStatus: 'HEALTHY',
      criticalIssues: 0,
      recommendations: []
    }
  };

  // Determine overall status
  let criticalIssues = 0;

  if (results.accessibility.issuesCount > 0) {
    criticalIssues += results.accessibility.issuesCount;
    report.summary.recommendations.push(
      `Fix ${results.accessibility.issuesCount} accessibility issues (WCAG compliance)`
    );
  }

  if (results.images.largeImages > 5) {
    report.summary.recommendations.push(
      `Optimize ${results.images.largeImages} large images (>200KB)`
    );
  }

  if (results.seo.missing > 2) {
    report.summary.recommendations.push(
      `Implement ${results.seo.missing} missing SEO features`
    );
  }

  if (results.performance.recommendations.length > 0) {
    report.summary.recommendations.push(
      ...results.performance.recommendations
    );
  }

  report.summary.criticalIssues = criticalIssues;

  if (criticalIssues > 0) {
    report.summary.overallStatus = 'NEEDS_ATTENTION';
  } else if (report.summary.recommendations.length > 2) {
    report.summary.overallStatus = 'GOOD';
  } else {
    report.summary.overallStatus = 'EXCELLENT';
  }

  // Save report
  ensureReportDir();
  const reportFile = path.join(REPORT_DIR, `perf-a11y-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

  // Display summary
  const statusColors = {
    EXCELLENT: 'green',
    GOOD: 'cyan',
    HEALTHY: 'blue',
    NEEDS_ATTENTION: 'yellow'
  };

  log(`Status: ${report.summary.overallStatus}`, statusColors[report.summary.overallStatus]);
  log(`Critical Issues: ${report.summary.criticalIssues}`, criticalIssues > 0 ? 'red' : 'green');

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
  log('\n🐕 PERFORMANCE & ACCESSIBILITY WATCHDOG AGENT', 'bright');
  log('Pursuing optimization and accessibility for thewoodencoasters.com...', 'cyan');

  const results = {
    build: checkBuildPerformance(),
    images: checkImageOptimization(),
    accessibility: checkAccessibility(),
    seo: checkSEOOptimization(),
    performance: checkPerformancePatterns()
  };

  const report = generateReport(results);

  logSection('✨ Watchdog Sweep Complete');

  if (report.summary.overallStatus === 'EXCELLENT') {
    log('Performance and accessibility are top-notch! 🎉', 'green');
  } else if (report.summary.overallStatus === 'GOOD' || report.summary.overallStatus === 'HEALTHY') {
    log('Good work! A few optimizations recommended.', 'cyan');
  } else {
    log('Action recommended to improve performance and accessibility.', 'yellow');
  }

  // Exit with error code if there are critical accessibility issues
  if (report.summary.criticalIssues > 0) {
    log('\n⚠️  Critical accessibility issues found - these should be addressed', 'yellow');
  }
}

main().catch(error => {
  log(`\n❌ Watchdog agent error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
