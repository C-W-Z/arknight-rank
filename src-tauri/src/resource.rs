use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fs};
use tauri::AppHandle;

const CHARDATA_FILE: &str = "assets/excel/char.json";
const SKINDATA_FILE: &str = "assets/excel/skin.json";
const CHARSKINDATA_FILE: &str = "assets/excel/char_skin.json";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CharData {
    pub char_id: String,
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
    pub skin_id: String,
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
    pub fn initialize(app_handle: &AppHandle) -> Vec<CharData> {
        let json_path;
        match app_handle.path_resolver().resolve_resource(CHARDATA_FILE) {
            Some(p) => json_path = p,
            None => {
                eprintln!("path resolve error");
                return Vec::new();
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
                return Vec::new();
            }
        }

        match result {
            Ok(objs) => return objs,
            Err(e) => {
                eprintln!("{}", e);
                return Vec::new();
            }
        }
    }
}

impl SkinData {
    pub fn initialize(app_handle: &AppHandle) -> Vec<SkinData> {
        let json_path;
        match app_handle.path_resolver().resolve_resource(SKINDATA_FILE) {
            Some(p) => json_path = p,
            None => {
                eprintln!("path resolve error");
                return Vec::new();
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
                return Vec::new();
            }
        }

        match result {
            Ok(objs) => return objs,
            Err(e) => {
                eprintln!("{}", e);
                return Vec::new();
            }
        }
    }
}

impl CharSkinData {
    pub fn initialize(app_handle: &AppHandle) -> HashMap<String, CharSkinData> {
        let json_path;
        match app_handle
            .path_resolver()
            .resolve_resource(CHARSKINDATA_FILE)
        {
            Some(p) => json_path = p,
            None => {
                eprintln!("path resolve error");
                return HashMap::new();
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
                return HashMap::new();
            }
        }

        match result {
            Ok(objs) => return objs,
            Err(e) => {
                eprintln!("{}", e);
                return HashMap::new();
            }
        }
    }
}
