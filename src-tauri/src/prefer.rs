use crate::{
    data::{load_from_appdata, save_to_appdata},
    resource::{CharData, CharSkinData},
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::AppHandle;

const PREF_FILE: &str = "preference.json";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MenuPref {
    pub scene_id: String,
    pub char_id: String,
    pub skin_id: String,
    pub h: isize,
    pub x: isize,
    pub y: isize,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct StatPref {
    pub skin_id: String,
    pub h: isize,
    pub x: isize,
    pub y: isize,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CharListPref {
    pub prof_filter: String,
    pub sortby: String,
    pub ascend: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CharPreparePref {
    pub player_count: usize,
    pub rarity: Vec<bool>,
    pub prof: Vec<bool>,
    pub nation_map: HashMap<String, bool>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BattlePref {
    pub choose_draw: Vec<bool>,   // player_count 2~5
    pub unchoose_draw: Vec<bool>, // player_count 2~5
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PlayerPrefs {
    pub menu_pref: MenuPref,
    pub stat_pref: HashMap<String, StatPref>, // char_id -> StatPref
    pub char_list_pref: CharListPref,
    pub char_prepare_pref: CharPreparePref,
    pub char_battle_pref: BattlePref,
}

impl MenuPref {
    pub fn default() -> Self {
        Self {
            scene_id: String::from("scene_view"),
            char_id: String::from("char_002_amiya"),
            skin_id: String::from("char_002_amiya_1"),
            h: (100),
            x: (-20),
            y: (-15),
        }
    }
}

impl StatPref {
    pub fn default(char_id: &String, char2skin: &HashMap<String, CharSkinData>) -> Self {
        Self {
            skin_id: char2skin[char_id].e0.clone(),
            h: (100),
            x: (0),
            y: (0),
        }
    }
}

impl CharListPref {
    pub fn default() -> Self {
        Self {
            prof_filter: ("CLOSE".to_string()),
            sortby: ("rank".to_string()),
            ascend: (false),
        }
    }
}

impl CharPreparePref {
    pub fn default(chars: &HashMap<String, CharData>) -> Self {
        let mut nation_map: HashMap<String, bool> = HashMap::new();

        for c in chars.values() {
            if c.nation.len() > 0 {
                nation_map.insert(c.nation.clone(), true);
            }
            if c.group.len() > 0 {
                nation_map.insert(c.group.clone(), true);
            }
            if c.team.len() > 0 {
                nation_map.insert(c.team.clone(), true);
            }
        }
        nation_map.insert("other".to_string(), true);

        Self {
            player_count: (2),
            rarity: (vec![true; 6]),
            prof: (vec![true; 8]),
            nation_map: (nation_map),
        }
    }
}

impl BattlePref {
    pub fn default() -> Self {
        Self {
            choose_draw: (vec![false; 6]),
            unchoose_draw: (vec![false; 6]),
        }
    }
}

impl PlayerPrefs {
    pub fn default(
        chars: &HashMap<String, CharData>,
        char2skin: &HashMap<String, CharSkinData>,
    ) -> Self {
        let mut map: HashMap<String, StatPref> = HashMap::with_capacity(char2skin.len());

        for c_id in char2skin.keys() {
            map.insert(c_id.clone(), StatPref::default(&c_id, &char2skin));
        }

        Self {
            menu_pref: MenuPref::default(),
            stat_pref: map,
            char_list_pref: CharListPref::default(),
            char_prepare_pref: CharPreparePref::default(chars),
            char_battle_pref: BattlePref::default(),
        }
    }

    pub fn initialize(
        app_handle: &AppHandle,
        chars: &HashMap<String, CharData>,
        char2skin: &HashMap<String, CharSkinData>,
    ) -> Self {
        match load_from_appdata(app_handle, PREF_FILE) {
            Some(pref) => return pref,
            None => return Self::default(chars, char2skin),
        };
    }

    pub fn save(&self, app_handle: &AppHandle) {
        save_to_appdata(app_handle, self, PREF_FILE)
    }
}
