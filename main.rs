use reqwest::header;
use regex::Regex;
use rand::seq::SliceRandom;
use std::error::Error;

fn random_proxy() -> Result<(), Box<dyn Error>> {
    let url = "https://free-proxy-list.net/";
    let user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
    let client = reqwest::blocking::Client::new();
    
    let response = client.get(url)
        .header(header::USER_AGENT, user_agent)
        .send()?;

    if response.status().is_success() {
        let text = response.text()?;
        let pattern = Regex::new(r"<tr><td>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})</td><td>(\d+)</td>")?;
        let matches: Vec<_> = pattern.captures_iter(&text).collect();

        if !matches.is_empty() {
            let choice = matches.choose(&mut rand::thread_rng());
            if let Some(mat) = choice {
                let ip_address = mat.get(1).map_or("", |m| m.as_str());
                let port = mat.get(2).map_or("", |m| m.as_str());
                println!("Random proxy: {}:{}", ip_address, port);
            }
        }
    } else {
        println!("Error: {}", response.status());
    }
    
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    random_proxy()
}
