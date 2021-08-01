import { SimpleGrid } from "@chakra-ui/react";
import BannerCard from "./bannerCard";

const BannerView = ({ banners, setBanners }) => {
  if (!banners) return null;
  return (
    <>
      <SimpleGrid
        spacing='100px'
        columns={{
          base: 1,
          md: 2,
        }}
      >
        {banners.map((banner) => {
          return (
            <BannerCard
              key={banner.id}
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
