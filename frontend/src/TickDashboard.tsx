import React, {useEffect, useState} from "react";

type Tick = {symbol: string, price: number};

export const TickDashboard: React.FC = () => {
    const [ticks, setTicks] = useState <Tick[]> ([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState <string | null> (null);

    const fetchTick = async() => {
        try{
            setLoading(true);
            setError(null);

            const response = await fetch("/api/ticks");

            // Bad case response
            if (!response.ok){
                throw new Error("HTTP ${response.status}");
            }

            const data = (await response.json()) as Tick[];
            setTicks(data);

        } catch(err: any){
            setError (err.message ?? "Could NOT fetch Tick");

        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTick();
        // Set fetch rate at 2s intervals
        const tick_id = setInterval(fetchTick, 2000);
        
        return () => clearInterval(tick_id);
    
    }, []);

    // HTML
    return (
        <div style={{ padding: "1.5rem", fontFamily: "system-ui" }}>
        <h1>Real-Time Market Data (Demo)</h1>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {ticks.map((t) => (
              <tr key={t.symbol}>
                <td>{t.symbol}</td>
                <td>{t.price.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

};