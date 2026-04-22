#!/usr/bin/env python3
"""
Validation script for OhMyOpenCode integration documentation.

This script validates that the integration documentation follows the expected format
and includes all required sections.
"""

import os
import sys
from pathlib import Path


class IntegrationValidator:
    """Validator for integration documentation."""
    
    def __init__(self, documentation_path):
        self.documentation_path = Path(documentation_path)
        self.errors = []
        self.warnings = []
        
    def validate_file_exists(self):
        """Validate that the documentation file exists."""
        if not self.documentation_path.exists():
            self.errors.append(f"Documentation file not found: {self.documentation_path}")
            return False
        return True
    
    def validate_required_sections(self):
        """Validate that all required sections are present."""
        required_sections = [
            "OhMyOpenCode Integration",
            "Multi-Agent Workflow"
        ]
        
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            for section in required_sections:
                if section not in content:
                    self.errors.append(f"Missing required section: {section}")
            
            return len(self.errors) == 0
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_integration_steps(self):
        """Validate that integration steps are documented."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if integration steps are documented
            if "Step" not in content and "1." not in content:
                self.warnings.append("Integration steps may not be documented")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_examples(self):
        """Validate that workflow examples are present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if examples are present
            if "Example" not in content:
                self.warnings.append("Workflow examples may not be present")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def run_all_validations(self):
        """Run all validation checks."""
        print("Running integration documentation validation...")
        print(f"Validating file: {self.documentation_path}")
        print()
        
        validations = [
            ("File exists", self.validate_file_exists),
            ("Required sections", self.validate_required_sections),
            ("Integration steps", self.validate_integration_steps),
            ("Examples", self.validate_examples)
        ]
        
        for name, validation_func in validations:
            print(f"Checking {name}...", end=" ")
            if validation_func():
                print("[PASS]")
            else:
                print("[FAIL]")
        
        print()
        
        # Print results
        if self.errors:
            print("ERRORS:")
            for error in self.errors:
                print(f"  - {error}")
            print()
        
        if self.warnings:
            print("WARNINGS:")
            for warning in self.warnings:
                print(f"  - {warning}")
            print()
        
        if not self.errors:
            print("[SUCCESS] All validations passed!")
            return True
        else:
            print("[FAILURE] Validation failed!")
            return False


def main():
    """Main function."""
    # Configure UTF-8 encoding for output
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    
    # Get the path to the integration documentation
    script_dir = Path(__file__).parent
    documentation_path = script_dir.parent / "integration_documentation.md"
    
    # Create validator and run validations
    validator = IntegrationValidator(documentation_path)
    success = validator.run_all_validations()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()