import { memo, useState } from 'react';
import { AddProductToWishlistProps } from './AddProductToWishlist';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

// import { AddProductToWishlist } from './AddProductToWishlist';

// Lazy Loading -> carregar uma informação somente no momento que precisar.
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
    return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist);
}, {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    }
    onAddToWishlist: (id: number) => void;
}

// shallow compare -> comparaçao rasa
// {} === {} -> false
// igualdade referencial

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

            {isAddingToWishlist &&
                <AddProductToWishlist
                    onAddToWishlist={() => onAddToWishlist(product.id)}
                    onRequestClose={() => setIsAddingToWishlist(false)}
                />
            }

        </div>
    )
}

// Em questão do product ser um objeto, e não uma string ou number, por exemplo, é preciso passar o segundo parâmetro. 
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    // comparação profunda. Vai comparar cada uma das propriedade dentro do objeto product
    return lodash.isEqual(prevProps.product, nextProps.product)
})