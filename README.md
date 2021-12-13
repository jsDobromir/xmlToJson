Simple xml to json converter, to run it
1)npm install
2)node xml2Json.js inputXml.xml output.json

The script expects an input file and output file as arguments, both can be relative or absolute paths to file. If the path is not absolute, it will look for the input xml file in the current directory or it will write the output json file in the current directory. If the output file does not exists it will be created, but the script expects a fileName to be provided.