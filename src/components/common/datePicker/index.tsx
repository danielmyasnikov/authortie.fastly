import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const inputDateStyle = {
  width: '300px',
  background: '#f2f7ff',
  padding: '11px 30px 9px 30px',
  margin: 0,
  borderBottom: '5px solid #e9f1ff',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
};

const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersDay: {
      day: {
        color: '#2c80ff',
      },
      daySelected: {
        backgroundColor: '#2c80ff',
      },

      current: {
        color: 'grey',
      },
    },
  },
});

interface Props {
  value: Date | string;
  // TODO: разобраться с типами
  onChange: (date: any) => void;
}

export const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputProps={{
            disableUnderline: true,
          }}
          style={inputDateStyle}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
