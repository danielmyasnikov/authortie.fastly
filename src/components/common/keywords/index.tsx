/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { flatten } from 'lodash';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
    focused: {},
  }),
);

export const KeyWords = () => {
  const classes = useStylesReddit();
  const words = [''];
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={words.map((option) => option)}
      //   onInputChange={handleInputChange}
      freeSolo
      open={false}
      renderTags={(value: string[], getTagProps) => {
        const newVal = flatten(
          value.map((val: string) => {
            return val.split(';');
          }),
        ).filter((item) => !!item.length);
        return newVal.map((option: string, index: number) => {
          return <Chip variant="outlined" label={option} {...getTagProps({ index })} />;
        });
      }}
      renderInput={(params) => (
        <TextField
          multiline
          {...params}
          variant="filled"
        //   InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
        />
      )}
    />
  );
};
