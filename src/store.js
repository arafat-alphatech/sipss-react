import createStore from 'unistore'
import devtools from 'unistore/devtools'
import axios from 'axios'
import persistStore from 'unissist'
import localStorageAdapter from 'unissist/integrations/localStorageAdapter'

const initialState = {
  id_kelas: "",
  id_mapel: "",
  id_paket_soal: "",
  listMapel: [],
  listNamaKelas: [],
  listUjian: [],
  tanggal_ujian: "",
  kode_soal: "",
  jumlah_soal:"",
  no_soal:"",
  labels:[],
  data:[],
  listPaketSoal: [],
  id_paket_soal: "",
  current_all_soal: []
}

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
    const url = 'http://0.0.0.0:5000/kelas-mapel/' + state.id_kelas;
    await axios
      .get(url)
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
  getKelas() {
    // const url = `${process.env.DB_HOST}/kelas`;
    const url = 'http://0.0.0.0:5000/kelas';
    axios
      .get(url)
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
  getUjian: async (state, id_kelas, id_mapel) => {
    const url = 'http://0.0.0.0:5000/paket-kelas?id_kelas='+id_kelas+'&id_mapel='+id_mapel;
      await axios
      .get(url)
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
  getCurrentSoal: async (state, id_paket_soal) => {
    const url = 'http://0.0.0.0:5000/soal?id_paket_soal='+id_paket_soal;
    await axios
    .get(url)
    .then(response => {
      store.setState({
        current_all_soal: response.data.data
      });
      console.log("List current soal: ", response);
    })
    .catch(err => {
      console.log(err);
    });
  },
  postNewUjian: async state => {
    const url = 'http://0.0.0.0:5000/ujian';
    const data = {
      id_kelas: state.id_kelas,
      kode_soal: state.kode_soal,
      id_mapel: state.id_mapel,
      tanggal_ujian: state.tanggal_ujian
    };
    // console.log("data yang dikirim ke API",data);
    await axios
      .post(url,data)
      .then(response => {
        store.setState({
          id_paket_soal: response.data.id_paket_soal
        })
        alert('Tambah ujian berhasil')
        console.log("Response dari API: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getChartData: async (state, id_paket_soal, id_kelas) => {
    const url = 'http://13.251.97.170:5001/dashboard';
        const data_kirim = {
            id_paket_soal: state.id_paket_soal,
            id_kelas: state.id_kelas
        };
        await axios
            .post(url, data_kirim)
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
  getPaketByMapel: async (state) => {
    const url = 'http://13.251.97.170:5001/mapel' ;
    const data_kirim = {
      id_mapel: state.id_mapel,
      id_kelas: state.id_kelas
    };
    await axios
      .post(url,data_kirim)
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
    let cur_soal = state.current_all_soal
    console.log(cur_soal)
    cur_soal.push(data)
    store.setState({
      current_all_soal: cur_soal
    })
  },

  editSoal: (state, no_soal, data) => {
    let cur_soal = state.current_all_soal
    cur_soal.map((item, key) => {
      if(item.no_soal == no_soal){
        return cur_soal[key] = data
      }
    })
    // console.log("cur_soal", cur_soal)
    store.setState({
      current_all_soal: cur_soal
    })
  },
})

export { store, actions };