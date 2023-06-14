import {ImageType} from './propsTypes';

type ConsentFile = ImageType & {
  invalid?: boolean;
  error?: string;
};
