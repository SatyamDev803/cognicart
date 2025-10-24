import chromadb
from chromadb.config import Settings

CHROMA_DATA_PATH = "chroma_data/" # Stores data locally
COLLECTION_NAME = "products"

client = chromadb.PersistentClient(path=CHROMA_DATA_PATH, settings=Settings(anonymized_telemetry=False))
product_collection = client.get_or_create_collection(name=COLLECTION_NAME)

def get_vector_db_client():
    return client

def get_product_collection():
    return product_collection