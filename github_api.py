import requests
import datetime
from collections import defaultdict

github_api_url = "https://api.github.com/search/repositories"
github_token = "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"
github_headers = {
    "Accept": "application/vnd.github.v3+json",
    "Authorization": f"token {github_token}"}

def fetch_repos_with_pagination(query, max_pages=10, per_page=100):
    all_repos = []
    
    for page in range(1, max_pages + 1):
        params = {
            "q": query,
            "sort": "stars",
            "order": "desc",
            "per_page": per_page,
            "page": page
        }
        response = requests.get(github_api_url, headers=github_headers, params=params)
        
        if response.status_code == 200:
            items = response.json().get("items", [])
            all_repos.extend(items)
            
            # If fewer than `per_page` results are returned, stop pagination
            if len(items) < per_page:
                break
        else:
            print(f"Error fetching data: {response.status_code}")
            break
    
    return all_repos

def calculate_popularity(repos):
    popularity_scores = defaultdict(int)
    for repo in repos:
        for topic in repo.get("topics", []):
            popularity_scores[topic] += repo["stargazers_count"]
    return sorted(popularity_scores.items(), key=lambda x: x[1], reverse=True)

def calculate_growth_rate(language, months=6):
    growth_rates = {}
    current_date = datetime.datetime.utcnow()
    past_date = current_date - datetime.timedelta(days=30 * months)
    query = f"language:{language} created:>{past_date.strftime('%Y-%m-%d')}"
    repos = fetch_repos_with_pagination(query)
    growth_rates[language] = len(repos)
    return growth_rates

def calculate_community_engagement(repos):
    engagement_scores = defaultdict(int)
    for repo in repos:
        for topic in repo.get("topics", []):
            engagement_scores[topic] += repo.get("forks_count", 0) + repo.get("open_issues_count", 0)
    return sorted(engagement_scores.items(), key=lambda x: x[1], reverse=True)

if __name__ == "__main__":
    repos = fetch_repos_with_pagination("stars:>1000")
    
    print("\nTop Technologies by Popularity Score:")
    for tech, score in calculate_popularity(repos)[:10]:
        print(f"{tech}: {score}")
    
    print("\nTechnology Adoption Growth Rates:")
    for lang in ["Python", "JavaScript", "Rust", "Go"]:
        print(f"{lang}: {calculate_growth_rate(lang)} new repos in last 6 months")
    
    print("\nCommunity Engagement Scores:")
    for tech, engagement in calculate_community_engagement(repos)[:10]:
        print(f"{tech}: {engagement}")
