"use client";
import React from "react";
import {
  motion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <div className="relative flex flex-col self-auto py-40 overflow-hidden h-[120vh] [transform-style:preserve-3d] [perspective:1000px]">
       <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
        {firstRow.map((product) => (
          <ProductCard
            product={product}
            key={product.title}
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row mb-20 space-x-20">
        {secondRow.map((product) => (
          <ProductCard
            product={product}
            key={product.title}
            reverse
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
        {thirdRow.map((product) => (
          <ProductCard
            product={product}
            key={product.title}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  reverse = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  reverse?: boolean;
}) => {
  return (
    <div
      className={cn(
        "group/product h-96 w-[30rem] relative flex-shrink-0 animate-marquee",
        reverse && "animate-marquee-reverse"
        )}
      style={{
        animationPlayState: 'running',
      }}
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </div>
  );
};
