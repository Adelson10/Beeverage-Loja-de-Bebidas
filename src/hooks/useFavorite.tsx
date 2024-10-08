import React from 'react';

interface useFavoriteProps {
    code: string;
    favorite: boolean;
}

export const useFavorite = () => {
    const [favorite, setFavorite] = React.useState<useFavoriteProps[] | null>(null);

    React.useEffect(() => {
        if(!localStorage.getItem('PRODUCTS_FAVORITE')) {
            localStorage.setItem('PRODUCTS_FAVORITE', JSON.stringify(favorite));
        } else {
            setFavorite(JSON.parse(localStorage.getItem('PRODUCTS_FAVORITE') as useFavorite));
        }
    }, [favorite]);

    const favorites = React.useCallback(() => {
       return localStorage.getItem('PRODUCTS_FAVORITE');
    },[]);

    const SaveFavorite = async ({code}: {code: string}) => {
        try {
            if(favorite) {
                const isProduct = favorite.every( (productFav) => {
                    productFav.code === code
                });
    
                if(isProduct) {
                    
                } else {
                    throw new Error('Não existe registro desse produto.');
                }
            }
        } catch (error) {
            
        }
    }

  return {favorites, SaveFavorite};
}