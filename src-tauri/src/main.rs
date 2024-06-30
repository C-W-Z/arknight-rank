// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod prefer;
mod resource;

use crate::{
    prefer::{MenuPref, PlayerPrefs},
    resource::{CharData, CharSkinData, SkinData},
};
use std::{collections::HashMap, sync::Mutex};
use tauri::{Manager, State};

#[derive(Debug)]
pub struct AppState {
    pub chars: Vec<CharData>,
    pub skins: Vec<SkinData>,
    pub char_skin_map: HashMap<String, CharSkinData>,
    pub prefs: Mutex<PlayerPrefs>,
}

impl AppState {
    pub fn clone_menu_pref(&self) -> MenuPref {
        let data = self.prefs.lock().unwrap();
        data.menu_pref.clone()
    }
    pub fn update_menu_pref(&self, new_menu_pref: MenuPref) {
        let mut data = self.prefs.lock().unwrap();
        (*data).menu_pref = new_menu_pref;
    }
}

#[tauri::command]
fn get_menu_pref(state: State<'_, AppState>) -> MenuPref {
    state.clone_menu_pref().into()
}

fn setup_app(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    let chars = CharData::initialize(&app_handle);
    let skins = SkinData::initialize(&app_handle);
    let char_skin_map = CharSkinData::initialize(&app_handle);

    println!("{}", chars.len());
    println!("{}", skins.len());
    println!("{}", char_skin_map.len());

    let player_prefs = PlayerPrefs::initialize(&app_handle, &char_skin_map);
    player_prefs.store(&app_handle);

    let app_state = AppState {
        chars,
        skins,
        char_skin_map,
        prefs: Mutex::new(player_prefs)
    };
    app.manage(app_state);

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(setup_app)
        .invoke_handler(tauri::generate_handler![get_menu_pref])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
