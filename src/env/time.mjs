// env.time.mjs

export const TIME = {
    // Waktu cache (dalam milidetik)
    CACHE: {
      VERY_SHORT: 5 * 60 * 1000,        // 5 menit
      SHORT: 15 * 60 * 1000,             // 15 menit
      MEDIUM: 1 * 60 * 60 * 1000,        // 1 jam
      LONG: 4 * 60 * 60 * 1000,          // 4 jam
      VERY_LONG: 24 * 60 * 60 * 1000,    // 24 jam
    },
  
    // Waktu refetch
    REFETCH: {
      INTERVAL_SHORT: 5 * 60 * 1000,     // 5 menit
      INTERVAL_MEDIUM: 15 * 60 * 1000,   // 15 menit
      INTERVAL_LONG: 1 * 60 * 60 * 1000, // 1 jam
    },
  
    // Timeout
    TIMEOUT: {
      API_REQUEST: 10 * 1000,            // 10 detik
      LOADING_SPINNER: 3 * 1000,         // 3 detik
    },
  
    // Debounce dan Throttle
    DELAY: {
      INPUT_DEBOUNCE: 3000,               // 3 detik
      SCROLL_THROTTLE: 200,              // 0.2 detik
    }
  }
  
  // Contoh penggunaan
  export const getTimeCacheConfig = (type = 'MEDIUM') => {
    return {
      cacheTime: TIME.CACHE[type],
      staleTime: TIME.CACHE[type]
    }
  }