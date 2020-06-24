self.addEventListener('notificationclick', async function (e) {
  switch (e.notification.tag) {
    case 'new_follower':
    case 'friend_request':
    case 'friend_accept': {
      const username = e.notification.data.username;

      if (e.action === 'accept') {
        // TODO:
      } else if (e.action === 'decline') {
        // TODO:
      } else if (e.action === 'message') {
        // TODO: Send message to new friend
      } else {
        clients.openWindow(`http://localhost:8100/user/${username}`);
        e.notification.close();
      }

      break;
    }
  }
}, false);
