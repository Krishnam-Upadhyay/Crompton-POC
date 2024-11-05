import notifee, {EventType} from '@notifee/react-native';

// Create a channel (required for Android)
export const createChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  return channelId;
};

export async function onMessageReceived(message: any) {
  // Do something
  console.log('Message from firebase: ', message);

  const channelId = await createChannel();

  console.log('channelId: ', channelId);

  // Display a notification
  await notifee.displayNotification({
    id: message?.messageId,
    title: message?.notification?.title,
    body: message?.notification?.body,
    android: {
      channelId,
      smallIcon: 'bootsplash_logo', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
    },
  });
}

export async function onMessageReceivedBackend(message: any) {
  // Do something
  console.log('onMessageReceivedBackend: ', message);
}
