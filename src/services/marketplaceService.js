
import marketData from '@/data/marketplace.json'

export const getProducts = (filters = {}) => {
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

export const getCategories = () => {
  return Promise.resolve(marketData.categories)
}

export const addToCart = (productId, quantity = 1) => {
  return Promise.resolve({
    success: true,
    productId,
    quantity,
    message: 'Item added to cart successfully.',
  })
}
