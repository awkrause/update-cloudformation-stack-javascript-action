const core = require('@actions/core');
const cloudFomration = require('aws-sdk/clients/cloudformation');

try {

    const accessKey = core.getInput('ACCESS_KEY');
    const secereteKey = core.getInput('SECRET_KEY');
    const stack = core.getInput('STACK');
    const templateS3Uri = core.getInput('TEMPLATe_S3_URI');

    const cf = new cloudFomration({
        accessKeyId: accessKey,
        secretAccessKey: secereteKey
    });
    var params = {
      StackName: stack,
      Capabilities: [
        CAPABILITY_IAM,
        CAPABILITY_NAMED_IAM,
        CAPABILITY_AUTO_EXPAND
      ],
      TemplateURL: templateS3Uri,
      UsePreviousTemplate: false
    };
    cf.updateStack(params, function(err, data) {
      if (err){
         console.log(err, err.stack); 
         core.setFailed(err);
      }// an error occurred
      else     console.log(data);           // successful response
    });

} 
catch (error) {
    core.setFailed(error.message);
}