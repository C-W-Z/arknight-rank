use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::AppHandle;

use crate::data::load_from_resource;

const CHARDATA_FILE: &str = "assets/excel/char.json";
const SKINDATA_FILE: &str = "assets/excel/skin.json";
const CHARSKINDATA_FILE: &str = "assets/excel/char_skin.json";
const SUBPROF_FILE: &str = "assets/excel/sub_prof.json";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CharData {
    // pub char_id: String,
    pub name: String,
    pub name2: String,
    pub rarity: u8,
    pub prof: String,
    pub sub_prof: String,
    pub position: String,
    pub tags: Vec<String>,
    pub nation: String,
    pub group: String,
    pub team: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SkinData {
    // pub skin_id: String,
    pub char_id: String,
    pub avatar_id: String,
    pub portrait_id: String,
    pub name: String,
    pub drawers: Vec<String>,
    pub designers: Vec<String>,
    pub group_id: String,
    pub group_name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CharSkinData {
    pub e0: String,
    pub e1: String,
    pub e2: String,
    pub patch: Vec<String>,
    pub other: Vec<String>,
}

impl CharData {
    pub fn initialize(app_handle: &AppHandle) -> HashMap<String, CharData> {
        match load_from_resource(app_handle, CHARDATA_FILE) {
            Some(chars) => return chars,
            None => return HashMap::new(),
        }
    }
}

impl SkinData {
    pub fn initialize(app_handle: &AppHandle) -> HashMap<String, SkinData> {
        match load_from_resource(app_handle, SKINDATA_FILE) {
            Some(chars) => return chars,
            None => return HashMap::new(),
        }
    }
}

impl CharSkinData {
    pub fn initialize(app_handle: &AppHandle) -> HashMap<String, CharSkinData> {
        match load_from_resource(app_handle, CHARSKINDATA_FILE) {
            Some(chars) => return chars,
            None => return HashMap::new(),
        };
    }
}

pub fn initialize_sub_prof(app_handle: &AppHandle) -> HashMap<String, String> {
    match load_from_resource(app_handle, SUBPROF_FILE) {
        Some(chars) => return chars,
        None => return HashMap::new(),
    };
}
