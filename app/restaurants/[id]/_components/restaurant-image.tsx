"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isRestaurantFavorited } from "../../../_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { useSession } from "next-auth/react";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({ restaurant,
  userFavoriteRestaurants, }: RestaurantImageProps ) => {
    const { data } = useSession();


  const router = useRouter();
  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        sizes="100%"
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button size="icon"  className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}>
              <Heart className="fill-secondary size-5" />
          </Button>
    </div>
  );
};

export default RestaurantImage;
