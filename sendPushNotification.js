import { Expo } from 'expo-server-sdk';
const expo = new Expo();
// ExponentPushToken[FIveJ5KgFzwNajresi4VBM]
// ExponentPushToken[ipwbv7FHm_Jt8_v36Nhu7t]
const sendPushNotification = async (
  token = 'ExponentPushToken[SXBWikI0iQNNXj-nLSsGVk]',
  title,
  body,
) => {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error(`Invalid Expo push token: ${token}`);
  }

  try {
    const messages = [
      {
        to: token,
        sound: 'notification_main.wav',
        title: 'Place approved',
        subtitle: 'Place listed successfully!',
        body: 'See there!',
        data: { type: 'booking' },
        channelId: 'default',
      },
    ];
    console.log(messages)
    await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error(error);
  }
};
sendPushNotification();
