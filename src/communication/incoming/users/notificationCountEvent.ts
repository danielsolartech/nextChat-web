import PacketEvent from '../packetEvent';
import CommunicationManager from '../..';
import Packet from '../packet';

class NotificationCountEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    try {
      const count: number = await packet.readInteger();
      if (count) {
        document.title = '(' + count + ') NextChat';
      }
    } catch (error) {

    }
  }
}

export default NotificationCountEvent;
