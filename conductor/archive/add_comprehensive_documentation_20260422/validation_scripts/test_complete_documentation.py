#!/usr/bin/env python3
"""
Validation script for complete documentation.

This script validates that the complete documentation follows the expected format
and includes all required sections.
"""

import os
import sys
from pathlib import Path


class CompleteDocumentationValidator:
    """Validator for complete documentation."""
    
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
            "Command Reference",
            "Common Workflows",
            "Error Handling",
            "Integration Guide"
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
    
    def validate_table_of_contents(self):
        """Validate that table of contents is present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if table of contents is present
            if "Table of Contents" not in content and "TOC" not in content:
                self.warnings.append("Table of contents may not be present")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_navigation(self):
        """Validate that navigation is present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if navigation is present
            if "Previous" not in content and "Next" not in content:
                self.warnings.append("Navigation may not be present")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def run_all_validations(self):
        """Run all validation checks."""
        print("Running complete documentation validation...")
        print(f"Validating file: {self.documentation_path}")
        print()
        
        validations = [
            ("File exists", self.validate_file_exists),
            ("Required sections", self.validate_required_sections),
            ("Table of contents", self.validate_table_of_contents),
            ("Navigation", self.validate_navigation)
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
    
    # Get the path to the complete documentation
    script_dir = Path(__file__).parent
    documentation_path = script_dir.parent / "complete_documentation.md"
    
    # Create validator and run validations
    validator = CompleteDocumentationValidator(documentation_path)
    success = validator.run_all_validations()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()