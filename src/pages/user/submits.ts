import { sendPost, sendDelete } from '../../utils/routes';

export const follow = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendPost('friends/follow', { username });

    if (data.status === true) {
      document.location.href = `/user/${username}`;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};

export const unFollow = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendPost('friends/unfollow', { username });

    if (data.status === true) {
      document.location.href = `/user/${username}`;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};

export const friendRequest = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendPost('friends/request', { username });
    if (data.status === false) {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};

export const acceptFriendRequest = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendPost('friends/accept', { username });

    if (data.status === true) {
      document.location.href = `/user/${username}`;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};

export const declineFriendRequest = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendDelete('friends/decline', { username });
    if (data.status === false) {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};

export const deleteFriend = async (username: string): Promise<void> => {
  try {
    if (!username || !username.length) {
      return;
    }

    const data: any = await sendDelete('friends/delete', { username });

    if (data.status === true) {
      document.location.href = `/user/${username}`;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
  }
};
