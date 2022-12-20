import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// import { ApiConstruct } from './constructs/api';
import { LambdaConstruct } from './constructs/lambda';
// import { StorageConstruct } from './constructs/storage';

export class BdoUpdate extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const BRANCH = this.node.tryGetContext('BRANCH');
    const { APP_REGION } = this.node.tryGetContext(BRANCH);

    // CUSTOM CONSTRUCTS

    // lamba, depends on storage
    const { testFunction } = new LambdaConstruct(this, `lambda`, {
      APP_REGION,
    });

    // CFN OUTPUTS
    // new cdk.CfnOutput(this, 'siteBucketDistDomain', {
    //   value: siteBucketDist.distributionDomainName,
    //   description: 'The domain name of siteBucketDist',
    // });
  }
}
