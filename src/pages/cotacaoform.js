import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import Home from '.';

export default  function Home(){
    const { data, error, isLoading } = useSWR(
        'https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=20240101&end_date=20241231',
        fetcher,
    );
  
  if (error) return <div>Erro ao carregar.</div>;
  if (isLoading || !data) return <div>Carregando...</div>;

  const usdbrl = data.USDBRL;

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Buscar Cotação (USD/BRL)</h1>
      <p><strong>data inicio: dd/mm/aaaa</strong> R$ {usdbrl.high} </p>
      <p><strong>Data fim: dd/mm/aaaa</strong> R$ {usdbrl.low}</p>
      <p><strong>Buscar:</strong></p>
      <small>Atualizado: {new Date(Number(usdbrl.timestamp) * 500).toLocaleString()}</small>
    </main>
  );
}

