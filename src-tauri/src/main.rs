// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod data;
mod glicko2;
mod prefer;
mod resource;

use crate::{
    glicko2::Player,
    prefer::{MenuPref, PlayerPrefs},
    resource::{CharData, CharSkinData, SkinData, initialize_sub_prof},
};
use data::save_to_appdata;
use glicko2::calculate_ranking;
use serde::Serialize;
use std::{collections::HashMap, sync::Mutex};
use tauri::{Manager, State};

#[derive(Debug)]
pub struct AppState {
    pub chars: HashMap<String, CharData>,
    pub skins: HashMap<String, SkinData>,
    pub char2skin: HashMap<String, CharSkinData>,
    pub sub_prof: HashMap<String, String>,
    pub prefs: Mutex<PlayerPrefs>,
    pub ranked_chars: Mutex<Vec<Player>>,
    pub char2rank: Mutex<HashMap<String, usize>>,
}

impl AppState {
    pub fn clone_prefs(&self) -> PlayerPrefs {
        self.prefs.lock().unwrap().clone()
    }
    pub fn clone_menu_pref(&self) -> MenuPref {
        self.prefs.lock().unwrap().menu_pref.clone()
    }
    pub fn update_menu_pref(&self, new_menu_pref: MenuPref) {
        let mut data = self.prefs.lock().unwrap();
        (*data).menu_pref = new_menu_pref;
    }
    pub fn clone_ranked_chars(&self) -> Vec<Player> {
        self.ranked_chars.lock().unwrap().clone()
    }
    pub fn clone_char2rank(&self) -> HashMap<String, usize> {
        self.char2rank.lock().unwrap().clone()
    }
}

#[derive(Serialize)]
struct GlobalIPCData {
    chars: HashMap<String, CharData>,
    skins: HashMap<String, SkinData>,
    char2skin: HashMap<String, CharSkinData>,
    sub_prof: HashMap<String, String>,
}
#[derive(Serialize)]
struct GlobalIPCVars {
    pub prefs: PlayerPrefs,
    pub ranked_chars: Vec<Player>,
    pub char2rank: HashMap<String, usize>,
}
#[derive(Serialize)]
struct GlobalIPC {
    data: GlobalIPCData,
    vars: GlobalIPCVars,
}
#[tauri::command]
fn get_global_data(state: State<'_, AppState>) -> GlobalIPC {
    let data = GlobalIPCData {
        chars: state.chars.clone(),
        skins: state.skins.clone(),
        char2skin: state.char2skin.clone(),
        sub_prof: state.sub_prof.clone(),
    };
    let vars = GlobalIPCVars {
        prefs: state.clone_prefs(),
        ranked_chars: state.clone_ranked_chars(),
        char2rank: state.clone_char2rank(),
    };
    let ret = GlobalIPC { data, vars };
    ret.into()
}

#[tauri::command]
fn get_menu_pref(state: State<'_, AppState>) -> MenuPref {
    state.clone_menu_pref().into()
}

#[derive(Serialize)]
struct CharRankIPCData {
    ranked_chars: Vec<Player>,
    char2rank: HashMap<String, usize>,
}
#[tauri::command]
fn get_char_ranks(state: State<'_, AppState>) -> CharRankIPCData {
    let data = CharRankIPCData {
        ranked_chars: state.clone_ranked_chars(),
        char2rank: state.clone_char2rank(),
    };
    data.into()
}

fn setup_app(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();

    let chars = CharData::initialize(&app_handle);
    let skins = SkinData::initialize(&app_handle);
    let char2skin = CharSkinData::initialize(&app_handle);
    let sub_prof = initialize_sub_prof(&app_handle);

    let player_prefs = PlayerPrefs::initialize(&app_handle, &char2skin);
    let char_ids: Vec<&str> = chars.keys().map(|s| s.as_str()).collect();
    let mut ranked_chars = Player::initialize(&app_handle, &char_ids, "data.json");
    let char2rank = calculate_ranking(&mut ranked_chars, &chars);

    player_prefs.save(&app_handle);
    save_to_appdata(&app_handle, &ranked_chars, "data.json");

    let app_state = AppState {
        chars,
        skins,
        char2skin,
        sub_prof,
        prefs: Mutex::new(player_prefs),
        ranked_chars: Mutex::new(ranked_chars),
        char2rank: Mutex::new(char2rank),
    };
    app.manage(app_state);

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(setup_app)
        .invoke_handler(tauri::generate_handler![
            get_menu_pref,
            get_global_data,
            get_char_ranks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
