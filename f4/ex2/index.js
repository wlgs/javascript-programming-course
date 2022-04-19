import * as fs from 'fs';

function checkName(filename){
    try {
        if(fs.lstatSync(filename).isDirectory()){
            return 'dir'
        }
        else{
            return 'file'
        }
    } catch (err) {
        return 'err';
    }
}

const args = process.argv;
const filename = args[2];

if(args.length==3){
    try {
        if(fs.lstatSync(filename).isDirectory()){
            console.log("It is a directory!")
        }
        else{
            console.log("It is a file!")
            const fileData = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
            console.log(fileData);
        }
    } catch (err) {
        console.log("Encountered an error -> ", err);
    }
}


export {checkName};
