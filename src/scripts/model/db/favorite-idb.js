import { openDB } from "idb";

const DB_NAME = "berbagi-cerita-db";
const STORE_NAME = "favorite-stories";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

const FavoriteDB = {
  async put(story) {
    const db = await dbPromise;
    return db.put(STORE_NAME, story);
  },
  async getAll() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },
  async delete(id) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
  },
};

export default FavoriteDB;
