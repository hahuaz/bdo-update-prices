import * as path from 'path';

import * as cdk from 'aws-cdk-lib';
import {
  aws_lambda as lambda,
  aws_iam,
  CfnOutput,
  aws_cloudfront,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaConstruct extends Construct {
  public readonly updatePrices: NodejsFunction;
  public readonly scrapeItems: NodejsFunction;

  constructor(scope: Construct, id: string, props: any) {
    super(scope, id);

    // const { SENTENCE_TABLE_NAME, SENTENCE_BUCKET_NAME } = props;

    // const BRANCH = this.node.tryGetContext('BRANCH');
    // const { APP_REGION, AZURE_SPEECH_KEY, AZURE_SPEECH_REGION } =
    //   this.node.tryGetContext(BRANCH);

    // this.testFunction = new NodejsFunction(this, 'testFunction', {
    //   memorySize: 128,
    //   timeout: cdk.Duration.seconds(5),
    //   runtime: lambda.Runtime.NODEJS_16_X,
    //   handler: 'test',
    //   entry: path.join(__dirname, `/../../lambda/test.ts`),
    //   bundling: {
    //     minify: false,
    //   },
    //   // environment: {
    //   //   GOOGLE_SPREADSHEET: GOOGLE_SPREADSHEET!,
    //   // },
    // });

    this.scrapeItems = new NodejsFunction(this, 'scrapeItems', {
      memorySize: 128,
      timeout: cdk.Duration.minutes(15),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      entry: path.join(__dirname, `/../../lambda/scrape-items.ts`),
      bundling: {
        minify: false,
      },
      environment: {
        COOKIE_REQUEST_TOKEN: process.env.COOKIE_REQUEST_TOKEN!,
        COOKIE_TRADE_SESSION: process.env.COOKIE_TRADE_SESSION!,
        BDOY_REQUEST_TOKEN: process.env.BDOY_REQUEST_TOKEN!,
      },
    });

    this.updatePrices = new NodejsFunction(this, 'updatePrices', {
      memorySize: 128,
      timeout: cdk.Duration.minutes(15),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main',
      entry: path.join(__dirname, `/../../lambda/update-prices.ts`),
      bundling: {
        minify: false,
      },
      environment: {
        GOOGLE_SPREADSHEET: process.env.GOOGLE_SPREADSHEET!,
        GOOGLE_SHEET_BY_ID: process.env.GOOGLE_SHEET_BY_ID!,
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY!,
      },
    });
  }
}
