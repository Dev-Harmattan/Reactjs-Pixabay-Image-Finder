import React, { Component } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ImageResults from '../ImageResults/ImageResults';
import axios from 'axios';


const useStyles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 150,
  }
})

class Search extends Component {


  state = {
    searchText: '',
    amount: 10,
    apiUrl: 'https://pixabay.com/api',
    key: '18637642-8c8ef4f314c5f95d568a74832',
    images: []
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (value === "") {
        this.setState({ images: [] })
      } else {
        axios.get(`${this.state.apiUrl}/?key=${this.state.key}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  }

  handleSelectChange = e => {
    this.setState({ amount: e.target.value })
  }




  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          name="searchText"
          label="Search for images"
          value={this.state.searchText}
          onChange={this.handleChange}
          fullWidth
          inputProps={{
            autoComplete: 'off'
          }}
        >
        </TextField>
        <br />

        <FormControl className={classes.formControl}>
          <InputLabel id="select-amount">Amount</InputLabel>
          <Select
            name="amount"
            labelId="select-amount"
            id="amount"
            value={this.state.amount}
            onChange={this.handleSelectChange}
          >
            <MenuItem value={5} >5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        {this.state.images ? <ImageResults images={this.state.images} /> : null}
      </div>
    )
  }
}

export default withStyles(useStyles)(Search);
