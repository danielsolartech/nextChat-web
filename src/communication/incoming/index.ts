import PacketEvent from './packetEvent';
import MarcoEvent from './handshake/marcoEvent';
import NotificationCountEvent from './users/notificationCountEvent';
import NewNotificationEvent from './users/newNotificationEvent';
import UpdateProfileButtonsEvent from './users/friends/updateProfileButtonsEvent';

class IncomingManager {
  private events: Map<string, PacketEvent>;

  constructor() {
    this.events = new Map<string, PacketEvent>();

    this.registerEvents();
  }

  registerEvents(): void {
    this.addEvent('marco', new MarcoEvent());
    this.addEvent('notification_count', new NotificationCountEvent());
    this.addEvent('new_notification', new NewNotificationEvent());
    this.addEvent('update_profile_buttons', new UpdateProfileButtonsEvent());
  }

  getEvents(): Map<string, PacketEvent> {
    return this.events;
  }

  hasEvent(name: string): boolean {
    return this.events.has(name);
  }

  addEvent(name: string, packet: PacketEvent): boolean {
    if (this.hasEvent(name)) {
      return false;
    }

    this.events.set(name, packet);
    return this.hasEvent(name);
  }
}

export default IncomingManager;
