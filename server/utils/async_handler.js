const asyncHandler = (handler) => { 
    return (req,res,next) => {
        Promise.resolve(handler(req,res,next)).catch((err) => next(err))
    }
}   //a higher order function in which we can pass a function as a pararemeter or returns a function. 
  //this function named async-handler is used as a replacemetn for try catch statement. 
 //
module.exports = asyncHandler;