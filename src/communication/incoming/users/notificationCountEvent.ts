import PacketEvent from '../packetEvent';
import CommunicationManager from '../..';
import Packet from '../packet';
import { setNotificationCount } from '../../../data/actions/general';

class NotificationCountEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    try {
      const count: number = await packet.readInteger();

      if (count) {
        document.title = '(' + count + ') NextChat';
      } else if (document.title.startsWith('(')) {
        document.title = 'NextChat';
      }

      connection.getStore().dispatch(setNotificationCount(count));
    } catch (error) {

    }
  }
}

export default NotificationCountEvent;
