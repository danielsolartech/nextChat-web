import PacketEvent from '../packetEvent';
import CommunicationManager from '../..';
import Packet from '../packet';
import { GeneralState } from '../../../data/reducers/general';

class NewNotificationEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    try {
      const type: string = await packet.readString();
      const isValid: boolean = await packet.readBoolean();
      const general: GeneralState = connection.getStore().getState().general;

      if (!general.service_worker || (await Notification.requestPermission()) !== 'granted') {
        throw '';
      }

      if (isValid) {
        let notificationTitle: string = '';
        let notificationData: NotificationOptions | null = null;

        switch (type) {
          case 'new_follower':
          case 'friend_accept':
          case 'friend_request': {
            const username: string = await packet.readString();
            const avatar: string = await packet.readString();

            notificationData = {
              tag: type,
              icon: avatar,
              data: { username },
            };

            if (type === 'new_follower') {
              notificationTitle = `${username} has started following you`;
              notificationData.actions = [
                {
                  action: 'view_profile',
                  title: 'View profile',
                },
              ];
            } else if (type === 'friend_request') {
              notificationTitle = `${username} has sent you a friend request`;
              notificationData.actions = [
                {
                  action: 'accept',
                  title: 'Accept',
                },
                {
                  action: 'decline',
                  title: 'Decline',
                },
              ];
            } else {
              notificationTitle = `${username} has accepted your friend request`;
              notificationData.actions = [
                {
                  action: 'view_profile',
                  title: 'View profile',
                },
                {
                  action: 'message',
                  title: 'Send message',
                },
              ];
            }

            break;
          }
        }

        if (notificationTitle && notificationData) {
          await general.service_worker.showNotification(notificationTitle, notificationData);
        }
      }
    } catch (error) {

    }
  }
}

export default NewNotificationEvent;
