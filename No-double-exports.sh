#!/bin/bash

# Directory to search
directory="./dist"

# Search all .js files
find "$directory" -name "*.js" | while read file; do
    # Use awk to detect and remove duplicate export statements
    awk '
    {
        if ($0 ~ /export { [A-Za-z]+ };/) {
            varname = $3; # Capture the variable name
            # Check if the variable has already been exported
            if (seen[varname] == 1) {
                next; # Skip the duplicate export statement
            } else {
                seen[varname] = 1; # Mark the variable as exported
            }
        }
        print $0; # Print the line
    }' "$file" > temp_file && mv temp_file "$file"
done

echo "Duplicate exports removed."
