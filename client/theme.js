import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: purple
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
