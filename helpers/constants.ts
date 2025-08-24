export const isProd = process.env.NODE_ENV === 'production';

// Default shipping 15 lukas
export const shippingCost = 15000;

// Default free shipping from 200 lukas
export const freeShippingThreshold = 100000;

export const IMAGE_OPTIMIZATION = {
  placeholder: 'blur',
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  sizes: {
    mobile: '(max-width: 850px) 100vw, (max-width: 1200px) 50vw, 33vw',
    desktop: '(max-width: 1200px) 100vw, 50vw'
  }
} as const; 