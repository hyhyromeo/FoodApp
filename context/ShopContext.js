import { createContext, useState, useEffect } from 'react';
import { getShops } from '../Firebase';
export const ShopContext = createContext({
  shops: {},
  theme: {},
  banners: {},
});

export const ShopContextProvider = ({ children }) => {
  const [shop, setShop] = useState({});
  const [banner, setBanner] = useState({});
  const [theme, setTheme] = useState({});
  useEffect(() => {
    const getShopsList = async () => {
      const shops = await getShops('AllShop');
      setShop(shops);
      setTheme('lightblue');
    };
    const getBannerList = async () => {
      const banners = await getShops('HomeBanner');
      setBanner(banners);
    };
    getShopsList();
    getBannerList();
  }, []);
  const value = { shop, theme, banner };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
