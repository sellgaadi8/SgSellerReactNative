import {Pressable, ScrollView} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';
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

export default function ExternelPanel({navigation, route}: ExternelPanelProps) {
  const [form, setForm] = useState([
    {
      id: 1,
      ques: 'Bonnet / Hood',
      option: [
        {id: 1, label: 'Ok', selected: false},
        {id: 2, label: 'Scratched', selected: false},
        {id: 3, label: 'Dented', selected: false},
      ],
    },
    {
      id: 2,
      ques: 'Roof',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
    {
      id: 3,
      ques: 'Dicky door/Boot Door',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
    {
      id: 4,
      ques: 'Left door front',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
        {id: 3, label: 'Rusted', selected: false},
      ],
    },
    {
      id: 5,
      ques: 'Left door back',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
        {id: 3, label: 'Rusted', selected: false},
      ],
    },
    {
      id: 6,
      ques: 'Right door front',
      option: [
        {id: 1, label: 'Dented', selected: false},
        {id: 2, label: 'Dented', selected: false},
        {id: 3, label: 'Rusted', selected: false},
      ],
    },
    {
      id: 7,
      ques: 'Right door back',
      option: [
        {id: 1, label: 'Rusted', selected: false},
        {id: 2, label: 'Dented', selected: false},
        {id: 3, label: 'Rusted', selected: false},
      ],
    },
    {
      id: 8,
      ques: 'Left fender',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
    {
      id: 9,
      ques: 'Right fender',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
    {
      id: 10,
      ques: 'Left Quater Panel',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
    {
      id: 11,
      ques: 'Right Quater Panel',
      option: [
        {id: 1, label: 'Scratched', selected: false},
        {id: 2, label: 'Dented', selected: false},
      ],
    },
  ]);
  const [hood, setHood] = useState('');
  const [roof, setRoof] = useState('');
  const [dicky, setDickey] = useState('');
  const [ldoorf, setLdoorf] = useState('');
  const [ldoorb, setLdoorb] = useState('');
  const [rdoorf, setRdoorf] = useState('');
  const [rdoorb, setRdoorb] = useState('');
  const [lfender, setLfender] = useState('');
  const [rfender, setRfender] = useState('');
  const [lQPanel, setLqPanel] = useState('');
  const [rQPanel, setRqPanel] = useState('');
  const [loading, setLoading] = useState(false);
  const {vehicleId} = useContext(GlobalContext);
  const selectAdd = useAppSelector(state => state.addExternal);
  const selectUpdate = useAppSelector(state => state.updateExternal);
  const setGet = useAppSelector(state => state.getExternal);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetExternelDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSelectOption(
    elementId: number,
    optionId: number,
    label: string,
    ques: string,
  ) {
    let temp = [...form];
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].option.length; j++) {
        if (optionId === temp[i].id && elementId === temp[i].option[j].id) {
          temp[i].option[j].selected = true;
        } else if (
          optionId === temp[i].id &&
          elementId !== temp[i].option[j].id
        ) {
          temp[i].option[j].selected = false;
        }
      }
    }
    setForm([...temp]);
    const updateFunctions: {[key: string]: Dispatch<SetStateAction<string>>} = {
      'Bonnet / Hood': setHood,
      Roof: setRoof,
      'Dicky door/Boot Door': setDickey,
      'Left door front': setLdoorf,
      'Left door back': setLdoorb,
      'Right door front': setRdoorf,
      'Right door back': setRdoorb,
      'Left fender': setLfender,
      'Right fender': setRfender,
      'Left Quater Panel': setLqPanel,
      'Right Quater Panel': setRqPanel,
    };

    const updateFunction = updateFunctions[ques];
    if (updateFunction) {
      updateFunction(label);
    }
  }

  function onSave() {
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
        {form.map((el, index) => {
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
        })}
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Discard"
              onPress={() => console.log('test')}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton label={'Save'} onPress={onSave} />
          </Box>
        </Box>
      </ScrollView>
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
