import PacketEvent from '../../packetEvent';
import CommunicationManager from '../../..';
import Packet from '../../packet';
import { setProfileSettings } from '../../../../data/actions/general';

class UpdateProfileButtonsEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    const type: string = await packet.readString();
    const username: string = await packet.readString();

    if (document.location.href.endsWith(`/user/${username}`)) {
      if (type === 'FRIEND_REQUEST') {
        connection.getStore().dispatch(setProfileSettings({
          friend_request: await packet.readBoolean(),
          options_friend_request: await packet.readBoolean(),
        }));
      } else if (type === 'FOLLOW') {
        const isFollower: boolean = await packet.readBoolean();

        if (!isFollower) {
          connection.getStore().dispatch(setProfileSettings({
            is_follower: await packet.readBoolean(),
          }));
        }
      } else {
        document.location.href = `/user/${username}`;
      }
    }
  }
}

export default UpdateProfileButtonsEvent;
