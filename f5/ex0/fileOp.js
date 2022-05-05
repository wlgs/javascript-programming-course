
// const fs = require('fs');
import * as fs from "fs";

class File {

    finalString = "";
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
        var result = "";
        while (chunk.length > 0) {
            chunk = chunk.concat("\r\n");
            // console.log("CHUNK: ", chunk);
            lines.push(chunk);
            cur_pos += offset;
            chunk = this.finalString.slice(cur_pos, cur_pos + offset);
        }
        var rep = " ";
        rep = rep.repeat(this.MAXLINESIZE - lines[lines.length-1].length + 2)
        lines[lines.length-1] = rep.concat(lines[lines.length-1])
        lines.forEach((line,idx)=>{
            result += line;
        });
        console.log(lines);
        // lines.forEach((line,idx)=>{
        //     if (line.length < offset) {
        //         var to_add = offset - line.length;
        //         var space = " ";
        //         space = space.repeat(to_add);
        //         line = space.concat(line); 
        //     }
        //     this.finalString = this.finalString.concat(line);
        // });
        return result;
    }
    getresult() {
        return this.finalString;
    }

}

// module.exports = File;
export { File };