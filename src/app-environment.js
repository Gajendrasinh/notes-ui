(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.urls = factory();
    root.awsAuthCredentials = {
      "aws_project_region": "us-east-1",
      "aws_cognito_region": "us-east-1",
      "aws_user_pools_id": "us-east-1_X6MtU1uST",
      "aws_user_pools_web_client_id": "rdf64drtn928mnofoph47um0e",
      "oauth": {
        "domain": "intaccount.dataorb.ai",
        "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://intnotes.dataorb.ai/login",
        "redirectSignOut": "https://intnotes.dataorb.ai/",
        "responseType": "code"
      },
      "federationTarget": "COGNITO_USER_POOLS"
    }
  }
}(this, function () {
  return {
    deployUrl: 'https://d3wqn58baf8kh.cloudfront.net/dataorb-notes/versionNumber',
    apiBaseUrl: 'https://intgateway.dataorb.ai/api',
  };
}));
