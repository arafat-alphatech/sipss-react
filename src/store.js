import createStore from "unistore";
import devtools from "unistore/devtools";
import axios from "axios";
import persistStore from "unissist";
import localStorageAdapter from "unissist/integrations/localStorageAdapter";
import swal from 'sweetalert'
import bye from './bye.gif'

const initialState = {
  id_kelas: "",
  id_mapel: "",
  id_tingkat: "",
  listMapel: [],
  listNamaKelas: [],
  listUjian: [],
  tanggal_ujian: "2018-11-25T10:30",
  kode_soal: "",
  jumlah_soal: "",
  no_soal: "",
  labels: [],
  data: [],
  listPaketSoal: [],
  id_paket_soal: "",
  current_all_soal: [],
  token: "",
  adminToken: "" ,
  login_as: "",
  is_login: "",
  current_jumlah_soal: "",
  siap_cetak:[],
  listGuru:[],
  listSiswa:[],
  listKelas:[],
  listAllMapel:[],
  csvData : [],
  tableData : [],
  listMapelConj:[],
  listRekap:[],
  listRapor:[],
  totalPersen:0,
  listTingkat: [{"id_tingkat":1,"nama_tingkat":"VII"},{"id_tingkat":2,"nama_tingkat":"VIII"},{"id_tingkat":3,"nama_tingkat":"IX"}]
};

const store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

const adapter = localStorageAdapter();
persistStore(store, adapter);

