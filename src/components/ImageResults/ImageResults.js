import React, { Component } from 'react';
import { GridList, GridListTile, IconButton, Dialog, GridListTileBar, DialogContent, DialogActions } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import Button from "@material-ui/core/Button";
import { StarBorder } from '@material-ui/icons';

class ImageResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentImage: ''
    }
  }


  handleClickOpen = (img) => {
    this.setState({ open: true, currentImage: img})
  };

  handleClose = () => {
    this.setState({ open: false})
  };


  render() {
    let imageContents;

    const { images } = this.props;
    if (images) {
      imageContents = (<GridList cols={3}>
        {images.map(image => (
          <GridListTile
            key={image.id}
          >
            <img src={image.largeImageURL} alt="" />
            <GridListTileBar
              title={image.tags}
              subtitle={<span>by: <strong>{image.user}</strong> </span>}
              actionIcon={
                <Zoom in={true}>
                  <IconButton onClick={ () => this.handleClickOpen(image.largeImageURL)}>
                  <StarBorder style={{color: "#ffffff"}}/>
                  </IconButton>
                </Zoom>
              }
            >

            </GridListTileBar>
          </GridListTile>
        ))}

      </GridList>)
    } else {
      imageContents = null;
    }

    return (
      <div>
        {imageContents}
        <Dialog
          open={this.state.open} 
          onClose={this.handleClose}
        >
        <DialogContent>
          <img src={this.state.currentImage} alt="" style={{width: "100%"}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    )
  }
}

// ImageResults.propTypes = {
//   images: PropTypes.array.isRequired
// }




export default ImageResults;