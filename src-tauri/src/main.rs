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
    resource::{CharData, CharSkinData, SkinData},
};
use data::save_to_appdata;
use glicko2::{calculate_ranking, calculate_results, pick_player_ids, Match};
use prefer::StatPref;
use serde::Serialize;
use std::{collections::HashMap, sync::Mutex};
use tauri::{AppHandle, Manager, State};

const CHARRANK_FILE: &str = "char_rank.json";
// const SKINRANK_FILE: &str = "skin_rank.json";

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
    pub fn clone_ranked_chars(&self) -> Vec<Player> {
        self.ranked_chars.lock().unwrap().clone()
    }
    pub fn clone_char2rank(&self) -> HashMap<String, usize> {
        self.char2rank.lock().unwrap().clone()
    }
    pub fn update_menu_pref(&self, app_handle: &AppHandle, new_menu_pref: MenuPref) {
        let mut data = self.prefs.lock().unwrap();
        (*data).menu_pref = new_menu_pref;
        data.save(app_handle);
    }
    pub fn update_stat_pref(
        &self,
        app_handle: &AppHandle,
        char_id: String,
        new_stat_pref: StatPref,
    ) {
        let mut data = self.prefs.lock().unwrap();
        (*data).stat_pref.insert(char_id, new_stat_pref);
        data.save(app_handle);
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
fn get_global_vars(state: State<'_, AppState>) -> GlobalIPCVars {
    let vars = GlobalIPCVars {
        prefs: state.clone_prefs(),
        ranked_chars: state.clone_ranked_chars(),
        char2rank: state.clone_char2rank(),
    };
    vars.into()
}

#[tauri::command]
fn set_menu_pref(app_handle: AppHandle, state: State<'_, AppState>, new_menu_pref: MenuPref) {
    state.update_menu_pref(&app_handle, new_menu_pref);
}

#[tauri::command]
fn set_stat_pref(
    app_handle: AppHandle,
    state: State<'_, AppState>,
    char_id: String,
    new_stat_pref: StatPref,
) {
    state.update_stat_pref(&app_handle, char_id, new_stat_pref);
}

#[tauri::command]
fn pick_chars(state: State<'_, AppState>, n: usize) -> Vec<String> {
    let players = state.ranked_chars.lock().unwrap();
    pick_player_ids(&players, n).into()
}

#[tauri::command]
fn upload_char_matches(app_handle: AppHandle, state: State<'_, AppState>, matches: Vec<Match>) -> GlobalIPCVars {
    let mut ranked_chars = state.ranked_chars.lock().unwrap();
    calculate_results(&mut ranked_chars, &matches);
    let new_char2rank = calculate_ranking(&mut ranked_chars, &state.chars);
    let mut char2rank = state.char2rank.lock().unwrap();
    (*char2rank) = new_char2rank;
    let vars = GlobalIPCVars {
        prefs: state.clone_prefs(),
        ranked_chars: ranked_chars.clone(),
        char2rank: char2rank.clone(),
    };
    save_to_appdata(&app_handle, &vars.ranked_chars, CHARRANK_FILE);
    vars.into()
}

fn setup_app(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();

    let chars = CharData::initialize(&app_handle);
    let skins = SkinData::initialize(&app_handle);
    let char2skin = CharSkinData::initialize(&app_handle);
    let sub_prof = CharData::initialize_sub_prof(&app_handle);

    let player_prefs = PlayerPrefs::initialize(&app_handle, &char2skin);
    let char_ids: Vec<&str> = chars.keys().map(|s| s.as_str()).collect();
    let mut ranked_chars = Player::initialize(&app_handle, &char_ids, CHARRANK_FILE);
    let char2rank = calculate_ranking(&mut ranked_chars, &chars);

    player_prefs.save(&app_handle);
    save_to_appdata(&app_handle, &ranked_chars, CHARRANK_FILE);

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
            get_global_data,
            get_global_vars,
            set_menu_pref,
            set_stat_pref,
            pick_chars,
            upload_char_matches,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
