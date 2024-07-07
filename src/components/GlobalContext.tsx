import { invoke } from '@tauri-apps/api';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface GlobalContextProps {
    loading: boolean;
    data: any;
    vars: any;
    setVars: React.Dispatch<any>;
}

export const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [vars, setVars] = useState<any>(null);

    useEffect(() => {
        invoke('get_global_data')
            .then((result: any) => {
                setData(result.data);
                setVars(result.vars);
                console.log(result);
            })
            .catch((e) => {
                console.error('Error for get_global_data:', e);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ loading, data, vars, setVars }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default function useGlobalContext() {
    return useContext(GlobalContext);
}
