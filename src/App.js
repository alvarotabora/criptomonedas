import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Spinner from './components/Spinner';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

function App()
{
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() =>
  {
    const cotizarCritomoneda = async () =>
    {
      if (moneda === '' || criptomoneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;

      const resultado = await axios.get(url);

      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      guardarCargando(true);

      setTimeout(() =>
      {
        guardarCargando(false);
      }, 3000);
    }

    cotizarCritomoneda();
  }, [criptomoneda, moneda]);

  //Mostrar Spinner o Resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen Criptomonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
