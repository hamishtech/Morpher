import { SimpleGrid } from "@chakra-ui/react";
import BannerCard from "./bannerCard";

const BannerView = ({ banners, setBanners }) => {
  if (!banners) return null;
  return (
    <>
      <SimpleGrid
        spacing='10px'
        columns={{
          base: 1,
          md: banners.length > 1 ? (banners.length === 2 ? 2 : 3) : 1,
        }}
      >
        {banners.map((avatar) => {
          return (
            <BannerCard
              key={avatar.id}
              banner={banner}
              setBanners={setBanners}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default BannerView;
