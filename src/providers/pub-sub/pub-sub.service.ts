import { PubSub } from "@google-cloud/pubsub";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PubSubService {
  private client: PubSub;

  constructor() {
    this.client = new PubSub();
  }

  async publishMessage(topicNameOrId, data, attributes = null) {
    let strData = data;

    if (data && typeof data === "object") {
      strData = JSON.stringify(data);
    }

    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(strData);

    const messsage = {
      data: dataBuffer,
      ...attributes && { attributes }
    } 

    try {
      const messageId = await this.client
        .topic(topicNameOrId)
        .publishMessage(messsage);
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      throw error;
      //   process.exitCode = 1;
    }
  }
}