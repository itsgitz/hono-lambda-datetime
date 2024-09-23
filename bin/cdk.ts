#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {AnggitHonoLambdaDatetimeStack} from '../lib/anggit-lambda-datetime-stack';

const app = new cdk.App();
new AnggitHonoLambdaDatetimeStack(app, 'AnggitHonoLambdaDatetimeStack', {});
