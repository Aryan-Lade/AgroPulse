import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineShoppingBag, HiOutlineMagnifyingGlass,
  HiOutlineShoppingCart, HiOutlineStar, HiOutlineTag,
  HiOutlineXMark, HiOutlineTrash, HiOutlinePlus, HiOutlineMinus,
  HiOutlineCheckBadge,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Badge from '@/components/common/Badge.jsx'
import Button from '@/components/common/Button.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import { useToast } from '@/context/ToastContext.jsx'
import marketplaceJson from '@/data/marketplace.json'
import { staggerContainer, fadeInUp } from '@/utils/motionVariants.js'
import { classNames } from '@/utils/formatters.js'

const STOCK_STATUS = {
  'in-stock':  { label: 'In Stock',  status: 'optimal' },
  'low-stock': { label: 'Low Stock', status: 'warning' },
  'on-order':  { label: 'On Order',  status: 'info'    },
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiOutlineStar
          key={i}
          className={classNames(
            'text-xs',
            i < Math.round(rating) ? 'text-accent-amber' : 'text-ink-3',
          )}
        />
      ))}
      <span className="text-xs text-ink-3 ml-0.5">{rating}</span>
    </div>
  )
}

function ProductCard({ product, onAddToCart }) {
  const stock = STOCK_STATUS[product.stockStatus] ?? { label: product.stockStatus, status: 'neutral' }
  const finalPrice = Math.round(product.priceINR * (1 - product.discount / 100))
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="glass-card p-4 flex flex-col gap-3 card-glow group"
    >
      {}
      <div className="rounded-xl bg-surface-2 aspect-square flex items-center justify-center relative overflow-hidden">
        {!imgError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <HiOutlineShoppingBag className="text-5xl text-ink-3/40" />
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-accent-rose text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
            -{product.discount}%
          </span>
        )}
      </div>

      {}
      <div className="flex-1">
        <p className="text-[10px] text-ink-3 uppercase tracking-wide">{product.category}</p>
        <p className="font-semibold text-ink text-sm leading-snug mt-0.5 line-clamp-2">{product.name}</p>
        <p className="text-xs text-ink-3 mt-0.5">{product.brand}</p>
        <StarRating rating={product.rating} />
        <p className="text-[10px] text-ink-3">{product.reviewCount} reviews</p>
      </div>

      {}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            ₹{finalPrice.toLocaleString('en-IN')}
          </p>
          {product.discount > 0 && (
            <p className="text-xs text-ink-3 line-through">₹{product.priceINR.toLocaleString('en-IN')}</p>
          )}
          <p className="text-[10px] text-ink-3">{product.unit}</p>
        </div>
        <Badge status={stock.status}>{stock.label}</Badge>
      </div>

      <Button
        size="sm"
        variant={product.stockStatus === 'on-order' ? 'secondary' : 'primary'}
        icon={HiOutlineShoppingCart}
        className="w-full"
        onClick={() => onAddToCart(product)}
        disabled={product.stockStatus === 'on-order'}
      >
        {product.stockStatus === 'on-order' ? 'Pre-order' : 'Add to Cart'}
      </Button>
    </motion.div>
  )
}

