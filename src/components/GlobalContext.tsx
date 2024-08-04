import { invoke } from '@tauri-apps/api';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface GlobalContextProps {
    loading: boolean;
    data: any;
    vars: any;
    reloadVars: () => void;
    setStatPref: (char_id: string, skin_id: string, h: number, x: number, y: number) => void;
    setCharListPref: (prof_filter?: string, sortby?: string, ascend?: boolean) => void;
    uploadCharListPref: () => void;
    setCharBattlePref: (playerCount: number, chooseDraw: boolean, unchooseDraw: boolean) => void;
    prepareBattleChar: (
        playerCount: number,
        rarity: boolean[],
        prof: boolean[],
        nationMap: any,
        after_success?: () => void,
        after_failed?: () => void
    ) => void;
    endBattleChar: () => void;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [vars, setVars] = useState<any>(null);

    function reloadVars() {
        setLoading(true);
        invoke('get_global_vars')
            .then((result: any) => {
                setVars(result);
                // console.log(result);
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
        // setVars(vars);
        invoke('set_stat_pref', {
            charId: char_id,
            newStatPref: tmp,
        }).catch((e) => console.error(e));
    }

    function setCharListPref(prof_filter?: string, sortby?: string, ascend?: boolean) {
        let tmp = vars.prefs.char_list_pref;
        if (prof_filter !== undefined)
            tmp.prof_filter = prof_filter;
        if (sortby !== undefined)
            tmp.sortby = sortby;
        if (ascend !== undefined)
            tmp.ascend = ascend;
        vars.prefs.char_list_pref = tmp;
        // setVars(vars);
    }

    function uploadCharListPref() {
        let tmp = vars.prefs.char_list_pref;
        invoke('set_char_list_pref', {
            profFilter: tmp.prof_filter,
            sortby: tmp.sortby,
            ascend: tmp.ascend,
        }).catch((e) => console.error(e));
    }

    function setCharBattlePref(playerCount: number, chooseDraw: boolean, unchooseDraw: boolean) {
        let tmp = vars.prefs.char_battle_pref;
        tmp.choose_draw[playerCount] = chooseDraw;
        tmp.unchoose_draw[playerCount] = unchooseDraw;
        vars.prefs.char_battle_pref = tmp;
        // setVars(vars);
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
                // console.log(result);
            })
            .catch((e) => {
                console.error('Error for end_battle_char:', e);
            }).finally(() => {
                setLoading(false);
            });
    }

    function prepareBattleChar(
        playerCount: number,
        rarity: boolean[],
        prof: boolean[],
        nationMap: any,
        after_success?: () => void,
        after_failed?: () => void
    ) {
        let tmp = vars.prefs.char_prepare_pref;
        tmp.player_count = playerCount;
        tmp.rarity = rarity;
        tmp.prof = prof;
        tmp.nation_map = nationMap;
        vars.prefs.char_prepare_pref = tmp;
        invoke("prepare_battle_char", { prepare: tmp })
            .then((res) => {
                if (res && after_success !== undefined)
                    after_success();
                else if (!res && after_failed !== undefined)
                    after_failed();
            })
            .catch((e) => {
                console.error('Error for end_battle_char:', e);
            })
    }

    useEffect(() => {
        invoke('get_global_data')
            .then((result: any) => {
                setData(result.data);
                setVars(result.vars);
                // console.log(result);
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
            setCharListPref,
            uploadCharListPref,
            setCharBattlePref,
            prepareBattleChar,
            endBattleChar
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default function useGlobalContext() {
    return useContext(GlobalContext);
}
