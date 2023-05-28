export const ON_SNACK: ON_SNACK = 'utils/snack';

// Initial state
const initialState: SnackState = {
  title: null,
  mode: 'DEFAULT',
  called: false,
};

export default function (state = initialState, action: SnackAction) {
  switch (action.type) {
    case ON_SNACK:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
}

// Action Creators
export function snackAction(
  title: string | null = null,
  mode: SnackMode = 'DEFAULT',
): SnackAction {
  return {
    type: ON_SNACK,
    payload: {title, mode, called: true},
  };
}
