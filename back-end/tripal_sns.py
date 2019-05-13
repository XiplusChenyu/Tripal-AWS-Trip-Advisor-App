import json
# import requests
# from requests_aws4auth import AWS4Auth
import os
import boto3
# import decimal
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
#query items

def lambda_handler(event, context):
    key = "peopleID"
    content = event[key]
    phone = event['phone']
    # TODO implement
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('tripal')
    response = table.scan(
        FilterExpression=Key(key).eq(content)
    )
    # print(response['Items'])
    response = response['Items']
    message = 'Your tripal wishlist: ' + '\n'
    for i in response:
        message = message + 'Destination: ' + i['place'] + ', Date: ' + i['planDate'] + ', Detail: ' + i['idea'] + '.' + '\n'
    # print(message)

    send_sns(phone, message)



def send_sns(Phone, message):
    client = boto3.client('sns',
    region_name = 'us-east-1',
    aws_access_key_id=os.environ['access_key'],
    aws_secret_access_key=os.environ['secret_key']
    )

    # Send your sms message.
    client.publish(
        # TargetArn='arn:aws:sns:us-east-1:219298807110:dining',
        PhoneNumber = "+1"+Phone,
        Message= message
    )
