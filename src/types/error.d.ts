type LoginErrors = {
  mobile?: string;
  password?: string;
};

type RegisterErrors = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  sellerType?: string;
};

type PasswordErrors = {
  password?: string;
  confirmPassword?: string;
};

type DisplayErrors = {
  make?: string;
  model?: string;
  varaint?: string;
  manufacture?: string;
  registration?: string;
  transmission?: string;
  color?: string;
  fuel?: string;
  run?: string;
  owners?: string;
};

type CarDocumentsError = {
  rto?: string;
  fitness?: string;
  permit?: string;
  rcAvail?: string;
  rcAvailImage?: string;
  noc?: string;
  mismatch?: string;
  insurance?: string;
  hypo?: string;
  roadTax?: string;
  roadTaxImage?: string;
  partipeshi?: string;
  partipeshiImage?: string;
  key?: string;
  keyImage?: string;
  chessis?: string;
  chessisImage?: string;
  fitment?: string;
  fitmentEndorsed?: string;
  regno?: string;
};

type CarImagesError = {
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
};

type TyresImageError = {
  lhsfront?: string;
  rhsfront?: string;
  lhsback?: string;
  rhsback?: string;
  spare?: string;
  frontWheel?: string;
  rearWheel?: string;
  frontTyre?: string;
};

type EngineError = {
  sound?: string;
  cooling?: string;
  heater?: string;
  condensor?: string;
};

type EditProfileErrors = {
  name?: string;
  email?: string;
  address?: string;
  gst?: string;
  pan?: string;
  aadhar?: string;
};

type StatusErrors = {
  askingPrice?: string;
  ocblow?: string;
  ocbhigh?: string;
};
