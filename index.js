const core = require('@actions/core');
const cloudFomration = require('aws-sdk/clients/cloudformation');

try {

    const accessKey = core.getInput('ACCESS_KEY');
    const secereteKey = core.getInput('SECRET_KEY');
    const region = core.getInput('REGION');
    const stack = core.getInput('STACK');
    const templateS3Uri = core.getInput('TEMPLATE_S3_URI');
    const parameters = core.getInput('PARAMETERS')

    const cf = new cloudFomration({
        accessKeyId: accessKey,
        secretAccessKey: secereteKey,
        region: region
    });
    var params = {
      StackName: stack,
      Capabilities: [
        'CAPABILITY_IAM',
        'CAPABILITY_NAMED_IAM',
        'CAPABILITY_AUTO_EXPAND'
      ],
      TemplateURL: templateS3Uri,
      UsePreviousTemplate: false,
      PARAMETERS: parameters
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