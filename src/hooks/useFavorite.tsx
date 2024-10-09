import React from 'react';

interface useFavoriteProps {
    [code: string]: boolean;
}

export const useFavorite = () => {
    const [favorite, setFavorite] = React.useState<useFavoriteProps[]>([]);

    React.useEffect(() => {
        if(localStorage.getItem('PRODUCTS_FAVORITE')) {
            const returnStrong: useFavoriteProps[] = JSON.parse(localStorage.getItem('PRODUCTS_FAVORITE'));
            setFavorite(returnStrong);
        }
    }, [favorite]);

    const favorites = React.useCallback(() => {
       return localStorage.getItem('PRODUCTS_FAVORITE');
    },[]);

    const SaveFavorite = async ({code}: {code: string}) => {
        try {
            if(favorite) {
                const isProduct = favorite.every( (productFav) => 
                    productFav.hasOwnProperty(code)
                );

                console.log(isProduct);
                
                if(isProduct) {
                    setFavorite({...favorite, [code]: !favorite[code]});
                } else {
                    throw new Error('Não existe registro desse produto.');
                }
            }
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }

  return {favorites, SaveFavorite};
}