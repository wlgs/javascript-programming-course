
// const fs = require('fs');
import * as fs from "fs";

class File {
    constructor(startPath) {
        this.startPath = startPath;
        this.finalString = "";
        this.MAXLINESIZE = 40;
    }
    clean(string) {
        this.finalString = this.finalString.replace(/(\r\n|\n|\r)/gm, " ");
    }
    traverse(path) {
        console.log("[DIR ENTER]: entered ", path);
        var files = fs.readdirSync(path);
        files.forEach(file => {
            if (fs.lstatSync(path + "/" + file).isDirectory())
                this.traverse(path + "/" + file);
            else {
                try {
                    var data = fs.readFileSync(path + "/" + file, 'utf8')
                    console.log("[FILE READ]: READ ", data);
                    this.finalString += data;
                } catch (err) {
                    console.error(err)
                }
                return;
            }
        });
        console.log("TRAVERSE END.");
    }
    right() {
        var offset = this.MAXLINESIZE;
        var cur_pos = 0;
        var lines = new Array();
        var chunk = this.finalString.slice(cur_pos, cur_pos + offset);
        while (chunk.length > 0) {
            chunk = chunk.concat("\r\n");
            lines.push(chunk);
            cur_pos += offset;
            chunk = this.finalString.slice(cur_pos, cur_pos + offset);
        }
        lines.forEach((line,idx)=>{
            if (line.length < offset) {
                var to_add = offset - line.length;
                var space = " ";
                space = space.repeat(to_add);
                line = space.concat(line); 
            }
            this.finalString = this.finalString.concat(line);
        });
    }
    getresult() {
        return this.finalString;
    }

}

// module.exports = File;
export { File };