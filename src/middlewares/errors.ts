export default function errorsMiddleware(err: any,req: any,res: any,next: any){ //fix type check
    console.log("Error found in errors middleware\n",err.stack);
    res.status(500).send({
        success: false,
        message: err.message                
    });
};