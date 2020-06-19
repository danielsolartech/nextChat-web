import PacketEvent from '../packetEvent';
import CommunicationManager from '../..';
import Packet from '../packet';
import PoloComposer from '../../outgoing/handshake/poloComposer';

class MarcoEvent implements PacketEvent {
  async execute(connection: CommunicationManager, packet: Packet): Promise<void> {
    await connection.sendPacket(new PoloComposer(await packet.readInteger()));
  }
}

export default MarcoEvent;
