use crate::{
    data::{load_from_appdata, save_to_appdata},
    resource::CharData,
};
use rand::{distributions::WeightedIndex, prelude::*};
use serde::{Deserialize, Serialize};
use std::{
    collections::{HashMap, HashSet, VecDeque},
    f64::consts::PI,
    time::{Duration, SystemTime, UNIX_EPOCH},
};
use tauri::AppHandle;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum MatchResult {
    AWin,
    BWin,
    Draw,
}

// A matchup between two players
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Match {
    pub a: String,        // the id of first player
    pub b: String,        // the id of first player
    pub res: MatchResult, // result of the match
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Rival {
    pub oppo: String,     // opponent's id
    pub res: MatchResult, // AWins for I win, BWins for I lose
    pub time: Duration,
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

impl Rival {
    pub fn new(oppo: String, res: MatchResult) -> Self {
        Self {
            oppo: (oppo),
            res: (res),
            time: (SystemTime::now().duration_since(UNIX_EPOCH).unwrap()),
        }
    }
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

// TODO: filter ?
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

// TODO: filter ?
pub fn pick_player_ids(pool: &[Player], n: usize) -> Vec<String> {
    let max = pool
        .iter()
        .max_by_key(|c| c.hist.battles())
        .unwrap()
        .hist
        .battles();

    let mut indices: Vec<usize> = Vec::new();
    let mut oppos: HashSet<String> = HashSet::new();
    let mut rng = thread_rng();

    for _ in 0..n {
        let mut weights: Vec<f64> = pool
            .iter()
            .map(|c: &Player| {
                if max == c.hist.battles() {
                    return 1.0 / (pool.len() as f64);
                } else if oppos.contains(&c.id) {
                    return (1 << (2 * (max - c.hist.battles()))) as f64 * (oppos.len() as f64)
                        / (pool.len() as f64);
                } else {
                    return (1 << (2 * (max - c.hist.battles()))) as f64;
                }
            })
            .collect();

        for i in indices.iter() {
            weights[*i] = 0.0;
        }

        let distribution = WeightedIndex::new(&weights).unwrap();
        let idx = distribution.sample(&mut rng);

        for b in pool[idx].hist.old_match.iter() {
            oppos.insert(b.oppo.clone());
        }

        indices.push(idx);
    }

    indices.iter().map(|i| pool[*i].id.clone()).collect()
}

// The system constant which constrains the change in volatility over time, needs to be set prior to application of the system
// Reasonable choices are between 0.3 and 1.2
const TAU: f64 = 0.5;
// Convergence tolerance
const EPSILON: f64 = 1e-6;

fn g(phi: f64) -> f64 {
    1.0 / (1.0 + 3.0 * (phi / PI).powi(2)).sqrt()
}

fn e(mu: f64, mu_j: f64, phi_j: f64) -> f64 {
    1.0 / (1.0 + (-g(phi_j) * (mu - mu_j)).exp())
}

fn part_v(mu: f64, mu_j: f64, phi_j: f64) -> f64 {
    let _e = e(mu, mu_j, phi_j);
    g(phi_j).powi(2) * _e * (1.0 - _e)
}

fn part_d(mu: f64, mu_j: f64, phi_j: f64, s: f64) -> f64 {
    g(phi_j) * (s as f64 - e(mu, mu_j, phi_j))
}

fn new_volatility(v: f64, delta: f64, sigma: f64, phi: f64, tau: f64, epsilon: f64) -> f64 {
    let _a = sigma.powi(2).ln();
    let delta2 = delta * delta;
    let tau2 = tau * tau;
    let phi2plusv = phi * phi + v;

    let f = |x: f64| -> f64 {
        let ex = x.exp();
        (ex * (delta2 - phi2plusv - ex) / (2.0 * (phi2plusv + ex).powi(2))) - ((x - _a) / tau2)
    };

    let mut a = _a;
    let mut b = if delta2 > phi2plusv {
        (delta2 - phi2plusv).ln()
    } else {
        let mut k = 1.0;
        while f(_a - k * tau) < 0.0 {
            k += 1.0;
        }
        _a - (k * tau)
    };

    let mut fa = f(a);
    let mut fb = f(b);
    while (b - a).abs() > epsilon {
        let c = a + (a - b) * fa / (fb - fa);
        let fc = f(c);
        if fc * fb <= 0.0 {
            a = b;
            fa = fb;
        } else {
            fa /= 2.0;
        }
        b = c;
        fb = fc;
    }

    (a / 2.0).exp()
}

fn new_deviation(phi: f64, new_sigma: f64, v: f64) -> f64 {
    let phi_star = (phi * phi + new_sigma * new_sigma).sqrt();
    1.0 / (1.0 / phi_star.powi(2) + 1.0 / v.powi(2)).sqrt()
}

fn new_rating(mu: f64, new_phi: f64, v: f64, delta: f64) -> f64 {
    mu + new_phi * delta / v
}

pub fn calculate_results(players: &mut Vec<Player>, records: &[Match]) {
    if records.is_empty() {
        return;
    }

    // For each player, convert the ratings and RD’s onto the Glicko-2 scale
    for c in players.iter_mut() {
        c.rank.glicko_1_to_2_scale();
    }

    let mut char_id_to_idx: HashMap<String, usize> = HashMap::new();
    for (i, c) in players.iter().enumerate() {
        char_id_to_idx.insert(c.id.clone(), i);
    }

    // Compute the quantity v
    // This is the estimated variance of the player’s rating based only on game outcomes
    let mut v: HashMap<String, f64> = HashMap::new();
    // Compute the quantity delta
    // This is the estimated improvement in rating by comparing the pre-period rating to the performance rating based only on game outcomes
    let mut delta: HashMap<String, f64> = HashMap::new();

    // initialize hashmaps
    for m in records.iter() {
        v.insert(m.a.clone(), 0.0);
        v.insert(m.b.clone(), 0.0);
        delta.insert(m.a.clone(), 0.0);
        delta.insert(m.b.clone(), 0.0);
    }

    for m in records.iter() {
        let id1 = char_id_to_idx[&m.a];
        let id2 = char_id_to_idx[&m.b];
        let mu1 = players[id1].rank.rati;
        let mu2 = players[id2].rank.rati;
        let phi1 = players[id1].rank.devi;
        let phi2 = players[id2].rank.devi;
        let (s1, s2) = match m.res {
            MatchResult::AWin => (1.0, 0.0),
            MatchResult::BWin => (0.0, 1.0),
            MatchResult::Draw => (0.5, 0.5),
        };

        // Add up the quantities calculated by matches with others players
        if let Some(v1) = v.get_mut(&m.a) {
            *v1 += part_v(mu1, mu2, phi2);
        }
        if let Some(v2) = v.get_mut(&m.b) {
            *v2 += part_v(mu2, mu1, phi1);
        }
        if let Some(d1) = delta.get_mut(&m.a) {
            *d1 += part_d(mu1, mu2, phi2, s1);
        }
        if let Some(d2) = delta.get_mut(&m.b) {
            *d2 += part_d(mu2, mu1, phi1, s2);
        }
    }

    // take the inverse of v
    for (_, v_i) in v.iter_mut() {
        *v_i = 1.0 / *v_i;
    }
    // multiple d by v
    for (id, d_i) in delta.iter_mut() {
        *d_i *= v[id];
    }

    for c in players.iter_mut() {
        if !v.contains_key(&c.id) {
            // Convert the ratings and RD’s onto the Glicko-1 scale
            c.rank.glicko_2_to_1_scale();
            continue;
        }
        // Determine the new value of the volatility, deviation, and rating
        c.rank.vola = new_volatility(
            v[&c.id],
            delta[&c.id],
            c.rank.vola,
            c.rank.devi,
            TAU,
            EPSILON,
        );
        c.rank.devi = new_deviation(c.rank.devi, c.rank.vola, v[&c.id]);
        c.rank.rati = new_rating(c.rank.rati, c.rank.devi, v[&c.id], delta[&c.id]);

        // Convert the ratings and RD’s onto the Glicko-1 scale
        c.rank.glicko_2_to_1_scale();
    }
}
