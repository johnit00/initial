import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api";//importaçao

function App() {//fuçao capaz de criar duas variaveis diferente

    const [input, setinput] = useState('');
    const [cnpj, setCNJP] = useState({});

      async function handleSearch(){

        if (input === ''){
          alert ("preencha algum CNPJ!")
          return;
        }

        try{
          const response = await api.get(`${input}`)
          setCNJP(response.data)
          setinput("")
        }
        catch{
          alert("erro ao buscar CNPJ!")
          setinput("")
        }
      }

    return(
      <div className="container">
        <h1 className="title">consulta CNPJ</h1>
        <div className="containerInput">
        <input 
            type="text"
            placeholder="digite seu CNPJ..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button className="buttonsearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/> 
          </button>
        </div>

        {Object.keys(cnpj).length > 0 && (
            <main className="main">
              <h2>{cnpj.razao_social}</h2>
              <span>fundaçao: {cnpj.data_inicio_atividade}</span>
              <span>situaçao cadastral: {cnpj.descricao_inicio_atividade}</span>
              <span>contrato: {cnpj.ddd_fax}</span>
            </main>
        )}

      </div>
    ); 
}

export default App;

