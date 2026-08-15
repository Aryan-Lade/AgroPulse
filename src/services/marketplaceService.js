/**
 * marketplaceService.js
 * Returns mock data from marketplace.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const getProducts = (filters) => api.get('/marketplace/products', { params: filters })
 */
import marketData from '@/data/marketplace.json'

/**
 * Fetch marketplace products, optionally filtered.
 * @param {object} [filters] — e.g. { category: 'Seeds', search: 'wheat', maxPrice: 500 }
 * @returns {Promise<Array>}
 */
export const getProducts = (filters = {}) => {
  // TODO: return api.get('/marketplace/products', { params: filters })
  let results = marketData.data

  if (filters.category) {
    results = results.filter(
      (p) => p.category.toLowerCase() === filters.category.toLowerCase(),
    )
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }
  if (filters.maxPrice != null) {
    results = results.filter((p) => p.priceINR <= filters.maxPrice)
  }
  if (filters.inStockOnly) {
    results = results.filter((p) => p.stockStatus === 'in-stock')
  }

  return Promise.resolve(results)
}

/**
 * Fetch available product categories.
 * @returns {Promise<string[]>}
 */
export const getCategories = () => {
  // TODO: return api.get('/marketplace/categories')
  return Promise.resolve(marketData.categories)
}

/**
 * Add a product to the user's cart.
 * @param {string} productId — product ID (e.g. "mkt-001")
 * @param {number} [quantity=1]
 * @returns {Promise<{ success: boolean, productId: string, quantity: number, message: string }>}
 */
export const addToCart = (productId, quantity = 1) => {
  // TODO: return api.post('/marketplace/cart', { productId, quantity })
  return Promise.resolve({
    success: true,
    productId,
    quantity,
    message: 'Item added to cart successfully.',
  })
}
