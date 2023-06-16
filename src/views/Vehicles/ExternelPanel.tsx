import {ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch} from 'react-redux';
import {onAddExternal} from '../../redux/ducks/addExternal';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {ExternelPanelProps} from '../../types/propsTypes';
import {onUpdateExternal} from '../../redux/ducks/updateExternal';
import {onGetExternelDetails} from '../../redux/ducks/getExternal';
import Loader from '../../components/Loader';
import BasePicker from '../../components/BasePicker';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {onUploadImage} from '../../redux/ducks/uploadImage';
const list = [
  {label: 'Ok', value: 'Ok'},
  {label: 'Scratched', value: 'Scratched'},
  {label: 'Dented', value: 'Dented'},
  {label: 'Repainted', value: 'Repainted'},
];

export default function ExternelPanel({navigation, route}: ExternelPanelProps) {
  const [externelType, setExternelType] = useState([
    {id: 'bonnet_head', label: 'Bonnet Head', url: ''},
    {id: 'roof', label: 'Roof', url: ''},
    {id: 'dickey_door', label: 'Dickey Door', url: ''},
    {id: 'left_door_front', label: 'Left Door Front', url: ''},
    {id: 'left_door_back', label: 'Left Door Back', url: ''},
    {id: 'right_door_front', label: 'Right Door Front', url: ''},
    {id: 'right_door_back', label: 'Right Door Back', url: ''},
    {id: 'left_fender', label: 'Left Fender', url: ''},
    {id: 'right_fender', label: 'Right Fender', url: ''},
    {id: 'left_quater_panel', label: 'Left Quarter Panel', url: ''},
    {id: 'right_quater_panel', label: 'Right Quarter Panel', url: ''},
  ]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [hood, setHood] = useState('Ok');
  const [hoodImage, setHoodImage] = useState('');
  const [roof, setRoof] = useState('Ok');
  const [roofImage, setRoofImage] = useState('');
  const [dicky, setDickey] = useState('Ok');
  const [dickyImage, setDickeyImage] = useState('');
  const [ldoorf, setLdoorf] = useState('Ok');
  const [ldoorfImage, setLdoorfImage] = useState('');
  const [ldoorb, setLdoorb] = useState('Ok');
  const [ldoorbImage, setLdoorbImage] = useState('');
  const [rdoorf, setRdoorf] = useState('Ok');
  const [rdoorfImage, setRdoorfImage] = useState('');
  const [rdoorb, setRdoorb] = useState('Ok');
  const [rdoorbImage, setRdoorbImage] = useState('');
  const [lfender, setLfender] = useState('Ok');
  const [lfenderImage, setLfenderImage] = useState('');
  const [rfender, setRfender] = useState('Ok');
  const [rfenderImage, setRfenderImage] = useState('');
  const [lQPanel, setLqPanel] = useState('Ok');
  const [lQPanelImage, setLqPanelImage] = useState('');
  const [rQPanel, setRqPanel] = useState('Ok');
  const [rQPanelImage, setRqPanelImage] = useState('');
  const [loading, setLoading] = useState(false);
  const {vehicleId} = useContext(GlobalContext);
  const selectAdd = useAppSelector(state => state.addExternal);
  const selectUpdate = useAppSelector(state => state.updateExternal);
  const setGet = useAppSelector(state => state.getExternal);
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const [uploadType, setUploadType] =
    useState<ExternelDocumentType>('bonnet_head');

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetExternelDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSave() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onAddExternal(
          vehicleId,
          hood,
          roof,
          dicky,
          ldoorf,
          ldoorb,
          rdoorf,
          rdoorb,
          lfender,
          rfender,
          lQPanel,
          rQPanel,
          hoodImage,
          roofImage,
          dickyImage,
          ldoorfImage,
          ldoorbImage,
          rdoorfImage,
          rdoorbImage,
          lfenderImage,
          rfenderImage,
          lQPanelImage,
          rQPanelImage,
        ),
      );
    } else {
      dispatch(
        onUpdateExternal(
          vehicleId,
          hood,
          roof,
          dicky,
          ldoorf,
          ldoorb,
          rdoorf,
          rdoorb,
          lfender,
          rfender,
          lQPanel,
          rQPanel,
          hoodImage,
          roofImage,
          dickyImage,
          ldoorfImage,
          ldoorbImage,
          rdoorfImage,
          rdoorbImage,
          lfenderImage,
          rfenderImage,
          lQPanelImage,
          rQPanelImage,
        ),
      );
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {error, image} = selectUploadImage;
      let temp = [...externelType];

      if (!error && image) {
        switch (uploadType) {
          case 'bonnet_head':
            setHoodImage(image.file);
            temp[0].url = image.url;
            break;
          case 'roof':
            setRoofImage(image.file);
            temp[1].url = image.url;
            break;
          case 'dickey_door':
            setDickeyImage(image.file);
            temp[2].url = image.url;
            break;
          case 'left_door_front':
            setLdoorfImage(image.file);
            temp[3].url = image.url;
            break;
          case 'left_door_back':
            setLdoorbImage(image.file);
            temp[4].url = image.url;
            break;
          case 'right_door_front':
            setRdoorfImage(image.file);
            temp[5].url = image.url;
            break;
          case 'right_door_back':
            setRdoorbImage(image.file);
            temp[6].url = image.url;
            break;
          case 'left_fender':
            setLfenderImage(image.file);
            temp[7].url = image.url;
            break;
          case 'right_fender':
            setRfenderImage(image.file);
            temp[8].url = image.url;
            break;
          case 'left_quater_panel':
            setLqPanelImage(image.file);
            temp[9].url = image.url;
            break;
          case 'right_quater_panel':
            setRqPanelImage(image.file);
            temp[10].url = image.url;
            break;
          default:
            break;
        }
      }

      setExternelType([...temp]);
    }
    if (selectAdd.called) {
      setLoading(false);
      const {error, message, success} = selectAdd;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (selectUpdate.called) {
      setLoading(false);
      const {error, message, success} = selectUpdate;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (setGet.called) {
      setLoading(false);
      const {data, error, success} = setGet;
      if (!error && success && data) {
        setHood(data.bonnet_head);
        setRoof(data.roof);
        setDickey(data.dickey_door);
        setLdoorb(data.left_door_back);
        setRdoorb(data.right_door_back);
        setLdoorf(data.left_door_front);
        setRdoorf(data.right_door_front);
        setLfender(data.left_fender);
        setRfender(data.right_fender);
        setLqPanel(data.left_quater_panel);
        setRqPanel(data.right_quater_panel);
        let temp = [...externelType];
        if (data.bonnet_head_image) {
          temp[0].url = data.bonnet_head_image;
        }
        if (data.roof_image) {
          temp[1].url = data.roof_image;
        }
        if (data.dickey_door_image) {
          temp[2].url = data.dickey_door_image;
        }
        if (data.left_door_back_image) {
          temp[3].url = data.left_door_back_image;
        }
        if (data.right_door_back_image) {
          temp[4].url = data.right_door_back_image;
        }
        if (data.left_door_front_image) {
          temp[5].url = data.left_door_front_image;
        }
        if (data.right_door_front_image) {
          temp[6].url = data.right_door_front_image;
        }
        if (data.left_fender_image) {
          temp[7].url = data.left_fender_image;
        }
        if (data.right_fender_image) {
          temp[8].url = data.right_fender_image;
        }
        if (data.left_quater_panel_image) {
          temp[9].url = data.left_quater_panel_image;
        }
        if (data.right_quater_panel_image) {
          temp[10].url = data.right_quater_panel_image;
        }
        setExternelType([...temp]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAdd, selectUpdate]);

  function onSaveImage(image: any) {
    dispatch(onUploadImage(image[0], 'externel-panel-images'));
  }

  function onChangeHood() {
    setOpenImagePicker(true);
    setUploadType('bonnet_head');
  }

  function onChangeRoof() {
    setOpenImagePicker(true);
    setUploadType('roof');
  }

  function onChangeDickey() {
    setUploadType('dickey_door');
    setOpenImagePicker(true);
  }
  function onChangeLdoorF() {
    setUploadType('left_door_front');
    setOpenImagePicker(true);
  }
  function onChangeLdoorB() {
    setUploadType('left_door_back');
    setOpenImagePicker(true);
  }
  function onChangeRdoorF() {
    setUploadType('right_door_front');
    setOpenImagePicker(true);
  }
  function onChangeRdoorB() {
    setUploadType('right_door_back');
    setOpenImagePicker(true);
  }
  function onChangeLeftFender() {
    setUploadType('left_fender');
    setOpenImagePicker(true);
  }
  function onChangeRightFender() {
    setUploadType('right_fender');
    setOpenImagePicker(true);
  }
  function onChangeLPanel() {
    setUploadType('left_quater_panel');
    setOpenImagePicker(true);
  }
  function onChangeRPanel() {
    setUploadType('right_quater_panel');
    setOpenImagePicker(true);
  }

  // function getDocs(type: ExternelDocumentType) {
  //   switch (type) {
  //     case 'bonnet_head':
  //       return hoodImage;
  //     case 'roof':
  //       return roofImage;
  //     case 'dickey_door':
  //       return dickyImage;
  //     case 'left_door_front':
  //       return ldoorfImage;
  //     case 'left_door_back':
  //       return ldoorbImage;
  //     case 'right_door_front':
  //       return rdoorfImage;
  //     case 'right_door_back':
  //       return rdoorbImage;
  //     case 'left_fender':
  //       return lfenderImage;
  //     case 'right_fender':
  //       return rfenderImage;
  //     case 'left_quater_panel':
  //       return lQPanelImage;
  //     case 'right_quater_panel':
  //       return rQPanelImage;
  //     default:
  //       return [];
  //   }
  // }

  // function saveDocs(type: ExternelDocumentType, files: ConsentFile[]) {
  //   switch (type) {
  //     case 'bonnet_head':
  //       setHoodImage(files);
  //       break;
  //     case 'roof':
  //       setRoofImage(files);
  //       break;
  //     case 'dickey_door':
  //       setDickeyImage(files);
  //       break;
  //     case 'left_door_front':
  //       setLdoorfImage(files);
  //       break;
  //     case 'left_door_back':
  //       setLdoorbImage(files);
  //       break;
  //     case 'right_door_front':
  //       setRdoorfImage(files);
  //       break;
  //     case 'right_door_back':
  //       setRdoorbImage(files);
  //       break;
  //     case 'left_fender':
  //       setLfenderImage(files);
  //       break;
  //     case 'right_fender':
  //       setRfenderImage(files);
  //       break;
  //     case 'left_quater_panel':
  //       setLqPanelImage(files);
  //       break;
  //     case 'right_quater_panel':
  //       setRqPanelImage(files);
  //       break;
  //   }
  // }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 5: External Panel
        </CustomText>

        <Box>
          <BasePicker
            data={list}
            title="Bonnet / Hood"
            onValueChange={setHood}
            selectedValue={hood}
            onPressCamera={onChangeHood}
            selectPhoto={externelType[0].url}
          />
          <BasePicker
            data={list}
            title="Roof"
            onValueChange={setRoof}
            selectedValue={roof}
            onPressCamera={onChangeRoof}
            selectPhoto={externelType[1].url}
          />
          <BasePicker
            data={list}
            title="Dicky door/Boot Door"
            onValueChange={setDickey}
            selectedValue={dicky}
            onPressCamera={onChangeDickey}
            selectPhoto={externelType[2].url}
          />
          <BasePicker
            data={list}
            title="Left door front"
            onValueChange={setLdoorf}
            selectedValue={ldoorf}
            onPressCamera={onChangeLdoorF}
            selectPhoto={externelType[3].url}
          />
          <BasePicker
            data={list}
            title="Left door back"
            onValueChange={setLdoorb}
            selectedValue={ldoorb}
            onPressCamera={onChangeLdoorB}
            selectPhoto={externelType[4].url}
          />
          <BasePicker
            data={list}
            title="Right door front"
            onValueChange={setRdoorf}
            selectedValue={rdoorf}
            onPressCamera={onChangeRdoorF}
            selectPhoto={externelType[5].url}
          />
          <BasePicker
            data={list}
            title="Right door back"
            onValueChange={setRdoorb}
            selectedValue={rdoorb}
            onPressCamera={onChangeRdoorB}
            selectPhoto={externelType[6].url}
          />
          <BasePicker
            data={list}
            title="Left fender"
            onValueChange={setLfender}
            selectedValue={lfender}
            onPressCamera={onChangeLeftFender}
            selectPhoto={externelType[7].url}
          />
          <BasePicker
            data={list}
            title="Right fender"
            onValueChange={setRfender}
            selectedValue={rfender}
            onPressCamera={onChangeRightFender}
            selectPhoto={externelType[8].url}
          />
          <BasePicker
            data={list}
            title="Left Quater Panel"
            onValueChange={setLqPanel}
            selectedValue={lQPanel}
            onPressCamera={onChangeLPanel}
            selectPhoto={externelType[9].url}
          />
          <BasePicker
            data={list}
            title="Right Quater Panel"
            onValueChange={setRqPanel}
            selectedValue={rQPanel}
            onPressCamera={onChangeRPanel}
            selectPhoto={externelType[10].url}
          />
        </Box>
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Discard"
              onPress={() => navigation.goBack()}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton
              label={route.params.from === 'add' ? 'Save' : 'Update'}
              onPress={onSave}
            />
          </Box>
        </Box>
      </ScrollView>
      <ImagePicker
        isOpen={openImagePicker}
        onClose={() => setOpenImagePicker(false)}
        multiple={false}
        onSaveImage={onSaveImage}
        title="Select Image"
        fileTypes={{
          allowMultiSelection: false,
          type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        }}
      />
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  onScroll: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  body: {
    paddingVertical: '1.5rem',
  },
  option: {
    flexDirection: 'row',
  },
  button: {
    marginTop: '2rem',
    marginBottom: '3rem',
    width: '50%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: '2rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4rem',
  },
});
