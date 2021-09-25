/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { flatten } from 'lodash';
import {
  createStyles,
  fade,
  Theme,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
    },
    '& textarea': {
      minHeight: '156px',
      borderLeftWidth: 6,
      padding: '4px !important',
      background: '#ffffff',
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
    fontSize: '14px',
  },
})(Chip);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      //   flexWrap: 'wrap',
    },
    margin: {
      //   margin: theme.spacing(1),
    },
  }),
);

interface Props {
  onChange: (value: string[]) => void;
}

export const KeyWords: React.FC<Props> = ({ onChange }) => {
  const words = [''];
  const classes = useStyles();
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={words.map((option) => option)}
      freeSolo
      onChange={(e, newval, reason) => {
        onChange(newval);
      }}
      open={false}
      renderTags={(value: string[], getTagProps) => {
        const newVal = flatten(
          value.map((val: string) => {
            return val.split(';');
          }),
        ).filter((item) => !!item.length);
        return newVal.map((option: string, index: number) => {
          return (
            <React.Fragment key={index + option}>
              <CssChip size="small" variant="outlined" label={option} {...getTagProps({ index })} />
            </React.Fragment>
          );
        });
      }}
      renderInput={(params) => (
        <CssTextField className={classes.root} multiline {...params} variant="filled" />
      )}
    />
  );
};
