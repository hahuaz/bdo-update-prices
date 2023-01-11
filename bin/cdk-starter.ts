#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BdoUpdate } from '../infrastructure/bdo-update';

// to not pay secret manager cost, work with .env file. We won't be able to use CI/CD and only deployment will be available on the current machine.
import * as dotenv from 'dotenv';
dotenv.config();

const app = new cdk.App();
const BRANCH = app.node.tryGetContext('BRANCH');
const { APP_NAME, ACCOUNT, APP_REGION } = app.node.tryGetContext(BRANCH);

new BdoUpdate(app, `${BRANCH}-${APP_NAME}`, {
  env: { account: ACCOUNT, region: APP_REGION },
});
