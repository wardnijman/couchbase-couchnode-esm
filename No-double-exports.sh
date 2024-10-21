#!/bin/bash

# Directory to search
directory="./dist"

# Search all .js files
find "$directory" -name "*.js" | while read file; do
    # Use awk to process file content and remove duplicate exports
    awk '
    BEGIN { 
        # Initialize empty array to track variables that have been exported
        exported = 0 
    }
    
    # Detect variable declaration (var <VariableName>;)
    /var [A-Za-z]+;/ {
        varname = $2; # Capture the variable name
        print $0; # Print the variable declaration
        next;
    }

    # Detect and process correct exports (export { <VariableName> };)
    /export { [A-Za-z]+ };/ {
        varname = $3; # Capture the exported variable
        if (seen[varname] == 0) {
            seen[varname] = 1; # Mark the variable as exported
            print $0; # Keep the first occurrence
        }
        next; # Skip any further duplicates
    }

    # Handle faulty exports (export { <VariableName>; };)
    /export { [A-Za-z]+;/ {
        varname = $3;
        if (seen[varname] == 0) {
            seen[varname] = 1; # Mark the variable as exported
            gsub(";", "", $0); # Remove the incorrect semicolon inside braces
            print $0 ";"; # Correct the format to export { varname };
        }
        next; # Skip duplicates
    }

    # Print all other lines
    {
        print $0;
    }' "$file" > temp_file && mv temp_file "$file"
done

echo "Duplicate export statements removed and faulty exports corrected."
