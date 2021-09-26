import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import format from 'date-fns/format';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const inputDateStyle = {
  width: '249px',
  height: '46px',
  background: '#ffffff',
  padding: '9px 30px 13px 30px',
  boxShadow: '0px 3px 17px rgba(43, 123, 211, 0.06)',
  margin: 0,
  borderRadius: '8px',
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
  value: Date | string | null;
  // TODO: разобраться с типами
  onChange: (date: any) => void;
}

export const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          emptyLabel=""
          margin="normal"
          id="date-picker-inline"
          minDate={new Date()}
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
          }}
          style={inputDateStyle}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
