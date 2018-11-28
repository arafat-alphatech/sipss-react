import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../store";
import TextField from "@material-ui/core/TextField";

class PopupEditMapel extends React.Component {
  state = {
    open: false,
    nama_mapel: "",
    jadwal: ""
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  // Buka tutup popup

  handleClickOpen = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "http://13.251.97.170:5001/admin/mapel-detail/" + this.props.id;
    axios
      .get(url, { headers })
      .then(response => {
        this.setState({ nama_mapel: response.data.data[0].nip });
        this.setState({ jadwal: response.data.data[0].nama });
        console.log("from pop up edit mapel by id", response.data.data[0]);
      })
      .catch(function(error) {
        //handle error
        console.log(error);
      });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // Buka tutup popup (end)

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          <i
            title="edit mata pelajaran"
            style={{ color: "blue" }}
            className="fas fa-user-edit"
          />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {"Edit Mata Pelajaran"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
              <div
                className="form-label-group"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  maxWidth: "500px"
                }}
              >
                <TextField
                  required
                  name="nama_mapel"
                  type="text"
                  label="Mata Pelajaran"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>

              {/* <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="jadwal"
                  type="text"
                  label="Jadwal"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div> */}

              {/* Input Jadwal Ujian */}
              <TextField
                required
                id="date"
                label="Jadwal"
                type="datetime-local"
                defaultValue="2018-11-25T10:30"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                style={{ minWidth: "300px", marginTop: "20px", width: "100%", marginLeft:'20px' }}
                name="tanggal_ujian"
                onChange={e => this.props.setField(e)}
              />
              {/* Input Jadwal Ujian (end) */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  "id_kelas, listMapel, listNamaKelas, id_mapel, is_login, listTingkat, adminToken",
  actions
)(PopupEditMapel);
