use crate::{
    data::{load_from_appdata, save_to_appdata},
    resource::CharData,
};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, VecDeque};
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

pub fn calculate_ranking(
    players: &mut [Player],
    chars: &HashMap<String, CharData>,
) -> HashMap<String, usize> {
    let mut prof_order: HashMap<String, u8> = HashMap::new();
    prof_order.insert("PIONEER".to_string(), 1);
    prof_order.insert("WARRIOR".to_string(), 2);
    prof_order.insert("TANK".to_string(), 3);
    prof_order.insert("SNIPER".to_string(), 4);
    prof_order.insert("CASTER".to_string(), 5);
    prof_order.insert("MEDIC".to_string(), 6);
    prof_order.insert("SUPPORT".to_string(), 7);
    prof_order.insert("SPECIAL".to_string(), 8);

    players.sort_by(|a, b| {
        let char_a = &chars[&a.id];
        let char_b = &chars[&b.id];
        if a.rank.rati != b.rank.rati {
            b.rank.rati.total_cmp(&a.rank.rati)
        } else if a.rank.devi != b.rank.devi {
            b.rank.devi.total_cmp(&a.rank.devi)
        } else if char_a.rarity != char_b.rarity {
            char_b.rarity.cmp(&char_a.rarity)
        } else if char_a.prof != char_b.prof {
            prof_order[&char_a.prof].cmp(&prof_order[&char_b.prof])
        } else {
            a.id.cmp(&b.id)
        }
    });

    let mut ranks: HashMap<String, usize> = HashMap::with_capacity(players.len());
    let mut rank = 1;
    let mut max_rating = players[0].rank.rati;
    for c in players.iter() {
        if c.rank.rati < max_rating {
            rank += 1;
            max_rating = c.rank.rati;
        }
        ranks.insert(c.id.clone(), rank);
    }

    ranks
}
