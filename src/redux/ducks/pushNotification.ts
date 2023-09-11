const ON_PUSH_NOTIFICATION: ON_PUSH_NOTIFICATION =
  'sgSeller/notifications/push-notification';

const initialState: PushNotificationState = {
  body: '',
  title: '',
  click_to_action: null,
  foreground: false,
  called: false,
};

export default (
  state = initialState,
  action: PushNotificationAction,
): PushNotificationState => {
  switch (action.type) {
    case ON_PUSH_NOTIFICATION:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
};

export const onPushNotification = (
  res: PushNotificationState,
): PushNotificationAction => {
  return {type: ON_PUSH_NOTIFICATION, payload: {...res}};
};
