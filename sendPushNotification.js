import { Expo } from 'expo-server-sdk';
const expo = new Expo();

const sendPushNotification = async (
  token = 'ExponentPushToken[ipwbv7FHm_Jt8_v36Nhu7t]',
  title,
  body,
) => {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error(`Invalid Expo push token: ${token}`);
  }

  const messages = [
    {
      to: token,
      sound: 'notification_main.wav',
      title: 'Place approved',
      subtitle: 'Place listed successfully!',
      body: 'See there!',
      data: { type: 'booking' },
    },
  ];

  await expo.sendPushNotificationsAsync(messages);
};
sendPushNotification();
