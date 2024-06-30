use crate::data::{load_from_appdata, save_to_appdata};
use serde::{Deserialize, Serialize};
use std::collections::VecDeque;
use tauri::AppHandle;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum MatchResult {
    AWin,
    BWin,
    Draw,
}

// A matchup between two characters
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Match {
    pub a: String,        // the id of first character
    pub b: String,        // the id of first character
    pub res: MatchResult, // result of the match
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Rival {
    pub oppo: String,     // opponent's id
    pub res: MatchResult, // AWins for I win, BWins for I lose
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Rank {
    pub rati: f64, // rating
    pub devi: f64, // rating deviation
    pub vola: f64, // rating volatility
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct History {
    pub wins: usize,
    pub loss: usize,
    pub draw: usize,
    // track past rating and rank
    pub old_rate: VecDeque<f64>,
    pub old_rank: VecDeque<usize>,
    // track past matches
    pub old_match: VecDeque<Rival>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Player {
    pub id: String,
    pub rank: Rank,    // glicko ranking information
    pub hist: History, // historical stats
}

impl Rank {
    pub fn default() -> Self {
        Self {
            rati: (1500.0),
            devi: (350.0),
            vola: (0.06),
        }
    }
    pub fn glicko_1_to_2_scale(&mut self) {
        self.rati = (self.rati - 1500.0) / 173.7178;
        self.devi = self.devi / 173.7178;
    }
    pub fn glicko_2_to_1_scale(&mut self) {
        self.rati = self.rati * 173.7178 + 1500.0;
        self.devi = self.devi * 173.7178;
    }
}

impl History {
    pub fn default() -> Self {
        Self {
            wins: (0),
            loss: (0),
            draw: (0),
            old_rate: VecDeque::new(),
            old_rank: VecDeque::new(),
            old_match: VecDeque::new(),
        }
    }
    pub fn battles(&self) -> usize {
        self.wins + self.loss + self.draw
    }
}

impl Player {
    pub fn new(id: String) -> Self {
        Self {
            id: (id),
            rank: Rank::default(),
            hist: History::default(),
        }
    }

    fn initialize_from_ids(ids: &[&str]) -> Vec<Player> {
        let mut players: Vec<Player> = Vec::with_capacity(ids.len());
        for id in ids.iter() {
            players.push(Player::new(id.to_string()));
        }
        players
    }

    pub fn initialize(app_handle: &AppHandle, ids: &[&str], path: &str) -> Vec<Player> {
        // TODO: Check for new/missed players if there is a discrepancy between loaded player and ids
        match load_from_appdata(app_handle, path) {
            Some(players) => return players,
            None => return Player::initialize_from_ids(ids),
        }
    }

    pub fn save(app_handle: &AppHandle, players: &[Player], path: &str) {
        save_to_appdata(app_handle, &players, path);
    }
}
