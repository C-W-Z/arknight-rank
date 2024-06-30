use serde::{Deserialize, Serialize};
use std::{fs, path::Path};
use tauri::{api::path::app_local_data_dir, AppHandle};

pub fn load<T, P>(json_path: P) -> Option<T>
where
    for<'de> T: Deserialize<'de>,
    P: AsRef<Path>,
{
    println!("Loading from {}", json_path.as_ref().display().to_string());

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

pub fn load_from_appdata<T>(app_handle: &AppHandle, json_path: &str) -> Option<T>
where
    for<'de> T: Deserialize<'de>,
{
    let path;
    match app_local_data_dir(&app_handle.config()) {
        Some(dir) => {
            path = dir.join(json_path);
        }
        None => {
            eprintln!("Error: app_local_data_dir return None");
            return None;
        }
    }

    load(path)
}

pub fn load_from_resource<T>(app_handle: &AppHandle, json_path: &str) -> Option<T>
where
    for<'de> T: Deserialize<'de>,
{
    let path;
    match app_handle.path_resolver().resolve_resource(json_path) {
        Some(p) => {
            path = p;
        }
        None => {
            eprintln!("Error: resolve_resource return None");
            return None;
        }
    }

    load(path)
}

pub fn save<T, P>(data: &T, json_path: P)
where
    T: Serialize,
    P: AsRef<Path>,
{
    println!("Saving to {}", json_path.as_ref().display().to_string());

    let serialized = serde_json::to_string(data).unwrap();
    fs::write(json_path, serialized).unwrap();
}

pub fn save_to_appdata<T>(app_handle: &AppHandle, data: &T, json_path: &str)
where
    T: Serialize,
{
    let path;
    match app_local_data_dir(&app_handle.config()) {
        Some(dir) => {
            path = dir.join(json_path);
        }
        None => {
            eprintln!("Error: app_local_data_dir return None");
            return;
        }
    }

    save(data, path);
}
