from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import contentful

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Contentful client
client = contentful.Client(
    space_id=os.environ.get('CONTENTFUL_SPACE_ID'),
    access_token=os.environ.get('CONTENTFUL_ACCESS_TOKEN')
)

@app.get("/")
def read_root():
    return {"message": "Welcome to TrugoodBeautiful API"}

@app.get("/api/articles")
def get_articles():
    try:
        entries = client.entries({
            'content_type': 'article',
            'order': '-sys.createdAt',
            'limit': 10
        })
        
        # Convert to JSON-serializable format
        articles = []
        for entry in entries:
            article = {
                'id': entry.id,
                'title': entry.title if hasattr(entry, 'title') else None,
                'summary': entry.summary if hasattr(entry, 'summary') else None,
                'sentiment': entry.sentiment if hasattr(entry, 'sentiment') else None,
                # Add other fields as needed
            }
            articles.append(article)
            
        return {"articles": articles}
    except Exception as e:
        return {"error": str(e)}