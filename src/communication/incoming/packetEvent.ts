import CommunicationManager from '../index';
import Packet from './packet';

interface PacketEvent {
  execute(connection: CommunicationManager, packet: Packet): Promise<void>;
}

export default PacketEvent;
