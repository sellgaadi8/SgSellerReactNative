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
import {ExternelPanelProps, ImageType} from '../../types/propsTypes';
import {onUpdateExternal} from '../../redux/ducks/updateExternal';
import {onGetExternelDetails} from '../../redux/ducks/getExternal';
import Loader from '../../components/Loader';
import BasePicker from '../../components/BasePicker';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {ConsentFile} from '../../types/consent';
const list = [
  {label: 'Ok', value: 'Ok'},
  {label: 'Scratched', value: 'Scratched'},
  {label: 'Dented', value: 'Dented'},
  {label: 'Repainted', value: 'Repainted'},
];

export default function ExternelPanel({navigation, route}: ExternelPanelProps) {
  // const [form, setForm] = useState([
  //   {
  //     id: 1,
  //     ques: 'Bonnet / Hood',
  //     option: [
  //       {id: 1, label: 'Ok', selected: false},
  //       {id: 2, label: 'Scratched', selected: false},
  //       {id: 3, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 2,
  //     ques: 'Roof',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 3,
  //     ques: 'Dicky door/Boot Door',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 4,
  //     ques: 'Left door front',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //       {id: 3, label: 'Rusted', selected: false},
  //     ],
  //   },
  //   {
  //     id: 5,
  //     ques: 'Left door back',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //       {id: 3, label: 'Rusted', selected: false},
  //     ],
  //   },
  //   {
  //     id: 6,
  //     ques: 'Right door front',
  //     option: [
  //       {id: 1, label: 'Dented', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //       {id: 3, label: 'Rusted', selected: false},
  //     ],
  //   },
  //   {
  //     id: 7,
  //     ques: 'Right door back',
  //     option: [
  //       {id: 1, label: 'Rusted', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //       {id: 3, label: 'Rusted', selected: false},
  //     ],
  //   },
  //   {
  //     id: 8,
  //     ques: 'Left fender',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 9,
  //     ques: 'Right fender',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 10,
  //     ques: 'Left Quater Panel',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  //   {
  //     id: 11,
  //     ques: 'Right Quater Panel',
  //     option: [
  //       {id: 1, label: 'Scratched', selected: false},
  //       {id: 2, label: 'Dented', selected: false},
  //     ],
  //   },
  // ]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [hood, setHood] = useState('');
  const [hoodImage, setHoodImage] = useState<ConsentFile[]>([]);
  const [roof, setRoof] = useState('');
  const [roofImage, setRoofImage] = useState<ConsentFile[]>([]);
  const [dicky, setDickey] = useState('');
  const [dickyImage, setDickeyImage] = useState<ConsentFile[]>([]);
  const [ldoorf, setLdoorf] = useState('');
  const [ldoorfImage, setLdoorfImage] = useState<ConsentFile[]>([]);
  const [ldoorb, setLdoorb] = useState('');
  const [ldoorbImage, setLdoorbImage] = useState<ConsentFile[]>([]);
  const [rdoorf, setRdoorf] = useState('');
  const [rdoorfImage, setRdoorfImage] = useState<ConsentFile[]>([]);
  const [rdoorb, setRdoorb] = useState('');
  const [rdoorbImage, setRdoorbImage] = useState<ConsentFile[]>([]);
  const [lfender, setLfender] = useState('');
  const [lfenderImage, setLfenderImage] = useState<ConsentFile[]>([]);
  const [rfender, setRfender] = useState('');
  const [rfenderImage, setRfenderImage] = useState<ConsentFile[]>([]);
  const [lQPanel, setLqPanel] = useState('');
  const [lQPanelImage, setLqPanelImage] = useState<ConsentFile[]>([]);
  const [rQPanel, setRqPanel] = useState('');
  const [rQPanelImage, setRqPanelImage] = useState<ConsentFile[]>([]);
  const [loading, setLoading] = useState(false);
  const {vehicleId} = useContext(GlobalContext);
  const selectAdd = useAppSelector(state => state.addExternal);
  const selectUpdate = useAppSelector(state => state.updateExternal);
  const setGet = useAppSelector(state => state.getExternal);
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

  // function onSelectOption(
  //   elementId: number,
  //   optionId: number,
  //   label: string,
  //   ques: string,
  // ) {
  //   let temp = [...form];
  //   for (let i = 0; i < temp.length; i++) {
  //     for (let j = 0; j < temp[i].option.length; j++) {
  //       if (optionId === temp[i].id && elementId === temp[i].option[j].id) {
  //         temp[i].option[j].selected = true;
  //       } else if (
  //         optionId === temp[i].id &&
  //         elementId !== temp[i].option[j].id
  //       ) {
  //         temp[i].option[j].selected = false;
  //       }
  //     }
  //   }
  //   setForm([...temp]);
  //   const updateFunctions: {[key: string]: Dispatch<SetStateAction<string>>} = {
  //     'Bonnet / Hood': setHood,
  //     Roof: setRoof,
  //     'Dicky door/Boot Door': setDickey,
  //     'Left door front': setLdoorf,
  //     'Left door back': setLdoorb,
  //     'Right door front': setRdoorf,
  //     'Right door back': setRdoorb,
  //     'Left fender': setLfender,
  //     'Right fender': setRfender,
  //     'Left Quater Panel': setLqPanel,
  //     'Right Quater Panel': setRqPanel,
  //   };

  //   const updateFunction = updateFunctions[ques];
  //   if (updateFunction) {
  //     updateFunction(label);
  //   }
  // }

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
        ),
      );
    }
  }

  useEffect(() => {
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAdd, selectUpdate]);

  function onSaveImage(image: ImageType[] | null) {
    if (image) {
      // let prevFiles = getDocs(uploadType);
      // prevFiles.push(...image);
      saveDocs(uploadType, image);
    }
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

  function saveDocs(type: ExternelDocumentType, files: ConsentFile[]) {
    switch (type) {
      case 'bonnet_head':
        setHoodImage(files);
        break;
      case 'roof':
        setRoofImage(files);
        break;
      case 'dickey_door':
        setDickeyImage(files);
        break;
      case 'left_door_front':
        setLdoorfImage(files);
        break;
      case 'left_door_back':
        setLdoorbImage(files);
        break;
      case 'right_door_front':
        setRdoorfImage(files);
        break;
      case 'right_door_back':
        setRdoorbImage(files);
        break;
      case 'left_fender':
        setLfenderImage(files);
        break;
      case 'right_fender':
        setRfenderImage(files);
        break;
      case 'left_quater_panel':
        setLqPanelImage(files);
        break;
      case 'right_quater_panel':
        setRqPanelImage(files);
        break;
    }
  }

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
        {/* {form.map((el, index) => {
          return (
            <Box key={index.toString()} style={styles.body}>
              <CustomText
                fontSize={14}
                lineHeight={28}
                fontFamily="Roboto-Medium"
                color="#111111">
                {el.ques}
              </CustomText>
              <Box style={styles.option}>
                {el.option.map((tl, _index) => {
                  return (
                    <Pressable
                      style={styles.optionButton}
                      onPress={() =>
                        onSelectOption(tl.id, el.id, tl.label, el.ques)
                      }>
                      <Icon
                        name={
                          tl.selected ? 'radiobox-marked' : 'radiobox-blank'
                        }
                        size={20}
                        color={tl.selected ? colors.secondary : '#7F747C'}
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{marginRight: 5}}
                      />
                      <CustomText
                        fontSize={16}
                        lineHeight={24}
                        fontFamily="Roboto-Regular"
                        color="#1C1B1F"
                        key={_index.toString()}>
                        {tl.label}
                      </CustomText>
                    </Pressable>
                  );
                })}
              </Box>
            </Box>
          );
        })} */}
        <Box>
          <BasePicker
            data={list}
            title="Bonnet / Hood"
            onValueChange={setHood}
            selectedValue={hood}
            onPressCamera={onChangeHood}
            selectPhoto={hoodImage.length !== 0 ? hoodImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Roof"
            onValueChange={setRoof}
            selectedValue={roof}
            onPressCamera={onChangeRoof}
            selectPhoto={roofImage.length !== 0 ? roofImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Dicky door/Boot Door"
            onValueChange={setDickey}
            selectedValue={dicky}
            onPressCamera={onChangeDickey}
            selectPhoto={dickyImage.length !== 0 ? dickyImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Left door front"
            onValueChange={setLdoorf}
            selectedValue={ldoorf}
            onPressCamera={onChangeLdoorF}
            selectPhoto={ldoorfImage.length !== 0 ? ldoorfImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Left door back"
            onValueChange={setLdoorb}
            selectedValue={ldoorb}
            onPressCamera={onChangeLdoorB}
            selectPhoto={ldoorbImage.length !== 0 ? ldoorbImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Right door front"
            onValueChange={setRdoorf}
            selectedValue={rdoorf}
            onPressCamera={onChangeRdoorF}
            selectPhoto={rdoorfImage.length !== 0 ? rdoorfImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Right door back"
            onValueChange={setRdoorb}
            selectedValue={rdoorb}
            onPressCamera={onChangeRdoorB}
            selectPhoto={rdoorbImage.length !== 0 ? rdoorbImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Left fender"
            onValueChange={setLfender}
            selectedValue={lfender}
            onPressCamera={onChangeLeftFender}
            selectPhoto={lfenderImage.length !== 0 ? lfenderImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Right fender"
            onValueChange={setRfender}
            selectedValue={rfender}
            onPressCamera={onChangeRightFender}
            selectPhoto={rfenderImage.length !== 0 ? rfenderImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Left Quater Panel"
            onValueChange={setLqPanel}
            selectedValue={lQPanel}
            onPressCamera={onChangeLPanel}
            selectPhoto={lQPanelImage.length !== 0 ? lQPanelImage[0].uri : ''}
          />
          <BasePicker
            data={list}
            title="Right Quater Panel"
            onValueChange={setRqPanel}
            selectedValue={rQPanel}
            onPressCamera={onChangeRPanel}
            selectPhoto={rQPanelImage.length !== 0 ? rQPanelImage[0].uri : ''}
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
