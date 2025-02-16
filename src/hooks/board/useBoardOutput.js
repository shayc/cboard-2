import { useState } from 'react';
import * as OBF from '../../open-board-format';
import { useBoardOutputHotKeys } from './useBoardOutputHotKeys';

export function useBoardOutput(params) {
  const { output = [], playAudio, speak } = params;

  const [values, setValues] = useState(output);

  const actionHandlers = {
    [OBF.SpecialtyActions.Backspace]: pop,
    [OBF.SpecialtyActions.Clear]: clear,
    [OBF.SpecialtyActions.Space]: space,
    [OBF.SpecialtyActions.Speak]: activate,
    [OBF.SpecialtyActions.Spell]: spellValue,
  };

  function push(value) {
    setValues((values) => [...values, value]);
  }

  function space() {
    setValues((values) => [...values, {}]);
  }

  function clear() {
    setValues([]);
  }

  function pop() {
    setValues((values) => values.slice(0, values.length - 1));
  }

  function spellValue(string) {
    setValues((values) => {
      const newValues = modifyLastValue(values, (value) => {
        return {
          ...value,
          label: `${value?.label || ''}${string}`,
        };
      });

      return newValues;
    });
  }

  async function activate() {
    const outputByType = groupValuesByType(values);

    for (const output of outputByType) {
      if (output.type === 'text') {
        await speak(output.value);
      }

      if (output.type === 'sound') {
        await playAudio(output.value);
      }
    }
  }

  useBoardOutputHotKeys({
    backspace: pop,
    del: clear,
    space: space,
    spell: spellValue,
    activate,
  });

  return {
    actionHandlers,
    activate,
    pop,
    clear,
    push,
    setValues,
    space,
    spellValue,
    values,
  };
}

function modifyLastValue(values, fn) {
  const lastValue = values[values.length - 1];
  const modifiedValue = fn(lastValue);

  const newValues = values.length
    ? [...values.slice(0, values.length - 1), modifiedValue]
    : [modifiedValue];

  return newValues;
}

function groupValuesByType(values) {
  const valuesByType = [];

  values.forEach(({ vocalization, label, sound }) => {
    const text = vocalization || label;

    if (sound) {
      valuesByType.push({ type: 'sound', value: sound });
    } else if (text) {
      const lastOutput = valuesByType[valuesByType.length - 1];

      if (lastOutput?.type === 'text') {
        lastOutput.value = `${lastOutput.value} ${text}`;
      } else {
        valuesByType.push({ type: 'text', value: text });
      }
    }
  });

  return valuesByType;
}