const actions = store => ({
  setField: (state, event) => {
    return { [event.target.name]: event.target.value };
  },

  getMaPel: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/kelas-mapel/" + state.id_kelas;
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listMapel: response.data.data
        });
        // console.log("mapel: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getKelas:async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/kelas/"+state.id_tingkat;
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listNamaKelas: response.data.data
        });
        // console.log("List Kelas: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getKelasByGuru: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/kelas-guru";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listNamaKelas: response.data.data
        });
        console.log("List Kelas: ", response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getUjian: async (state, id_kelas, id_mapel) => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url =
      "https://sipss-api.online/paket-kelas?id_kelas=" +
      id_kelas +
      "&id_mapel=" +
      id_mapel;
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listUjian: response.data.data
        });
        // console.log("List ujian: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getSoalSiapCetak: async (state, id_paket_soal) => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/soal?id_paket_soal=" + id_paket_soal;
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          siap_cetak: response.data.data,
          jumlah_soal: response.data.jumlah_soal,
          id_paket_soal: id_paket_soal
        });
        // console.log("Soal Siap Cetak: ", response.data.data);
        // console.log("Target jumlah soal: ",response.data.jumlah_soal)
      })
      .catch(err => {
        console.log(err);
      });
  },
  checkJumlahSoal: async state =>{
    let n = 0;
    state.siap_cetak.map((item, key) => {
      n += 1;
    });
    store.setState({
      current_jumlah_soal: n
    });
  },
  getCurrentSoal: async (state, id_paket_soal) => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/soal?id_paket_soal=" + id_paket_soal;
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          current_all_soal: response.data.data,
          jumlah_soal: response.data.jumlah_soal
        });
        console.log("hasil get api current soal: ", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  postNewUjian: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/ujian";
    const data = {
      id_kelas: state.id_kelas,
      kode_soal: state.kode_soal,
      id_mapel: state.id_mapel,
      jumlah_soal: state.jumlah_soal,
      tanggal_ujian: state.tanggal_ujian
    };
    console.log("data yang dikirim ke API buat ujian", data);
    await axios
      .post(url, data,{headers})
      .then(response => {
        store.setState({
          id_paket_soal: response.data.id_paket_soal,
          current_all_soal: [],
          siap_cetak: []
        });
        swal("Sukses","Tambah ujian berhasil","success");
        console.log("Response dari API: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getChartData: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/dashboard";
    const data_kirim = {
      id_paket_soal: state.id_paket_soal,
      id_kelas: state.id_kelas
    };
    await axios
      .post(url, data_kirim,{headers})
      .then(response => {
        store.setState({
          labels: response.data.no_soal,
          data: response.data.persentase
        });
        console.log("data response dari api: ", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getRawDataFromAPI : async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/dashboard?id_kelas="+state.id_kelas+"&id_paket_soal="+state.id_paket_soal;
    await axios
      .get(url, {headers})
      .then(response => {
        store.setState({
          csvData : response.data.data
        })
        console.log(">>>>>>>>>><<<<<<<", state.csvData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getTableDataFromAPI: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/dashboard-table?id_kelas="+state.id_kelas+"&id_paket_soal="+state.id_paket_soal;
    await axios
      .get(url, {headers})
      .then(response => {
        store.setState({
          tableData : response.data.data
        })
        console.log("==================", state.tableData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getPaketByMapel: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/mapel";
    const data_kirim = {
      id_mapel: state.id_mapel,
      id_kelas: state.id_kelas
    };
    await axios
      .post(url, data_kirim, {headers})
      .then(response => {
        store.setState({
          listPaketSoal: response.data.data
        });
        console.log("List Paket Soal response api: ", response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  addNewSoal: (state, data) => {
    let cur_soal = state.current_all_soal;
    console.log(cur_soal);
    cur_soal.push(data);
    store.setState({
      current_all_soal: cur_soal
    });
    let n = 0;
    cur_soal.map((item, key) => {
      n += 1;
    });
    store.setState({
      current_jumlah_soal: n
    });
  },
  signInHandle: async (state, username, password, login_as) => {
    const endpoint = login_as === "admin" ? "admin/login": "login"
    const url = "https://sipss-api.online/" + endpoint;
    const body = {
      username: username,
      password: password
    };
    await axios
      .post(url, body)
      .then(response => {
        if(login_as === 'admin'){
          store.setState({
            adminToken: response.data.token,
            token: "",
            login_as: login_as,
            is_login: true
          });
        }
        else{
          store.setState({
            adminToken: "",
            token: response.data.token,
            login_as: login_as,
            is_login: true
          });
        }
        swal("Selamat datang"," ","success")
      })
      .catch(err => {
        swal({ title:"Maaf", text:"Masukkan username dan password yang benar", icon:'warning', dangerMode:true});
        console.log(err);
      });
  },
  signOutHandle: (state) => {
    store.setState({
      token: "",
      adminToken: "",
      login_as: "",
      is_login: false
    })
    swal({title:"Sampai jumpa kembali", icon:bye})
  },
  editSoal: (state, no_soal, data) => {
    let cur_soal = state.current_all_soal;
    cur_soal.map((item, key) => {
      if (item.no_soal === no_soal) {
        return (cur_soal[key] = data);
      }
    });
    // console.log("cur_soal", cur_soal)
    store.setState({
      current_all_soal: cur_soal
    });
  },
  getAllGuru: async (state) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/guru";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listGuru: response.data.data
        });
        console.log('data get guru from store', response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteGuru : async (state,id) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/guru/"+id;
    await axios
    .delete(url,{headers})
    .then(response => {
      swal("Sukses","Berhasil hapus data!","success")
    })
    .catch(err => {
      console.log(err);
    });
  },
  getAllSiswa: async (state) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/siswa";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listSiswa: response.data.data
        });
        console.log('data get siswa', response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteSiswa : async (state,id) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/siswa/"+id;
    await axios
    .delete(url,{headers})
    .then(response => {
      swal("Sukses","Delete Siswa is Success!","success")
    })
    .catch(err => {
      console.log(err);
    });
  },
  getAllMapel: async (state) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/mapel";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listAllMapel: response.data.data
        });
        console.log('Response dari API', response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteMapel : async (state,id) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/mapel/"+id;
    await axios
    .delete(url,{headers})
    .then(response => {
      swal("Sukses","Delete data berhasil!", "success")
    })
    .catch(err => {
      console.log(err);
    });
  },
  getAllKelas: async (state) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelas";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listKelas: response.data.data
        });
        console.log('data get kelas', response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  postNewGuru: async state => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/guru";
    const data = {
      nip: state.nip,
      nama: state.nama,
      alamat: state.alamat,
      jenis_kelamin: state.jenis_kelamin,
      telepon: state.telepon,
      username: state.username,
      password: state.password
    };
    await axios
      .post(url, data,{headers})
      .then(response => {
        store.setState({
          dataGuru: response.data,
        });
        swal("Sukses","Tambah guru berhasil","success");
        console.log("Response dari API: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getMapelKelas: async (state) => {
    const token = state.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelasmapelconj";
    await axios
      .get(url,{headers})
      .then(response => {
        store.setState({
          listMapelConj: response.data.data
        });
        console.log('data get kelas mapel', response.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  },
  getRekap: async state => {
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/rekap?id_mapel="+state.id_mapel+"&id_kelas="+state.id_kelas;
    await axios
      .get(url, {headers})
      .then(response => {
        store.setState({
          listRekap : response.data.data
        })
        console.log("==================", state.tableData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  kosongRapor:async state =>{
    store.setState({
      listRekap:[],
      listRapor:[],
      totalPersen:0
    })
  },
  kosongTableDashboard:async state =>{
    store.setState({
      tableData:[]
    })
  },
  nambahPersen:async(state,per) =>{
    store.setState({
      totalPersen: state.totalPersen + per
    })
  },
  SummaryRapor: async state =>{
    const token = state.token        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/scoring-persen?id_mapel="+state.id_mapel+"&id_kelas="+state.id_kelas;
    await axios
      .get(url, {headers})
      .then(response => {
        store.setState({
          listRapor : response.data.data
        })
        console.log("==================", state.listRapor);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

export { store, actions };
