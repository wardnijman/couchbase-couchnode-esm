#!/bin/bash

# Directory to search
directory="./dist"

# Search all .js files
find "$directory" -name "*.js" | while read file; do
    # Use awk to detect, fix and modify the relevant lines, handling duplicates and fixing faulty export statements
    awk '
    BEGIN { exported = 0 }
    
    # Detect var declaration
    /var [A-Za-z]+;/ {
        varname = $2;
        print $0;
        next;
    }
    
    # Fix faulty export with semicolon inside braces, and only allow one export
    /export { [A-Za-z]+;/ {
        if (exported == 0) {
            exported = 1;
            gsub(";", "", $0);  # Remove semicolon inside braces
            print $0 ";";  # Correct format export { varname };
        }
        next;
    }

    # Handle correct export lines
    /export { [A-Za-z]+ };/ {
        if (exported == 0) {
            exported = 1;
            print $0;
        }
        next;
    }

    # Default line output
    {
        print $0;
    }
    
    # Ensure at the end that we add the export if none was found
    END {
        if (exported == 0) {
            print "export { " varname " };";
        }
    }' "$file" > temp_file && mv temp_file "$file"
done

echo "Fix applied: faulty export statements corrected, duplicates removed, and valid export ensured."

