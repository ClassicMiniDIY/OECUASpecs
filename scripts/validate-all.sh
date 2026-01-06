#!/bin/bash
#
# OpenECU Alliance Content Validator
#
# Validates all adapters, protocols, and models against their JSON schemas.
#
# Usage:
#   ./scripts/validate-all.sh           # Validate all content
#   ./scripts/validate-all.sh adapters  # Validate only adapters
#   ./scripts/validate-all.sh protocols # Validate only protocols
#   ./scripts/validate-all.sh models    # Validate only models
#
# Requirements:
#   npm install -g ajv-cli
#   - OR -
#   pip install check-jsonschema

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
PASSED=0
FAILED=0

# Check for validator
if command -v ajv &> /dev/null; then
    VALIDATOR="ajv"
elif command -v check-jsonschema &> /dev/null; then
    VALIDATOR="check-jsonschema"
else
    echo -e "${RED}Error: No JSON Schema validator found.${NC}"
    echo ""
    echo "Install one of the following:"
    echo "  npm install -g ajv-cli"
    echo "  pip install check-jsonschema"
    exit 1
fi

echo "OpenECU Alliance Content Validator"
echo "Using validator: $VALIDATOR"
echo "=================================="
echo ""

# Validate function
validate() {
    local schema="$1"
    local pattern="$2"
    local name="$3"

    echo -e "${YELLOW}Validating $name...${NC}"

    local files=()
    while IFS= read -r -d '' file; do
        files+=("$file")
    done < <(find "$ROOT_DIR" -path "$pattern" -print0 2>/dev/null)

    if [ ${#files[@]} -eq 0 ]; then
        echo "  No files found matching: $pattern"
        return
    fi

    for file in "${files[@]}"; do
        TOTAL=$((TOTAL + 1))
        local relative_path="${file#$ROOT_DIR/}"

        if [ "$VALIDATOR" = "ajv" ]; then
            if ajv validate -s "$schema" -d "$file" --strict=false &> /dev/null; then
                echo -e "  ${GREEN}✓${NC} $relative_path"
                PASSED=$((PASSED + 1))
            else
                echo -e "  ${RED}✗${NC} $relative_path"
                ajv validate -s "$schema" -d "$file" --strict=false 2>&1 | head -5
                FAILED=$((FAILED + 1))
            fi
        else
            if check-jsonschema --schemafile "$schema" "$file" &> /dev/null; then
                echo -e "  ${GREEN}✓${NC} $relative_path"
                PASSED=$((PASSED + 1))
            else
                echo -e "  ${RED}✗${NC} $relative_path"
                check-jsonschema --schemafile "$schema" "$file" 2>&1 | head -5
                FAILED=$((FAILED + 1))
            fi
        fi
    done
    echo ""
}

# Determine what to validate
WHAT="${1:-all}"

case "$WHAT" in
    adapters)
        validate "$ROOT_DIR/schema/adapter.schema.json" "*/adapters/*/*.adapter.yaml" "Adapters"
        validate "$ROOT_DIR/schema/adapter.schema.json" "*/adapters/*/*.adapter.yml" "Adapters (yml)"
        ;;
    protocols)
        validate "$ROOT_DIR/schema/protocol.schema.json" "*/protocols/*/*.protocol.yaml" "Protocols"
        validate "$ROOT_DIR/schema/protocol.schema.json" "*/protocols/*/*.protocol.yml" "Protocols (yml)"
        ;;
    models)
        validate "$ROOT_DIR/schema/model.schema.json" "*/models/*/*/*.model.yaml" "Models"
        validate "$ROOT_DIR/schema/model.schema.json" "*/models/*/*/*.model.yml" "Models (yml)"
        ;;
    all|*)
        validate "$ROOT_DIR/schema/adapter.schema.json" "*/adapters/*/*.adapter.yaml" "Adapters"
        validate "$ROOT_DIR/schema/adapter.schema.json" "*/adapters/*/*.adapter.yml" "Adapters (yml)"
        validate "$ROOT_DIR/schema/protocol.schema.json" "*/protocols/*/*.protocol.yaml" "Protocols"
        validate "$ROOT_DIR/schema/protocol.schema.json" "*/protocols/*/*.protocol.yml" "Protocols (yml)"
        validate "$ROOT_DIR/schema/model.schema.json" "*/models/*/*/*.model.yaml" "Models"
        validate "$ROOT_DIR/schema/model.schema.json" "*/models/*/*/*.model.yml" "Models (yml)"
        ;;
esac

# Summary
echo "=================================="
echo "Validation Summary"
echo "=================================="
echo -e "Total:  $TOTAL"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"

if [ $FAILED -gt 0 ]; then
    exit 1
fi

echo ""
echo -e "${GREEN}All validations passed!${NC}"
