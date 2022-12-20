import * as AWS from 'aws-sdk';

const { GOOGLE_SPREADSHEET } = process.env;

export async function test(event: any) {
  console.log('incomingEvent', JSON.stringify(event, null, 2));

  return {
    message: 'success',
  };
}
