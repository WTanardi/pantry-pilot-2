"use client";
import { FC, useState } from "react";
import Image from "next/image";

interface IngredientProps {
  name: string;
}

const Ingredient: FC<IngredientProps> = ({ name }) => {
  const [userHas, setUserHas] = useState(false);
  const handleClick = () => {
    setUserHas(!userHas);
  };
  return (
    <>
      <div
        className={`text-white text-sm rounded-md border-x-8 border-y-4 select-none ${
          userHas
            ? "bg-emerald-500 border-emerald-500"
            : "bg-gray-400 border-gray-400"
        }`}
        onClick={handleClick}
      >
        {name}
      </div>
    </>
  );
};

interface IngredientCardProps {
  title: string;
  ingCount: number;
  ingredients: Array<string>;
  maxIngCount: number;
  imgPath: string;
}

const IngredientCard: FC<IngredientCardProps> = ({
  title,
  ingCount,
  ingredients,
  maxIngCount,
  imgPath,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {/* Card */}
      <div className="p-4 shadow-md bg-white flex-col border-2 border-rose-600 flex text-black rounded-2xl w-full">
        {/* Card Top */}
        <div className="flex gap-2 pb-3 mb-3 border-b-2">
          {/* Card logo */}
          <div className="">
            <Image
              src={imgPath}
              alt={`${title} icon`}
              width={50}
              height={50}
              className="w-12 h-12"
            ></Image>
          </div>
          {/* Card title and ingredient */}
          <div>
            <div className="xl:text-lg">{title}</div>
            <div className="text-black/50 text-sm">
              {ingCount}/{maxIngCount} Ingredients
            </div>
          </div>
        </div>
        {/* Card bottom */}
        <div className="flex flex-wrap gap-2 overflow-hidden items-start">
          {/* Ingredients */}
          {!showMore &&
            ingredients
              .slice(0, 10)
              .map((ingredient, index) => (
                <Ingredient name={ingredient} key={index}></Ingredient>
              ))}
          {showMore &&
            ingredients.map((ingredient, index) => (
              <Ingredient name={ingredient} key={index}></Ingredient>
            ))}
          {/* Show More button */}
          {ingredients.length > 10 && (
            <div className="text-white text-sm rounded-md border-x-8 border-y-4 bg-emerald-500 border-emerald-500">
              <button className="" onClick={toggleShowMore}>
                {showMore ? "- Less" : "+ More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IngredientCard;
