import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5EA7DB'
    },
    secondary: red
  },
  status: {
    danger: 'red'
  },
  background: {
    darkgrey: grey[300],
    lightgrey: grey[100]
  }
});

export default theme;
