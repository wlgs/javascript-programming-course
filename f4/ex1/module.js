/**
 * Class that can make various of operations.
 * @constructor
 * @param {number} initX - initial value of x
 * @param {number} initY - initial value of y
 */
class Operation{
    x = undefined;
    y = undefined;
    constructor(initX, initY){
        this.x = initX;
        this.y = initY;
    }

    /** Return the value of current sum of x and y. */
    sum(){
        return this.x+this.y;
    }
}

// module.exports = Operation;
export{Operation};