import PacketEvent from '../packetEvent';
import CommunicationManager from '../..';
import Packet from '../packet';

class NewNotificationEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    try {
      const type: string = await packet.readString();
      const isValid: boolean = await packet.readBoolean();

      if (isValid) {
        switch (type) {
          case 'friend_accept':
          case 'friend_request': {
            const username: string = await packet.readString();
            break;
          }
        }
      }
    } catch (error) {

    }
  }
}

export default NewNotificationEvent;
