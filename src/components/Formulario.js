import React, { useState, useEffect } from 'react';
import Criptomoneda from './Criptomoneda';
import Error from './Error';
import axios from 'axios';

function Formulario({ guardarMoneda, guardarCriptoMoneda })
{
    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    useEffect(() =>
    {
        const consultarAPI = async () =>
        {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //Validar que esten los campos llenos
    const cotizarMoneda = (e) =>
    {
        e.preventDefault();

        if (monedaCotizar === '' || criptoCotizar === '')
        {
            guardarError(true);

            return;
        }

        //Pasar datos al App
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptoMoneda(criptoCotizar);
    }

    //Mostrar error
    const componente = (error) ? <Error mensaje="Todos los campos requeridos.." /> : null;

    return (
        <form onSubmit={cotizarMoneda}>
            {componente}

            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">--Elige tu moneda--</option>
                    <option value="USD">Dolar EUA</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="HND">Lempira</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={e => guardarCriptoCotizar(e.target.value)}
                >
                    <option value="">--Elige tu Critomoneda--</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular" />

        </form>
    )
}

export default Formulario;