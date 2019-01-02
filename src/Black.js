import { createMuiTheme } from '@material-ui/core/styles';
// import red from "@material-ui/core/colors/red";
// import white from "@material-ui/core/colors/white";
// import black from "@material-ui/core/colors/black";
// import grey from "@material-ui/core/colors/grey";

export default createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#000000'
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#d50000'
			// dark: will be calculated from palette.secondary.main,
		}
		// error: will use the default color
	}
});
