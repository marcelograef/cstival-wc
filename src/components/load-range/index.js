import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import {
  getData,
  getRealPositionLong,
  getRealPositionROL,
  getRealPositionShort,
  saveRange,
} from '../../utilities';
import { calculateAvg } from '../../utilities/calculateInfo.js';
import { Button, CardTable, Field, InfoContainer, OpenRaise } from '../index';
import './index.scss';
import '../push-position-stack/index.scss';
import MyContext from '../../context';
import { initialState } from '../../constants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
const positionsArray = positions.split(',');

export const LoadRange = () => {
  const { tableValues, setTableValues } = useContext(MyContext);

  const [range, setRange] = useState(initialState);

  const [flatRanges, setFaltRanges] = useState([]);
  const [flatSelected, setFlatSelected] = useState(-1);

  const [avg, setAvg] = useState(null);

  const [selected, setSelected] = useState('');

  useEffect(() => {
    const res = calculateAvg(range);
    setAvg(res);
  }, [range]);

  const [sbAction, setSbAction] = useState('');

  //const [range] = useState({});

  const [key, setKey] = useState('');
  const [situation, setSituation] = useState('');
  const [actionToAdd, setActionToAdd] = useState('');

  const [yourPosition, setYourPosition] = useState('');
  const [villainPosition, setVillainPosition] = useState('');

  const [bbsSelected, setBbsSelected] = useState('');
  const [positionSelected, setPositionSelected] = useState('');

  const [errors] = useState({ call: '', raise: '', bluff: '', fold: '' });

  useEffect(() => {
    const res = calculateAvg(tableValues);
    setAvg(res);
  }, [tableValues]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    console.log({ name, value });

    if (name.includes('span')) {
      const { info } = tableValues;
      setTableValues({ ...tableValues, info: { ...info, [name]: value } });
    } else if (name.includes('messages')) {
      const { info } = tableValues;
      const { messages } = info;

      const [, index, isButton] = name.split('-');

      messages[index] = isButton ? '' : value;

      setTableValues({ ...tableValues, info: { ...info, messages: messages } });
    } else {
      setTableValues({ ...tableValues, [name]: value });
    }

    console.log({ tableValues });
  };

  const onClick = (event) => {
    const {
      target: { name },
    } = event;
    console.log({ name });
    setActionToAdd(name);
  };

  const handleSave = async () => {
    try {
      const res = await saveRange({
        key,
        situation,
        ...tableValues,
        info: {
          ...tableValues.info,
          messages: tableValues.info.messages.filter((m) => m.trim() !== ''),
        },
      });
      console.log(res);
      console.log(res.status);
      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        toast.info(error?.response?.data.message);
      } else {
        toast.error(error.message);
      }
      console.log({ error });
    }
  };

  const getPositionsOR = () => {
    const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB';

    return positions.split(',').map((p) => (
      <button
        className={`selector ${p === situation ? 'active' : ''}`}
        key={p}
        onClick={() => {
          setSituation(p);
          setTableValues(initialState);

          getData('OR', p).then((rangeData) => {
            console.log({ rangeData: rangeData });
            setRange(rangeData);

            setTableValues(rangeData);
            //setSelected(p);
          });
        }}
      >
        {p}
      </button>
    ));
  };

  const getPositionsROR = (player = '') => {
    return positionsArray.map((p) => {
      let active = '';
      if (player) {
        active = yourPosition === p ? 'active' : '';
      } else {
        active = villainPosition === p ? 'active' : '';
      }

      return (
        <button
          className={`selector ${active}`}
          key={p}
          disabled={
            player &&
            positionsArray.indexOf(p) - 1 <
              positionsArray.indexOf(villainPosition)
              ? true
              : false
          }
          onClick={() => {
            let indexYP = positionsArray.indexOf(yourPosition);
            let indexVP = positionsArray.indexOf(villainPosition);
            if (player === 'you') {
              setYourPosition(p);
              indexYP = positionsArray.indexOf(p);
              if (positionsArray.indexOf(p) - 1 < indexVP)
                setVillainPosition('');
            } else {
              setVillainPosition(p);
              indexVP = positionsArray.indexOf(p);
            }

            const realYourPos = getRealPositionLong(indexYP);
            const realVillainPos = getRealPositionLong(indexVP);
            setSituation(`${realYourPos}|${realVillainPos}`);
            setTableValues(initialState);
            getData('ROR', `${realYourPos}|${realVillainPos}`).then(
              (rangeData) => {
                setRange(rangeData);
                setTableValues(rangeData);
              }
            );
          }}
        >
          {p}
        </button>
      );
    });
  };

  const getPositionsRes3 = (player = '') => {
    return positionsArray.map((p) => {
      let active = '';
      if (player) {
        active = yourPosition === p ? 'active' : '';
      } else {
        active = villainPosition === p ? 'active' : '';
      }

      let disabled;
      if ((!player && p.includes('UTG')) || (player && p === 'BB')) {
        disabled = true;
      } else {
        disabled =
          !player &&
          positionsArray.indexOf(yourPosition) > positionsArray.indexOf(p) - 1
            ? true
            : false;
      }

      return (
        <button
          className={`selector ${active}`}
          key={p}
          disabled={disabled}
          onClick={() => {
            let indexYP = positionsArray.indexOf(yourPosition);
            let indexVP = positionsArray.indexOf(villainPosition);
            if (player === 'you') {
              setYourPosition(p);
              indexYP = positionsArray.indexOf(p);
              if (positionsArray.indexOf(p) - 1 < indexVP)
                setVillainPosition('');
            } else {
              setVillainPosition(p);
              indexVP = positionsArray.indexOf(p);
            }

            const realYourPos = getRealPositionLong(indexYP);
            const realVillainPos = getRealPositionLong(indexVP);
            if (!(yourPosition === 'SB' && villainPosition === 'BB')) {
              setSbAction('');
            }

            setSituation(`${realYourPos}|${realVillainPos}`);
            setTableValues(initialState);
            if (!!realYourPos && !!realVillainPos) {
              getData('RES3', `${realYourPos}|${realVillainPos}`).then(
                (rangeData) => {
                  setRange(rangeData);
                  setTableValues(rangeData);
                }
              );
            }
          }}
        >
          {p}
        </button>
      );
    });
  };

  const sbVsBbOptions = () => {
    const indexYP = positionsArray.indexOf(yourPosition);
    const indexVP = positionsArray.indexOf(villainPosition);

    const realYourPos = getRealPositionLong(indexYP);
    const realVillainPos = getRealPositionLong(indexVP);

    const onClick = (action) => {
      setSbAction(action);
      setSituation(`${realYourPos}|${realVillainPos}|${action}`);
    };
    return (
      <>
        <button
          className={`selector ${
            sbAction === '3Bet' ? 'active' : ''
          } not-circle`}
          onClick={() => onClick('3Bet')}
        >
          Respuesta a 3Bet
        </button>
        <button
          className={`selector ${
            sbAction === 'ROL' ? 'active' : ''
          } not-circle`}
          onClick={() => onClick('ROL')}
        >
          Respuesta a RoL
        </button>
      </>
    );
  };

  const getPositionsROL = (player = '') => {
    const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';
    const positionsArray = positions.split(',');
    return positionsArray.map((p) => {
      const active = yourPosition === p ? 'active' : '';

      return (
        <button
          className={`selector ${active}`}
          key={p}
          onClick={() => {
            let indexYP = positionsArray.indexOf(yourPosition);
            setYourPosition(p);
            indexYP = positionsArray.indexOf(p);

            const realYourPos = getRealPositionROL(indexYP);

            setTableValues(initialState);
            getData('ROL', `${realYourPos}`).then((rangeData) => {
              setRange(rangeData);
              setTableValues(rangeData);
            });

            setSituation(`${realYourPos}`);
          }}
        >
          {p}
        </button>
      );
    });
  };

  const renderSelectorPush = () => {
    const handleSelection = (event) => {
      console.log({ event });
      const {
        value,
        dataset: { target },
      } = event.target;
      console.log({ target });
      console.log({ value });

      switch (target) {
        case 'BB':
          setBbsSelected(value);
          break;
        case 'POS':
          setPositionSelected(value);
          break;

        default:
          break;
      }
    };
    return (
      <div style={{ width: '100%' }}>
        <div className="selector-push">
          <span>BBs</span>
          <div>
            {Array.from({ length: 19 }, (x, i) => i + 2)
              .reverse()
              .map((i) => (
                <button
                  data-target="BB"
                  className={i === parseInt(bbsSelected) ? 'active' : ''}
                  onClick={handleSelection}
                  value={i}
                >
                  {i}
                </button>
              ))}
          </div>
        </div>
        <div className="selector-push">
          <span>Position</span>
          <div>
            {positionsArray.map((p) => (
              <button
                data-target="POS"
                className={p === positionSelected ? 'active' : ''}
                onClick={handleSelection}
                value={p}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const loadRangePush = (rangeSelector, index) => {
    setTableValues(initialState);
    setFlatSelected(index);
    const sitAux = rangeSelector.replace('+', '').replace(/\s/, '');
    setSituation(sitAux);
    getData('PUSH', sitAux).then((rangeData) => {
      setRange(rangeData);
      setTableValues(rangeData);
    });
  };

  useEffect(() => {
    console.log({ positionSelected, bbsSelected });
    if (bbsSelected && positionSelected) {
      let flag = false;
      const auxRanges = [];
      [...positionsArray, 'BB'].forEach((p) => {
        if (flag) {
          auxRanges.push(
            `F-${p}|${positionSelected
              .trim()
              .replace('+', '')}|${bbsSelected.trim()}BB`
          );
        }
        if (p === positionSelected.trim()) {
          flag = true;
        }
      });

      setFaltRanges(auxRanges);
      setFlatSelected(-1);
      setTableValues(initialState);

      const sitAux = `${positionSelected.replace('+', '')}|${bbsSelected}BB`;
      getData('PUSH', sitAux).then((rangeData) => {
        setRange(rangeData);
        setTableValues(rangeData);
      });

      setSituation(sitAux);
    }
  }, [positionSelected, bbsSelected]);

  const clearFunction = (val) => {
    setTableValues({ ...tableValues, [val]: '' });
  };

  const handleMenu = (val) => {
    setKey(val);
    setTableValues(initialState);
  };

  const handleAddMessage = () => {
    const messages = [...tableValues.info.messages, ''];
    setTableValues({ ...tableValues, info: { ...tableValues.info, messages } });
  };

  return (
    <div className="selector-container">
      <div className="button-container spaced">
        <Button
          className={key === 'OR' ? 'selected' : ''}
          onClick={() => handleMenu('OR')}
        >
          Open Raise
        </Button>
        <Button
          className={key === 'ROR' ? 'selected' : ''}
          onClick={() => handleMenu('ROR')}
        >
          Respuesta vs OR
        </Button>
        <Button
          className={key === 'RES3' ? 'selected' : ''}
          onClick={() => handleMenu('RES3')}
        >
          Respuesta 3Bet
        </Button>
        <Button
          className={key === 'ROL' ? 'selected' : ''}
          onClick={() => handleMenu('ROL')}
        >
          ROL
        </Button>
        <Button
          className={key === 'PUSH' ? 'selected' : ''}
          onClick={() => handleMenu('PUSH')}
        >
          Push por Pos. y Stack
        </Button>
      </div>
      <div
        className="row content-container"
        style={{ justifyContent: 'center', paddingBottom: '15px' }}
      >
        {key === 'OR' && getPositionsOR()}
        {key === 'ROR' && (
          <div className="selector-container">
            <div className="selector-body">
              <span className="selector label">OR</span>
              {getPositionsROR()}
            </div>
            <div className="selector-body">
              <span className="selector label">Hero</span>
              {getPositionsROR('you')}
            </div>
          </div>
        )}
        {key === 'RES3' && (
          <div className="selector-container">
            <div className="selector-body">
              <span className="selector label">OR</span>{' '}
              {getPositionsRes3('you')}
            </div>
            <div className="selector-body">
              <span className="selector label">3Bet</span> {getPositionsRes3()}
            </div>
            {yourPosition === 'SB' && villainPosition === 'BB' && (
              <div className="selector-body">{sbVsBbOptions()}</div>
            )}
          </div>
        )}
        {key === 'ROL' && getPositionsROL()}
        {key === 'PUSH' && renderSelectorPush()}
      </div>
      <div className="selector-body spaced">
        <Field
          register={{ onChange: onChange, onClick: onClick }}
          type="text"
          name="raise"
          label="Raise Range"
          error={errors.raise}
          placeholder="Raise Range"
          value={tableValues?.raise}
          clear={true}
          clearFunction={() => clearFunction('raise')}
          actionToAdd={actionToAdd}
        />
        <Field
          register={{ onChange: onChange, onClick: onClick }}
          type="text"
          name="call"
          label="Call Range"
          error={errors.call}
          placeholder="Call Range"
          value={tableValues?.call}
          clear={true}
          clearFunction={() => clearFunction('call')}
          actionToAdd={actionToAdd}
        />
        <Field
          register={{ onChange: onChange, onClick: onClick }}
          type="text"
          name="bluff"
          label="Bluff Range"
          error={errors.bluff}
          placeholder="Bluff Range"
          value={tableValues?.bluff}
          clear={true}
          clearFunction={() => clearFunction('bluff')}
          actionToAdd={actionToAdd}
        />
        <Field
          register={{ onChange: onChange, onClick: onClick }}
          type="text"
          name="fold"
          label="Fold Range"
          error={errors.fold}
          placeholder="Fold Range"
          value={tableValues?.fold}
          clear={true}
          clearFunction={() => clearFunction('fold')}
          actionToAdd={actionToAdd}
        />
      </div>
      <Button onClick={handleSave}>Guardar</Button>

      <div className="flex-container">
        <div className="row content-container">
          <CardTable actionToAdd={actionToAdd} isEditable={true} />
          <InfoContainer
            data={{ ...tableValues?.info, avg }}
            isEditable={true}
            onChange={onChange}
            handleAddMessage={handleAddMessage}
          />
          {flatRanges.length > 0 && (
            <div className="flat-container">
              <div className="flat-title">Flat</div>
              {flatRanges.map((rangeText, index) => {
                const text = rangeText.split('-')[1].split('|')[0];
                return (
                  <div
                    className={`flat-option ${
                      flatSelected === index ? 'selected' : ''
                    }`}
                    onClick={() => loadRangePush(rangeText, index)}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadRange;
