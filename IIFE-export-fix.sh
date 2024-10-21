#!/bin/bash

# Directory to search
directory="./dist"

# Search all .js files
find "$directory" -name "*.js" | while read file; do
    # Use awk to detect and modify the relevant lines
    awk '/var [A-Za-z]+;/ {
        varname = $2; # Extract variable name
        print $0; # Print original line
        print "export { " varname " };"; # Add export line
        next
    }
    { print $0 }' "$file" > temp_file && mv temp_file "$file"
done

echo "Export prepending complete."

