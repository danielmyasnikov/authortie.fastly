/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
    },
    '& textarea': {
      paddingTop: '4px',
      minHeight: '156px',
      borderLeftWidth: 6,
      padding: '4px !important',
      background: '#ffffff',
      minWidth: '50%',
    },
    '& .MuiInputBase-root, & .MuiFilledInput-root, &  .MuiFilledInput-underline, &  .MuiAutocomplete-inputRoot, &  .MuiInputBase-fullWidth, &  .MuiInputBase-formControl, & .MuiInputBase-multiline, & .MuiFilledInput-multiline,& .MuiInputBase-adornedEnd,& .MuiFilledInput-adornedEnd': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0px 3px 17px rgba(43, 123, 211, 0.06)',
      padding: '16px !important',
      maxWidth: '438px !important',
      width: '100%',
      minHeight: '196px',
    },
    '& .MuiAutocomplete-inputRoot, & .MuiAutocomplete-input': {
      minWidth: '100px',
    },
    '& .MuiFilledInput-underline:before': {
      display: 'none',
    },
    '& .MuiFilledInput-underline:after': {
      display: 'none',
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
  },
})(TextField);

const CssChip = withStyles({
  root: {
    padding: '9px 8px',
    margin: '3px',
    fontSize: '14px',
  },
})(Chip);

interface Props {
  onChange: (value: string[]) => void;
}

export const KeyWords: React.FC<Props> = ({ onChange }) => {
  const [words, setWords] = useState<string[]>([]);

  function handleChange(value: string) {
    const newValue = value.split(';').filter((item) => !!item.length);
    if (value.indexOf(';') > -1) {
      setWords([...words, ...newValue]);
      onChange([...words, ...newValue]);
    }
  }
  function handleDelete(option: string) {
    const filterWords = words.filter((entry) => entry !== option);
    setWords(filterWords);
    onChange(filterWords);
  }

  return (
    <Autocomplete
      value={words}
      multiple
      id="tags-filled"
      options={words.map((option) => option)}
      freeSolo
      open={false}
      onInputChange={(event: object, value: string, reason: string) => handleChange(value)}
      renderTags={(value: string[], getTagProps) => {
        return value.map((option: string, index: number) => {
          return (
            <React.Fragment key={index + option}>
              <CssChip
                onDelete={() => handleDelete(option)}
                size="small"
                variant="outlined"
                label={option}
              />
            </React.Fragment>
          );
        });
      }}
      renderInput={(params) => <CssTextField multiline {...params} variant="filled" />}
    />
  );
};
