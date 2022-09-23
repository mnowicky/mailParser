A simple, configurable email parser based on the imap npm package. 
Intended to be used as a ready-to-deploy mail parsing module to implement into projects.

runParser.js is intended only to be used to start/test the parser, delete the file and call the parser from another module with mailParser.run();

More information on the use of the imap package, and additional options can be found here:
https://www.npmjs.com/package/imap

Parsed emails are currently output as text files to the ./output folder- though future improvements would create options to format & output as additional data/file types. 

Modify and re-configure to fit your specific needs. 

