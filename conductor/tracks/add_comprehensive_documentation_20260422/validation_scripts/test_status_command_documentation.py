#!/usr/bin/env python3
"""
Validation script for /conductor:status command documentation.

This script validates that the status command documentation follows the expected format
and includes all required sections.
"""

import os
import sys
from pathlib import Path


class StatusCommandValidator:
    """Validator for status command documentation."""
    
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
            "Description",
            "Syntax",
            "Parameters",
            "Usage Examples",
            "Expected Output",
            "Common Errors",
            "Troubleshooting"
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
    
    def validate_description(self):
        """Validate that the description is present and clear."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if description section exists
            if "Description" not in content:
                self.errors.append("Missing Description section")
                return False
            
            # Check if description contains key information
            if "status" not in content.lower() and "overview" not in content.lower():
                self.warnings.append("Description may not clearly explain status functionality")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_syntax(self):
        """Validate that the syntax is present and correct."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if syntax section exists
            if "Syntax" not in content:
                self.errors.append("Missing Syntax section")
                return False
            
            # Check if syntax contains the command
            if "/conductor:status" not in content:
                self.errors.append("Syntax section does not contain the command")
                return False
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_parameters(self):
        """Validate that the parameters section is present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if parameters section exists
            if "Parameters" not in content:
                self.errors.append("Missing Parameters section")
                return False
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_usage_examples(self):
        """Validate that usage examples are present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if usage examples section exists
            if "Usage Examples" not in content:
                self.errors.append("Missing Usage Examples section")
                return False
            
            # Check if examples contain the command
            if "/conductor:status" not in content:
                self.warnings.append("Usage examples may not contain the command")
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_expected_output(self):
        """Validate that expected output is documented."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if expected output section exists
            if "Expected Output" not in content:
                self.errors.append("Missing Expected Output section")
                return False
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_common_errors(self):
        """Validate that common errors are documented."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if common errors section exists
            if "Common Errors" not in content:
                self.errors.append("Missing Common Errors section")
                return False
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def validate_troubleshooting(self):
        """Validate that troubleshooting information is present."""
        try:
            content = self.documentation_path.read_text(encoding='utf-8')
            
            # Check if troubleshooting section exists
            if "Troubleshooting" not in content:
                self.errors.append("Missing Troubleshooting section")
                return False
            
            return True
        except Exception as e:
            self.errors.append(f"Error reading documentation file: {e}")
            return False
    
    def run_all_validations(self):
        """Run all validation checks."""
        print("Running status command documentation validation...")
        print(f"Validating file: {self.documentation_path}")
        print()
        
        validations = [
            ("File exists", self.validate_file_exists),
            ("Required sections", self.validate_required_sections),
            ("Description", self.validate_description),
            ("Syntax", self.validate_syntax),
            ("Parameters", self.validate_parameters),
            ("Usage Examples", self.validate_usage_examples),
            ("Expected Output", self.validate_expected_output),
            ("Common Errors", self.validate_common_errors),
            ("Troubleshooting", self.validate_troubleshooting)
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
    
    # Get the path to the status command documentation
    script_dir = Path(__file__).parent
    documentation_path = script_dir.parent / "status_command_documentation.md"
    
    # Create validator and run validations
    validator = StatusCommandValidator(documentation_path)
    success = validator.run_all_validations()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()