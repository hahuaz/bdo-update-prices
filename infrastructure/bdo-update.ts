import * as cdk from 'aws-cdk-lib';
import { aws_events, aws_events_targets } from 'aws-cdk-lib';

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
    const { updatePrices, scrapeItems } = new LambdaConstruct(this, `lambda`, {
      APP_REGION,
    });

    const eventRule = new aws_events.Rule(this, 'scheduleRule', {
      schedule: aws_events.Schedule.cron({ minute: '0' }),
    });
    eventRule.addTarget(new aws_events_targets.LambdaFunction(updatePrices));

    // CFN OUTPUTS
    // new cdk.CfnOutput(this, 'siteBucketDistDomain', {
    //   value: siteBucketDist.distributionDomainName,
    //   description: 'The domain name of siteBucketDist',
    // });
  }
}