function Marketplace() {
  const toast = useToast()
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const products   = marketplaceJson?.data ?? []
  const categories = ['All', ...(marketplaceJson?.categories ?? [])]

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const price = Math.round(item.product.priceINR * (1 - item.product.discount / 100))
    return acc + price * item.qty
  }, 0)

  const visible = products.filter((p) => {
    const matchCat    = category === 'All' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id)
      if (idx > -1) {
        const next = [...prev]
        next[idx].qty += 1
        return next
      }
      return [...prev, { product, qty: 1 }]
    })
    toast.success('Added to cart', `${product.name} has been added.`)
  }

  const handleUpdateQty = (productId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.qty + delta
            return nextQty > 0 ? { ...item, qty: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    setCartItems([])
    setIsCartOpen(false)
    toast.success('Order Placed Successfully!', 'Your agricultural supplies order has been confirmed.')
  }

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineShoppingBag}
        accent="primary"
        title="Marketplace"
        description="Shop seeds, fertilizers, equipment, and tools from trusted agriculture brands."
        badge={{ label: `${products.length} Products`, status: 'info' }}
        action={
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative glass px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors cursor-pointer"
          >
            <HiOutlineShoppingCart className="text-lg" />
            Cart
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-accent-rose text-white text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        }
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
        {}
        <motion.div variants={fadeInUp} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 glass rounded-xl px-3.5 py-2 max-w-sm">
            <HiOutlineMagnifyingGlass className="text-ink-3 shrink-0" />
            <input
              type="text"
              placeholder="Search products, brands…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={classNames(
                  'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
                  category === cat
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'glass text-ink-2 hover:text-ink',
                )}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-ink-3">
                    {products.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {}
        <motion.p variants={fadeInUp} className="text-xs text-ink-3">
          Showing {visible.length} of {products.length} products
        </motion.p>

        {}
        {visible.length === 0 ? (
          <EmptyState
            icon={HiOutlineShoppingBag}
            title="No products found"
            description="Try a different search term or category."
          />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Slide-over Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-night-950/70 backdrop-blur-sm"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-screen max-w-md glass-card border-l border-line shadow-2xl flex flex-col"
              >
                <div className="p-5 border-b border-line flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <HiOutlineShoppingCart className="text-xl text-primary-400" />
                    <h3 className="font-display font-semibold text-ink text-base">Your Farm Supplies Cart</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="size-8 rounded-full glass flex items-center justify-center text-ink-3 hover:text-ink cursor-pointer"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <HiOutlineShoppingBag className="text-5xl text-ink-3 mb-3" />
                      <p className="font-semibold text-ink">Your cart is empty</p>
                      <p className="text-xs text-ink-3 mt-1">Browse seeds, fertilizers, and tools to add supplies.</p>
                    </div>
                  ) : (
                    cartItems.map(({ product, qty }) => {
                      const finalPrice = Math.round(product.priceINR * (1 - product.discount / 100))
                      return (
                        <div key={product.id} className="glass rounded-xl p-3.5 flex items-center gap-3">
                          <div className="size-14 rounded-lg bg-surface-2 shrink-0 flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <HiOutlineShoppingBag className="text-2xl text-ink-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink truncate">{product.name}</p>
                            <p className="text-[11px] text-ink-3 mt-0.5">{product.brand} · {product.unit}</p>
                            <p className="text-xs font-bold text-primary-400 mt-1">₹{finalPrice.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQty(product.id, -1)}
                              className="size-7 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-ink cursor-pointer"
                            >
                              <HiOutlineMinus className="text-xs" />
                            </button>
                            <span className="text-xs font-bold text-ink w-4 text-center">{qty}</span>
                            <button
                              onClick={() => handleUpdateQty(product.id, 1)}
                              className="size-7 rounded-lg glass flex items-center justify-center text-ink-2 hover:text-ink cursor-pointer"
                            >
                              <HiOutlinePlus className="text-xs" />
                            </button>
                            <button
                              onClick={() => handleRemoveFromCart(product.id)}
                              className="size-7 rounded-lg glass flex items-center justify-center text-accent-rose/70 hover:text-accent-rose ml-1 cursor-pointer"
                              title="Remove item"
                            >
                              <HiOutlineTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="p-5 border-t border-line glass flex flex-col gap-3">
                    <div className="flex justify-between text-xs text-ink-2">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-2">
                      <span>Agricultural Subsidy & GST (5%)</span>
                      <span className="font-semibold text-ink">₹{Math.round(cartSubtotal * 0.05).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-2">
                      <span>Farm Delivery</span>
                      <span className="font-semibold text-primary-400">FREE</span>
                    </div>
                    <div className="border-t border-line pt-2 flex justify-between text-sm font-bold text-ink">
                      <span>Total Amount</span>
                      <span className="font-display text-primary-400">₹{Math.round(cartSubtotal * 1.05).toLocaleString('en-IN')}</span>
                    </div>
                    <Button onClick={handleCheckout} className="w-full justify-center mt-2">
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

export default Marketplace
