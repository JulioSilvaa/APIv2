"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_js_1 = require("@supabase/storage-js");
const STORAGE_URL = process.env.STORAGE_URL || "";
const SERVICE_KEY = process.env.SERVICE_KEY || "";
const storageClient = new storage_js_1.StorageClient(STORAGE_URL, {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
});
exports.default = storageClient;
