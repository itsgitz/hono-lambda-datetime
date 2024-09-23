import * as cdk from 'aws-cdk-lib';
import {LambdaRestApi} from 'aws-cdk-lib/aws-apigateway';
import {Effect, PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {FunctionUrlAuthType, Runtime} from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import {join} from 'path';

export class AnggitHonoLambdaDatetimeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); 

    console.log(__dirname)

    const fn = new NodejsFunction(this, 'LambdaDateTime', {
      entry: join(__dirname, '../lambda/index.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
    })
    fn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    })
    fn.addToRolePolicy(
      new PolicyStatement({
        actions: [
          'dynamodb:*'
        ],
        resources: ['*'],
        effect: Effect.ALLOW
      })
    )

    new LambdaRestApi(this, 'LambdaDateTimeApi', {
      handler: fn,
    })
  }
}
