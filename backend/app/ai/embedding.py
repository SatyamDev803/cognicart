from sentence_transformers import SentenceTransformer
import logging

model_name = "all-MiniLM-L6-v2"
try:
    embedding_model = SentenceTransformer(model_name, device="cpu")  # or "cuda:0"
    logging.info("Loaded model %s", model_name)
except Exception as e:
    logging.exception("Failed to load %s", model_name)
    embedding_model = None

def get_embedding(text: str) -> list[float] | None:
    if embedding_model is None:
        return None
    if not text:
        return []
    try:
        emb = embedding_model.encode(text, convert_to_numpy=True)
        return emb.tolist()
    except Exception:
        logging.exception("Error generating embedding")
        return None
