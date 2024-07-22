import { invoke } from '@tauri-apps/api';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface GlobalContextProps {
    loading: boolean;
    data: any;
    vars: any;
    reloadVars: () => void;
    setStatPref: (char_id: string, skin_id: string, h: number, x: number, y: number) => void;
    setCharBattlePref: (playerCount: number, chooseDraw: boolean, unchooseDraw: boolean) => void;
    endBattleChar: () => void;
}

export const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [vars, setVars] = useState<any>(null);

    function reloadVars() {
        setLoading(true);
        invoke('get_global_vars')
            .then((result: any) => {
                setVars(result);
                console.log(result);
            })
            .catch((e) => {
                console.error('Error for get_global_vars:', e);
            }).finally(() => {
                setLoading(false);
            });
    }

    function setStatPref(char_id: string, skin_id: string, h: number, x: number, y: number) {
        let tmp = vars.prefs.stat_pref[char_id];
        if (skin_id.length > 0)
            tmp.skin_id = skin_id;
        tmp.h = h;
        tmp.x = x;
        tmp.y = y;
        vars.prefs.stat_pref[char_id] = tmp;
        setVars(vars);
        invoke('set_stat_pref', {
            charId: char_id,
            newStatPref: tmp,
        }).catch((e) => console.error(e));
    }

    function setCharBattlePref(playerCount: number, chooseDraw: boolean, unchooseDraw: boolean) {
        let tmp = vars.prefs.char_battle_pref;
        tmp.choose_draw[playerCount] = chooseDraw;
        tmp.unchoose_draw[playerCount] = unchooseDraw;
        vars.prefs.char_battle_pref = tmp;
        setVars(vars);
        invoke('set_char_battle_pref', {
            playerCount: playerCount,
            chooseDraw: chooseDraw,
            unchooseDraw: unchooseDraw,
        }).catch((e) => console.error(e));
    }

    function endBattleChar() {
        setLoading(true);
        invoke('end_battle_char')
            .then((result: any) => {
                setVars(result);
                console.log(result);
            })
            .catch((e) => {
                console.error('Error for end_battle_char:', e);
            }).finally(() => {
                setLoading(false);
            });
    }

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
        <GlobalContext.Provider value={{
            loading,
            data,
            vars,
            reloadVars,
            setStatPref,
            setCharBattlePref,
            endBattleChar
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default function useGlobalContext() {
    return useContext(GlobalContext);
}
