api_key = 'a787e3ae-7750-4dad-8366-bc654bfdafdf'


api_secret= nghovz8kn5

access_token=eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiIzNEJRWTYiLCJqdGkiOiI2N2MzZjdlNzMwNzM3Yzc5MzM1MmI3YTciLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzQwODk2MjMxLCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3NDA5NTI4MDB9.03LydgAtKBaU25NzZfbKolhQc_JQv37P3Q1p-feGbak

import requests
from datetime import datetime, timedelta

def get_reliance_stock_data(interval='1minute', days_back=1):
    # Reliance instrument key (NSE)
    instrument_key = 'NSE_EQ|INE002A01018'
    
    # Calculate dates
    to_date = datetime.now().strftime('%Y-%m-%d')
    from_date = (datetime.now() - timedelta(days=days_back)).strftime('%Y-%m-%d')
    
    # API endpoint
    url = f"https://api.upstox.com/v2/historical-candle/{instrument_key}/{interval}/{to_date}/{from_date}"
    
    # Headers with API key
    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }
    
    # Make the request
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

# Example usage
if __name__ == "__main__":
    data = get_reliance_stock_data(interval='1minute', days_back=1)
    if data:
        print(data)