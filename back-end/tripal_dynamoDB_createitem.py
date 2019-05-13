import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    # input format see in test01
    client = boto3.client('dynamodb')
    response = client.put_item(
        Item={
            'textId': {
                'S': event["textId"],
            },
            'idea': {
                'S': event["idea"],
            },
            'peopleID': {
                'S': event["peopleID"],
            },
            'place': {
                'S': event["place"],
            },
            'planDate': {
                'S': event["planDate"],
            },
            'timeStamp': {
                'S': event["timeStamp"],
            },
        },
        ReturnConsumedCapacity='TOTAL',
        TableName='tripal',
    )

    return response
