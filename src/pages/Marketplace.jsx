import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineShoppingBag, HiOutlineMagnifyingGlass,
  HiOutlineShoppingCart, HiOutlineStar, HiOutlineTag,
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

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="glass-card p-4 flex flex-col gap-3 card-glow"
    >
      {/* Image placeholder */}
      <div className="rounded-xl bg-surface-2 aspect-square flex items-center justify-center relative overflow-hidden">
        <HiOutlineShoppingBag className="text-5xl text-ink-3/40" />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-accent-rose text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[10px] text-ink-3 uppercase tracking-wide">{product.category}</p>
        <p className="font-semibold text-ink text-sm leading-snug mt-0.5 line-clamp-2">{product.name}</p>
        <p className="text-xs text-ink-3 mt-0.5">{product.brand}</p>
        <StarRating rating={product.rating} />
        <p className="text-[10px] text-ink-3">{product.reviewCount} reviews</p>
      </div>

      {/* Price + status */}
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
  const [cartCount, setCartCount] = useState(0)

  const products   = marketplaceJson?.data ?? []
  const categories = ['All', ...(marketplaceJson?.categories ?? [])]

  const visible = products.filter((p) => {
    const matchCat    = category === 'All' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleAddToCart = (product) => {
    setCartCount((n) => n + 1)
    toast.success('Added to cart', `${product.name} has been added.`)
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
          <button className="relative glass px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors cursor-pointer">
            <HiOutlineShoppingCart className="text-lg" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-accent-rose text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        }
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
        {/* Search + categories */}
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

        {/* Results count */}
        <motion.p variants={fadeInUp} className="text-xs text-ink-3">
          Showing {visible.length} of {products.length} products
        </motion.p>

        {/* Product grid */}
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
    </PageWrapper>
  )
}

export default Marketplace
