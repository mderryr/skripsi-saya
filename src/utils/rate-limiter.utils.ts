// utils/rate-limiter.utils.ts
interface RateLimiterConfig {
    maxAttempts: number;
    timeWindow: number;
  }
  
  interface RateLimiterEntry {
    attempts: number;
    lastRequestTime: number;
    resetAt: number;
  }
  
  //RateLimiter class
  export class RateLimiter{
    private configs: Map<string, RateLimiterConfig> = new Map();
    private store: Map<string, RateLimiterEntry> = new Map();
  
    // Konfigurasi default
    constructor() {
      // Set default configurations
      this.configs.set('guest', {
        maxAttempts: 10,
        timeWindow: 60 * 60 * 1000 // 1 jam
      });
  
      this.configs.set('authenticated', {
        maxAttempts: 50,
        timeWindow: 60 * 60 * 1000 // 1 jam
      });
    }
  
    // Update konfigurasi untuk tipe pengguna tertentu
    updateConfig(userType: string, config: Partial<RateLimiterConfig>) {
      const existingConfig = this.configs.get(userType) || {
        maxAttempts: 10,
        timeWindow: 60 * 60 * 1000
      };
  
      this.configs.set(userType, {
        ...existingConfig,
        ...config
      });
    }
  
    // Dapatkan konfigurasi saat ini
    getConfig(userType: string): RateLimiterConfig {
      return this.configs.get(userType) || {
        maxAttempts: 10,
        timeWindow: 60 * 60 * 1000
      };
    }
  
    // Metode utama untuk pengecekan rate limit
    check(identifier: string, userType: 'guest' | 'authenticated' = 'guest') {
      const config = this.getConfig(userType);
      const now = Date.now();
      
      // Dapatkan atau buat entri untuk identifier
      let entry = this.store.get(identifier) || {
        attempts: 0,
        lastRequestTime: now,
        resetAt: now + config.timeWindow
      };
  
      // Periksa apakah perlu direset
      if (now >= entry.resetAt) {
        entry = {
          attempts: 0,
          lastRequestTime: now,
          resetAt: now + config.timeWindow
        };
      }
  
      // Tambah jumlah percobaan
      entry.attempts++;
      entry.lastRequestTime = now;
  
      // Simpan kembali entri
      this.store.set(identifier, entry);
  
      // Periksa apakah melebihi batas
      return {
        allowed: entry.attempts <= config.maxAttempts,
        attempts: entry.attempts,
        maxAttempts: config.maxAttempts,
        resetAt: entry.resetAt
      };
    }
  
    // Metode untuk mereset rate limit manual
    reset(identifier: string) {
      this.store.delete(identifier);
    }
  
    // Metode untuk membersihkan entri yang sudah expired
    cleanup() {
      const now = Date.now();
      for (const [identifier, entry] of this.store.entries()) {
        if (now >= entry.resetAt) {
          this.store.delete(identifier);
        }
      }
    }
  }
  
  // Buat instance global
  export const globalRateLimiter = new RateLimiter();