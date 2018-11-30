import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "unistore/react";
import { actions } from "../store";
import TextField from "@material-ui/core/TextField";
  import axios from "axios";
import swal from 'sweetalert';

class PopupEditGuru extends React.Component {
  state = {
    open: false,
    nip: "",
    nama: "",
    alamat: "",
    jenis_kelamin: "",
    telepon: "",
    username: "",
    password: ""
  };

  // edit guru
  doEditGuru = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/guru/"+this.props.id;
    const data = {
      nip: this.state.nip,
      nama: this.state.nama,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      telepon: this.state.telepon,
      username: this.state.username,
      password: this.state.password
    };
    axios
      .put(url, data, { headers })
      .then(response => {
        swal("Sukses", "Edit guru berhasil", "success");
        this.props.getAllGuru(this.props.token)
        console.log("Response dari API: ", response);
        this.setState({ open: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // edit guru (end)

  //set state ketika ada inputan
  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  //set state ketika ada inputan (end)

  // Buka tutup popup
  handleClickOpen = () => {
    const token = this.props.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/guru-detail/" +  this.props.id;
    axios
    .get(url,{headers})
    .then((response) => {
      this.setState({ nip: response.data.data[0].nip });
      this.setState({ nama: response.data.data[0].nama });
      this.setState({ alamat: response.data.data[0].alamat });
      this.setState({ jenis_kelamin: response.data.data[0].jenis_kelamin });
      this.setState({ telepon: response.data.data[0].telepon });
      this.setState({ username: response.data.data[0].username });
      this.setState({ password: response.data.data[0].password});
      console.log("from pop up edit guru by id", response.data.data[0]);
    })
    .catch(function (error) {
      //handle error
      console.log(error);
    });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false,
                    nip: "",
                    nama:"",
                    alamat:"",
                    jenis_kelamin:"",
                    telepon:"",
                    username:"",
                    password:""});
  };
  // Buka tutup popup (end)

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          <i
            title="edit data guru"
            style={{ color: "#00e640" }}
            className="fas fa-user-edit"
          >
          </i>
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
            {"Edit Data Guru"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="nama"
                  type="text"
                  label={"Nama Guru: "+this.state.nama}
                  defaultValue={this.state.nama}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>

              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="nip"
                  type="text"
                  label={"NIP: "+this.state.nip}
                  defaultValue={this.state.nip}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>

              {/* Piih Jenis Kelamin */}

              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.jenis_kelamin}
                name="jenis_kelamin"
                onChange={e => this.inputChange(e)}
              >
                <option>Jenis Kelamin</option>
                {[["Laki - laki", "L"], ["Perempuan", "P"]].map((item, key) => {
                  return (
                    <option value={item[1]} key={key}>
                      {item[0]}
                    </option>
                  );
                })}
              </select>

              {/* Pilih Jenis Kelamin (end) */}

              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="alamat"
                  type="text"
                  label={"Alamat: "+this.state.alamat}
                  defaultValue={this.state.alamat}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>

              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="telepon"
                  type="text"
                  label={"Telepon: "+this.state.telepon}
                  defaultValue={this.state.telepon}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
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
                  name="username"
                  type="text"
                  label={"Username: "+this.state.username}
                  defaultValue={this.state.username}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="password"
                  type="password"
                  label={"Password: "+ this.state.password}
                  defaultValue={this.state.password}
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button
              onClick={() => this.doEditGuru()}
              color="primary"
              autoFocus
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  "is_login, adminToken",
  actions
)(PopupEditGuru);