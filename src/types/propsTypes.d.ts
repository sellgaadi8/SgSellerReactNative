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
  | undefined
  | 'Primary'
  | 'White'
  | 'Black'
  | '#201A1B'
  | '#1C1B1F'
  | '#49454F'
  | '#FF0000'
  | '#111111'
  | '#EFC24F'
  | '#5D5D5D';

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
  isMandatory?: boolean;
  onPressEndIcon?: () => void;
  isPlaceholder?: boolean;
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

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

type VehiclesProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Vehicles'>;
};

type VehicleTypeProps = {
  onPressClose: () => void;
  onPressType: (id: number) => void;
};

type CustomProgressBarProps = {
  progress: number;
};

type AddVehicleCardProps = {
  fill: number;
  title: string;
  desc: string;
  onComplete?: () => void;
  isStep1Complete?: boolean;
};

type AddVehicleProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddVehicle'>;
  route: RouteProp<RootStackParamList, 'AddVehicle'>;
};

type DisplayInfoProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DisplayInfo'>;
  route: RouteProp<RootStackParamList, 'DisplayInfo'>;
};

type VehicleCardProps = {
  data: Vehicle;
  onPressEdit: () => void;
  onPressView: () => void;
};

type ImagePickerProps = {
  title: string;
  isOpen: boolean;
  multiple: boolean;
  fileTypes?: DocumentPickerOptions<'android' | 'ios' | 'windows'>;
  onSaveImage: (ImageType) => void;
  onClose: () => void;
  size?: number;
  position?: string;
  type?: string;
};

type ImageType = {
  name: string;
  size: number;
  type: string;
  uri: string;
}[];

type SearchModalProps = {
  placeholder: string;
  data: string[];
  onPressSelecteItem: (selected: string, modalType: ModalType) => void;
  dataType: ModalType;
  query: string;
  onChangeText: (value: string) => void;
  onPressDone: () => void;
};

type ModalType = 'Make' | 'Model' | 'Variant';

type CarImagesProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CarImages'>;
  route: RouteProp<RootStackParamList, 'CarImages'>;
};

type RadioProps = {
  title: string;
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
  isMandatory?: boolean;
  selectPhoto?: string;
  onPressCamera?: () => void;
  isImage?: boolean;
};

type CarDocsType =
  | 'rc'
  | 'noc'
  | 'mismatch'
  | 'insurance'
  | 'underHypo'
  | 'roadTax'
  | 'partipeshi'
  | 'key'
  | 'chesis'
  | 'cng/lpg'
  | 'endorsed';

type CarDocumentsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CarDocuments'>;
  route: RouteProp<RootStackParamList, 'CarDocuments'>;
};

type ExternelPanelProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ExternelPanel'>;
  route: RouteProp<RootStackParamList, 'ExternelPanel'>;
};

type ExteriorProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Exterior'>;
  route: RouteProp<RootStackParamList, 'Exterior'>;
};

type TyresProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Tyres'>;
  route: RouteProp<RootStackParamList, 'Tyres'>;
};

type RadioButtonsProps = {
  data: {label: string; value: string}[];
  onSelect: (label: string, value: string) => void;
  label: string;
  isMandatory?: boolean;
  isImage?: boolean;
  selectPhoto?: string;
  onPressCamera?: () => void;
  selectValue: string;
};

type EngineProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Engine'>;
  route: RouteProp<RootStackParamList, 'Engine'>;
};

type ElectricalsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Electricals'>;
  route: RouteProp<RootStackParamList, 'Electricals'>;
};

type SteeringProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Steering'>;
  route: RouteProp<RootStackParamList, 'Steering'>;
};

type VehicleDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VehicleDetail'>;
  route: RouteProp<RootStackParamList, 'VehicleDetail'>;
};

type MonthYearPickerProps = {
  onMonthChange?: (value: any, index: number) => void;
  selectedMonth?: string;
  months: {label: string; value: string}[];
  years: string[];
  selectedYear: string;
  onYearChange: (value: string) => void;
  onSubmitMonthYear: () => void;
  showYear?: boolean;
};

type CustomDropdownProps = {
  title?: string;
  selectedValue: any;
  onValueChange: (value: any, index: number) => void;
  values: {label: string; value: any}[];
  mode?: 'dialog' | 'dropdown';
  error?: string;
};

type ImageViewerCarouselProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ImageViewerCarousel'>;
  route: RouteProp<RootStackParamList, 'ImageViewerCarousel'>;
};

type IconButtonProps = {
  onPress?: (() => void) | ((value: any) => void);
  icon: IconDefinition;
  size: number;
  color?: string;
  style?: ViewStyle;
  count?: boolean;
};

type TyresType =
  | 'lhs_front_type'
  | 'rhs_front_type'
  | 'lhs_back_type'
  | 'rhs_back_type'
  | 'spare_type';

type CalenderProps = {
  isOpen: boolean;
  onClosed: () => void;
  onChange: (event: Event | DateTimePickerEvent, date?: Date) => void;
  value: Date;
  maximumDate?: Date;
  minimumDate?: Date;
};
