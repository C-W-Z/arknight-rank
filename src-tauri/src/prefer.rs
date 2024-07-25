use crate::{
    data::{load_from_appdata, save_to_appdata},
    resource::CharSkinData,
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
pub struct BattlePref {
    pub choose_draw: Vec<bool>, // player_count 2~5
    pub unchoose_draw: Vec<bool>, // player_count 2~5
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PlayerPrefs {
    pub menu_pref: MenuPref,
    pub stat_pref: HashMap<String, StatPref>, // char_id -> StatPref
    pub char_list_pref: CharListPref,
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
    pub fn default(char_id: &String, char_skin_map: &HashMap<String, CharSkinData>) -> Self {
        Self {
            skin_id: char_skin_map[char_id].e0.clone(),
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

impl BattlePref {
    pub fn default() -> Self {
        Self {
            choose_draw: (vec![false, false, false, false, false, false]),
            unchoose_draw: (vec![false, false, false, false, false, false]),
        }
    }
}

impl PlayerPrefs {
    pub fn default(char_skin_map: &HashMap<String, CharSkinData>) -> Self {
        let mut map: HashMap<String, StatPref> = HashMap::with_capacity(char_skin_map.len());

        for c_id in char_skin_map.keys() {
            map.insert(c_id.clone(), StatPref::default(&c_id, &char_skin_map));
        }

        Self {
            menu_pref: MenuPref::default(),
            stat_pref: map,
            char_list_pref: CharListPref::default(),
            char_battle_pref: BattlePref::default(),
        }
    }

    pub fn initialize(
        app_handle: &AppHandle,
        char_skin_map: &HashMap<String, CharSkinData>,
    ) -> Self {
        match load_from_appdata(app_handle, PREF_FILE) {
            Some(pref) => return pref,
            None => return Self::default(char_skin_map),
        };
    }

    pub fn save(&self, app_handle: &AppHandle) {
        save_to_appdata(app_handle, self, PREF_FILE)
    }
}
