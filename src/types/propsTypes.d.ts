import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

type CreatePasswordProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CreatePassword'>;
  route: RouteProp<RootStackParamList, 'CreatePassword'>;
};

type ForgotPasswordProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
};

type BoxProps = {
  children: React.ReactNode;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'space-between';
  alignSelf?: 'center';
  height?: number | string;
  width?: number | string;
  p?: Spacing;
  m?: Spacing;
  pv?: Spacing;
  ph?: Spacing;
  mv?: Spacing;
  mh?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  style?: any;
};

type Spacing =
  | 5
  | 8
  | 10
  | 12
  | 15
  | 18
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | string
  | number;

type CustomTextProps = {
  fontSize?: FontSize;
  color?: AppColors;
  lineHeight?: number;
  fontFamily?:
    | 'Roboto-Regular'
    | 'Roboto-Medium'
    | 'Roboto-Italic'
    | 'Roboto-Bold'
    | 'Roboto-BoldItalic'
    | 'Roboto-MediumItalic'
    | 'Poppins-Regular';
};

type FontSize =
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 20
  | 22
  | 24
  | 25
  | 34;

type AppColors =
  | 'Primary'
  | 'White'
  | 'Black'
  | '#201A1B'
  | '#1C1B1F'
  | '#49454F'
  | '#FF0000'
  | '#111111';

type InputProps = {
  disableCopyPaste?: boolean;
  callOnFocus?: () => any;
  textButton?: TextButtonProps;
  showTextButton?: boolean;
  error?: string;
  noMargin?: boolean;
  endIcon?: IconDefinition;
  endIconPress?: () => void;
  renderEndIcon?: () => any;
  label?: string;
  propsStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  input?: ViewStyle;
};

type ProfileInputProps = {
  disableCopyPaste?: boolean;
  callOnFocus?: () => any;
  textButton?: TextButtonProps;
  showTextButton?: boolean;
  error?: string;
  noMargin?: boolean;
  endIcon?: IconDefinition;
  endIconPress?: () => void;
  renderEndIcon?: () => any;
  label?: string;
  propsStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  input?: ViewStyle;
};

type TextButtonProps = {
  label: string;
  onPress?: () => void;
  color?: string;
  borderColor?: string;
  fontSize?: string;
  containerStyles?: EStyleSheet.AnyObject;
  labelStyles?: EStyleSheet.AnyObject;
};

type PrimaryButtonProps = {
  onPress: () => void;
  label: string;
  buttonStyle?: ViewStyle;
  labelStyle?: EStyleSheet.AnyObject;
  varient?: 'Primary' | 'Secondary';
};

type TabLabelProps = {
  value: string;
  focused: boolean;
};

type HeaderProps = {
  headerProps: HeaderOptions;
  title?: string;
  back?: boolean;
  showIcon?: boolean;
};

type ProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

type HeaderOptions =
  | StackHeaderProps
  | {
      navigation: StackNavigationProp<RootStackParamList>;
      route: RouteProp<RootStackParamList>;
    };

type ProfileDetailsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileDetails'>;
  route: RouteProp<RootStackParamList, 'ProfileDetails'>;
};

type LoaderProps = {
  status?: string;
};

type ValuatorFormProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ValuatorForm'>;
  route: RouteProp<RootStackParamList, 'ValuatorForm'>;
};

type ValuatorProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ValuatorStack'>;
};
