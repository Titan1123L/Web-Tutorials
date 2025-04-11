import { Product } from '@/utils/algorithms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, DollarSign, BarChart } from 'lucide-react'
import { useDraggable } from '@dnd-kit/core'

interface ProductCardProps {
  product: Product
  isDragging?: boolean
}

export function ProductCard({ product, isDragging }: ProductCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: product.id.toString(),
    data: product,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`w-full cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
        <Badge variant={product.stock > 10 ? "default" : "destructive"}>{product.stock}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <div className="flex items-center pt-4">
          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">ID: {product.id}</span>
        </div>
      </CardContent>
    </Card>
  )
}

