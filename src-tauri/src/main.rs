// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod resource;

use crate::resource::{CharData, CharSkinData, SkinData};
use std::{collections::HashMap, sync::Mutex};
use tauri::{Manager, State};

#[derive(Debug)]
pub struct AppState {
    pub chars: Mutex<Vec<CharData>>,
    pub skins: Mutex<Vec<SkinData>>,
    pub char_skin_map: Mutex<HashMap<String, CharSkinData>>,
}

impl AppState {
    pub fn get_chars(&self) -> Vec<CharData> {
        let data = self.chars.lock().unwrap();
        data.clone()
    }
    pub fn update_chars(&self, new_chars: Vec<CharData>) {
        let mut data = self.chars.lock().unwrap();
        *data = new_chars; // Update the data inside the Mutex
    }
}

#[tauri::command]
fn get_char(state: State<'_, AppState>) -> Result<String, String> {
    let mut chars = state.get_chars();
    chars[0].name += "ABC";
    let ret = &chars[0].name.clone();
    state.update_chars(chars);
    Ok(ret.into())
}

fn setup_app(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    let chars = CharData::initialize(&app_handle);
    let skins = SkinData::initialize(&app_handle);
    let char_skin_map = CharSkinData::initialize(&app_handle);
    println!("{}", chars.len());
    println!("{}", skins.len());
    println!("{}", char_skin_map.len());
    // dbg!(&chars[0]);
    // dbg!(&skins[0]);
    // dbg!(&char_skin_map["char_002_amiya"]);
    let app_state = AppState {
        chars: Mutex::new(chars),
        skins: Mutex::new(skins),
        char_skin_map: Mutex::new(char_skin_map),
    };
    app.manage(app_state);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(setup_app)
        .invoke_handler(tauri::generate_handler![get_char])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
