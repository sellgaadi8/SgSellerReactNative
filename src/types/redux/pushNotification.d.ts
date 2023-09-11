type ON_PUSH_NOTIFICATION = 'sgSeller/notifications/push-notification';

type PushNotificationClickAction =
  | 'WITHDRAWAL_REDIRECTION'
  | 'REUPLOAD_BANK_DETAILS';

type PushNotificationState = {
  body: string;
  title: string;
  click_to_action: {
    id: string;
    page: PushNotificationClickAction;
  } | null;
  foreground: boolean;
  called: boolean;
};

type PushNotificationAction = {
  type: ON_PUSH_NOTIFICATION;
  payload: PushNotificationState;
};
