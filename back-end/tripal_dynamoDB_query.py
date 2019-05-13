import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
#query items

def lambda_handler(event, context):
    key = event["keyname"]
    content = event["content"]
    # TODO implement
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('tripal')
    response = table.scan(
        FilterExpression=Key(key).eq(content)
    )
    # print(response['Items'])
    return response['Items']
