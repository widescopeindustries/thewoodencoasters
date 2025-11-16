#!/bin/bash

###############################################################################
# PURSUIT AGENTS RUNNER
#
# Runs all three code perfection pursuit agents:
# 1. Code Quality Guardian - Enforces code standards and type safety
# 2. Test Coverage Enforcer - Ensures comprehensive testing
# 3. Performance & A11y Watchdog - Monitors performance and accessibility
#
# Usage:
#   ./scripts/run-pursuit-agents.sh              # Run all agents
#   ./scripts/run-pursuit-agents.sh quality      # Run only quality guardian
#   ./scripts/run-pursuit-agents.sh test         # Run only test enforcer
#   ./scripts/run-pursuit-agents.sh perf         # Run only perf/a11y watchdog
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

# Parse arguments
RUN_MODE=${1:-all}

echo ""
echo -e "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${MAGENTA}    🚀 PURSUIT AGENTS FOR THEWOODENCOASTERS.COM                ${NC}"
echo -e "${BOLD}${MAGENTA}    Constant Pursuit of Code Perfection                        ${NC}"
echo -e "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Function to run an agent
run_agent() {
    local agent_name=$1
    local agent_file=$2
    local agent_emoji=$3

    echo ""
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${CYAN}${agent_emoji}  Running: ${agent_name}${NC}"
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    if node "$agent_file"; then
        echo ""
        echo -e "${GREEN}✓ ${agent_name} completed successfully${NC}"
        return 0
    else
        echo ""
        echo -e "${YELLOW}⚠ ${agent_name} completed with warnings${NC}"
        return 1
    fi
}

# Track results
TOTAL_AGENTS=0
PASSED_AGENTS=0

# Run based on mode
case $RUN_MODE in
    quality)
        echo -e "${CYAN}Running Quality Guardian only...${NC}"
        TOTAL_AGENTS=1
        if run_agent "Code Quality Guardian" "$SCRIPT_DIR/quality-guardian-agent.js" "🛡️"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi
        ;;

    test)
        echo -e "${CYAN}Running Test Enforcer only...${NC}"
        TOTAL_AGENTS=1
        if run_agent "Test Coverage Enforcer" "$SCRIPT_DIR/test-enforcer-agent.js" "🧪"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi
        ;;

    perf|a11y)
        echo -e "${CYAN}Running Performance & A11y Watchdog only...${NC}"
        TOTAL_AGENTS=1
        if run_agent "Performance & Accessibility Watchdog" "$SCRIPT_DIR/perf-a11y-agent.js" "🐕"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi
        ;;

    all|*)
        echo -e "${CYAN}Running all pursuit agents...${NC}"
        TOTAL_AGENTS=3

        # Run each agent
        if run_agent "Code Quality Guardian" "$SCRIPT_DIR/quality-guardian-agent.js" "🛡️"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi

        if run_agent "Test Coverage Enforcer" "$SCRIPT_DIR/test-enforcer-agent.js" "🧪"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi

        if run_agent "Performance & Accessibility Watchdog" "$SCRIPT_DIR/perf-a11y-agent.js" "🐕"; then
            PASSED_AGENTS=$((PASSED_AGENTS + 1))
        fi
        ;;
esac

# Final summary
echo ""
echo -e "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${MAGENTA}    📊 PURSUIT AGENTS SUMMARY                                  ${NC}"
echo -e "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "  Agents Run:     ${BOLD}${TOTAL_AGENTS}${NC}"
echo -e "  Passed:         ${BOLD}${GREEN}${PASSED_AGENTS}${NC}"
echo -e "  With Warnings:  ${BOLD}${YELLOW}$((TOTAL_AGENTS - PASSED_AGENTS))${NC}"

echo ""

if [ $PASSED_AGENTS -eq $TOTAL_AGENTS ]; then
    echo -e "${BOLD}${GREEN}✨ All agents report: CODE PERFECTION ACHIEVED! ✨${NC}"
    echo ""
    exit 0
else
    echo -e "${BOLD}${YELLOW}📝 Some agents have recommendations - review reports in scripts/reports/${NC}"
    echo ""
    exit 0  # Don't fail CI, just inform
fi
