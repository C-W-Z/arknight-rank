use crate::resource::CharSkinData;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fs};
use tauri::{api::path::app_local_data_dir, AppHandle};

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
pub struct PlayerPrefs {
    pub menu_pref: MenuPref,
    pub stat_pref: HashMap<String, StatPref>, // char_id -> StatPref
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

impl PlayerPrefs {
    pub fn default(char_skin_map: &HashMap<String, CharSkinData>) -> Self {
        let mut map: HashMap<String, StatPref> = HashMap::with_capacity(char_skin_map.len());

        for c_id in char_skin_map.keys() {
            map.insert(c_id.clone(), StatPref::default(&c_id, &char_skin_map));
        }

        Self {
            menu_pref: MenuPref::default(),
            stat_pref: map,
        }
    }

    fn read_data(app_handle: &AppHandle) -> Option<Self> {
        let json_path;
        match app_local_data_dir(&app_handle.config()) {
            Some(dir) => {
                json_path = dir.join(PREF_FILE);
            }
            None => {
                eprintln!("path resolve error");
                return None;
            }
        }

        println!("Reading {}", json_path.display().to_string());

        let result;
        match fs::read_to_string(json_path) {
            Ok(content) => {
                // Deserialize from json string
                result = serde_json::from_str(&content);
            }
            Err(e) => {
                eprintln!("{}", e);
                return None;
            }
        }

        match result {
            Ok(objs) => return Some(objs),
            Err(e) => {
                eprintln!("{}", e);
                return None;
            }
        }
    }

    pub fn initialize(
        app_handle: &AppHandle,
        char_skin_map: &HashMap<String, CharSkinData>,
    ) -> Self {
        match Self::read_data(app_handle) {
            Some(pref) => return pref,
            None => return Self::default(char_skin_map),
        };
    }

    pub fn store(&self, app_handle: &AppHandle) {
        let json_path;
        match app_local_data_dir(&app_handle.config()) {
            Some(dir) => {
                json_path = dir.join(PREF_FILE);
            }
            None => {
                eprintln!("path resolve error");
                return;
            }
        }

        println!("Storing to {}", json_path.display().to_string());

        let serialized = serde_json::to_string(&self).unwrap();
        fs::write(json_path, serialized).unwrap();
    }
}
