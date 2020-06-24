import IncomingManager from './incoming';
import SocketIO from 'socket.io-client';
import { User } from '../types';
import { API_URL } from '../data/consts/data';
import Packet from './incoming/packet';
import PacketComposer from './outgoing';
import Store from '../data';

class CommunicationManager {
  private incoming: IncomingManager;
  private socket: SocketIOClient.Socket;

  constructor(
    private user: User,
  ) {
    this.incoming = new IncomingManager();
    this.socket = SocketIO.connect(API_URL + '?user_id=' + this.user.id);
  }

  getStore() {
    return Store;
  }

  getUser(): User {
    return this.user;
  }

  handleEvents(): void {
    if (this.incoming.getEvents().size) {
      for (let [name, event] of Array.from(this.incoming.getEvents().entries())) {
        this.socket.on(name, async (data: string) => {
          await event.execute(this, new Packet(data));
        });
      }
    }
  }

  async sendPacket(packet: PacketComposer): Promise<boolean> {
    try {
      await packet.execute();

      this.socket.emit(packet.getName(), packet.getData());

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default CommunicationManager;
