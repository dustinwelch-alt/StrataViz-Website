from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="StrataViz Marketing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------- Models ----------------
class DownloadBuild(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    platform: str            # windows | mac_apple_silicon | mac_intel
    label: str               # e.g. "Windows"
    subtitle: str            # e.g. "Windows 10 & 11 (64-bit)"
    file_ext: str            # e.g. ".exe"
    version: str
    file_size: str
    file_url: str
    download_count: int = 0


class SubscribeCreate(BaseModel):
    email: EmailStr
    role: Optional[str] = None


class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    role: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)


# ---------------- Seed data ----------------
DEFAULT_BUILDS = [
    {
        "platform": "windows",
        "label": "Windows",
        "subtitle": "Windows 10 & 11 · 64-bit",
        "file_ext": ".exe",
        "version": "1.0.0",
        "file_size": "182 MB",
        "file_url": "https://downloads.strataviz.app/StrataViz-Setup-1.0.0.exe",
        "download_count": 0,
    },
    {
        "platform": "mac_apple_silicon",
        "label": "Mac OS",
        "subtitle": "Apple Silicon · M1/M2/M3",
        "file_ext": ".dmg",
        "version": "1.0.0",
        "file_size": "176 MB",
        "file_url": "https://downloads.strataviz.app/StrataViz-1.0.0-arm64.dmg",
        "download_count": 0,
    },
    {
        "platform": "mac_intel",
        "label": "Mac OS",
        "subtitle": "Intel · x86-64",
        "file_ext": ".dmg",
        "version": "1.2.1",
        "file_size": "195 MB",
        "file_url": "https://customer-assets-v7afamib.emergentagent.net/job_coach-breakdown/artifacts/ql9eyvy3_StrataViz-1.2.1.dmg",
        "download_count": 0,
    },
]


async def seed_downloads():
    count = await db.downloads.count_documents({})
    if count == 0:
        for b in DEFAULT_BUILDS:
            await db.downloads.insert_one(DownloadBuild(**b).model_dump())
        logger.info("Seeded default download builds.")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "StrataViz API online"}


@api_router.get("/downloads", response_model=List[DownloadBuild])
async def get_downloads():
    docs = await db.downloads.find({}, {"_id": 0}).to_list(100)
    order = {"windows": 0, "mac_apple_silicon": 1, "mac_intel": 2}
    docs.sort(key=lambda d: order.get(d.get("platform"), 99))
    return [DownloadBuild(**d) for d in docs]


@api_router.post("/downloads/{platform}/track", response_model=DownloadBuild)
async def track_download(platform: str):
    doc = await db.downloads.find_one({"platform": platform}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Platform build not found")
    await db.downloads.update_one({"platform": platform}, {"$inc": {"download_count": 1}})
    doc["download_count"] = doc.get("download_count", 0) + 1
    return DownloadBuild(**doc)


@api_router.post("/subscribe", response_model=Subscriber)
async def subscribe(input: SubscribeCreate):
    existing = await db.subscribers.find_one({"email": input.email}, {"_id": 0})
    if existing:
        return Subscriber(**existing)
    sub = Subscriber(email=input.email, role=input.role)
    await db.subscribers.insert_one(sub.model_dump())
    return sub


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    await seed_downloads()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
