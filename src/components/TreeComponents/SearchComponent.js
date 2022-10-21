import * as React from 'react';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useMutation } from 'react-query';
import ULoadingComponent from '../UComponents/ULoadingComponent';
import { SEARCH_FAMILY_TREE } from '../../utils/server_auth_routes';
import useToken from '../../utils/useToken';
import { searchData } from '../../utils/util_query';
import { handleApiError } from "../../utils/libs/handleApiError";
import { isError } from '../../utils/libs/checkObject';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectArguments } from '../../utils/libs/utilFunctions';
import { APP_FAMILY_TREE_BIO_PAGE } from '../../utils/app_routes';
import InfoDialog from './infodialog'

let nodes = [

];

export default function SearchComponent() {
  const { token } = useToken();
  const [values, setValues] = React.useState();
  const [errors, setErrors] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [bio, setBio] = React.useState({});
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    setBio({});
  };

  const handleBio = () => {
    setOpen(false);

    // history.push(injectArguments());
    let bioUrl = injectArguments(APP_FAMILY_TREE_BIO_PAGE, { id: bio?.id });
    history.push(bioUrl);
  }

  const handleButtonClick = (node) => (e) => {
    setBio(node);
    setOpen(true);
  }

  const mutation = useMutation(searchData, {
    onSuccess: (response) => {
      console.log("d: ", response);
      const message = response?.data?.message;
      nodes = response?.data?.results;
      toast.success(message);
    },
    onError: (error, variables, context) => {
      handleApiError(error);
    }
  });

  const searchClick = () => {
    setErrors('');
    let payload_data = values;
    let check_errors = values ? "" : "Please enter a value";
    if (check_errors) {
      setErrors(check_errors);
      return;
    }
    mutation.mutate({
      url: SEARCH_FAMILY_TREE,
      authenticate: true,
      token,
      payload_data
    })
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <TextField
            sx={{ m: 3, width: '70vw' }}
            id="outlined-password-input"
            label="Enter a name and hit the search icon"
            type="text"
            fullWidth
            autoComplete="current-password"
            name="searchTerm"
            value={values}
            onChange={(evt) => setValues(evt.target.value)}
            error={isError(errors)}
            helperText={errors}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={searchClick}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Grid>

      {mutation?.isLoading && (<ULoadingComponent />)}

      {mutation?.isSuccess && (
        <>
          <InfoDialog open={open} handleClose={handleClose} bio={bio} handleBio={handleBio}/>
          <Typography variant="h6" noWrap component="div">
            {`${nodes.length} result(s) found`}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Parent</TableCell>
                  <TableCell align="right">Spouse</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nodes.map((node) => (
                  <TableRow
                    key={node.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {node.full_name}
                    </TableCell>
                    <TableCell align="right">{node.gender}</TableCell>
                    <TableCell align="right">{node.parent}</TableCell>
                    <TableCell align="right">{node.spouse}</TableCell>
                    <TableCell align="right"><Button variant="contained" color="warning" onClick={handleButtonClick(node)}>
                      Expand
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
      }
    </>
  )
}








