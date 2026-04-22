#!/usr/bin/env python3
"""
Validation script for documentation structure.

This script validates that the documentation structure follows the expected format
and includes all required sections for comprehensive command reference documentation.
"""

import os
import sys
from pathlib import Path


class DocumentationValidator:
    """Validator for documentation structure."""
    
    def __init__(self, outline_path):
        self.outline_path = Path(outline_path)
        self.errors = []
        self.warnings = []
        
    def validate_file_exists(self):
        """Validate that the outline file exists."""
        if not self.outline_path.exists():
            self.errors.append(f"Documentation outline file not found: {self.outline_path}")
            return False
        return True
    
    def _read_content(self):
        """Read file content with UTF-8 encoding."""
        try:
            return self.outline_path.read_text(encoding='utf-8')
        except Exception as e:
            self.errors.append(f"Error reading outline file: {e}")
            return None
    
    def validate_required_sections(self):
        """Validate that all required sections are present in the outline."""
        required_sections = [
            "1. Introduction",
            "2. Command Reference",
            "3. Common Workflows",
            "4. Error Handling Guide",
            "5. Integration Guide",
            "6. Best Practices",
            "7. Appendix"
        ]
        
        content = self._read_content()
        if content is None:
            return False
        
        for section in required_sections:
            if section not in content:
                self.errors.append(f"Missing required section: {section}")
        
        return len(self.errors) == 0
    
    def validate_command_sections(self):
        """Validate that all command sections are present."""
        required_commands = [
            "/conductor:setup",
            "/conductor:newTrack",
            "/conductor:implement",
            "/conductor:review",
            "/conductor:status",
            "/conductor:revert"
        ]
        
        content = self._read_content()
        if content is None:
            return False
        
        for command in required_commands:
            if command not in content:
                self.errors.append(f"Missing command section: {command}")
        
        return len(self.errors) == 0
    
    def validate_command_structure(self):
        """Validate that each command section has the required structure."""
        required_command_elements = [
            "Description",
            "Syntax",
            "Parameters",
            "Usage Examples",
            "Expected Output",
            "Common Errors",
            "Troubleshooting"
        ]
        
        content = self._read_content()
        if content is None:
            return False
        
        # Check if each command has the required elements
        # This is a simplified check - in a real implementation, we'd parse the structure more carefully
        for element in required_command_elements:
            if element not in content:
                self.warnings.append(f"Command structure may be missing element: {element}")
        
        return True
    
    def validate_workflow_sections(self):
        """Validate that workflow sections are present."""
        required_workflows = [
            "Setup → New Track → Implement → Review",
            "Track Status Monitoring",
            "Reverting Changes"
        ]
        
        content = self._read_content()
        if content is None:
            return False
        
        for workflow in required_workflows:
            if workflow not in content:
                self.errors.append(f"Missing workflow section: {workflow}")
        
        return len(self.errors) == 0
    
    def validate_error_sections(self):
        """Validate that error handling sections are present."""
        required_error_sections = [
            "Common Setup Errors",
            "Common Track Management Errors",
            "Common Implementation Errors"
        ]
        
        content = self._read_content()
        if content is None:
            return False
        
        for section in required_error_sections:
            if section not in content:
                self.errors.append(f"Missing error handling section: {section}")
        
        return len(self.errors) == 0
    
    def run_all_validations(self):
        """Run all validation checks."""
        print("Running documentation structure validation...")
        print(f"Validating file: {self.outline_path}")
        print()
        
        validations = [
            ("File exists", self.validate_file_exists),
            ("Required sections", self.validate_required_sections),
            ("Command sections", self.validate_command_sections),
            ("Command structure", self.validate_command_structure),
            ("Workflow sections", self.validate_workflow_sections),
            ("Error sections", self.validate_error_sections)
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
    
    # Get the path to the documentation outline
    script_dir = Path(__file__).parent
    outline_path = script_dir.parent / "documentation_outline.md"
    
    # Create validator and run validations
    validator = DocumentationValidator(outline_path)
    success = validator.run_all_validations()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()