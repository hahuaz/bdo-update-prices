#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BdoUpdate } from "../infrastructure/bdo-update";

// to not pay secret manager cost, work with .env file. We won't be able to use CI/CD and only deployment will be available on the current machine.
import * as dotenv from "dotenv";
dotenv.config();

const { APP_NAME, STAGE, AWS_ACCOUNT, AWS_REGION } = process.env;
if (!APP_NAME || !STAGE || !AWS_ACCOUNT || !AWS_REGION) {
  throw new Error("Missing required environment variables");
}

const app = new cdk.App();
new BdoUpdate(app, `${STAGE}-${APP_NAME}`, {
  env: {
    region: AWS_REGION,
    account: AWS_ACCOUNT,
  },
});
