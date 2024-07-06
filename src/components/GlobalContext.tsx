import { invoke } from '@tauri-apps/api';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface GlobalContextProps {
    loading: boolean;
    data: any;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);
export default GlobalContext;

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        invoke('get_global_data')
            .then((result:any) => {
                setData(result);
                console.log(result);
            })
            .catch((e) => {
                console.error('Error for get_global_data:', e);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ loading, data }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
