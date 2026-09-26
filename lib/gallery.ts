// Everything shown on the /gallery page. Width/height are the real file
// dimensions so the masonry grid can reserve space before images load.

export const galleryCategories = ["Views", "Pools", "Stay", "Heritage", "Adventure"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

type Base = {
  title: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export type GalleryPhoto = Base & { type: "photo"; src: string };
export type GalleryVideo = Base & { type: "video"; src: string; poster: string };
export type GalleryItem = GalleryPhoto | GalleryVideo;

const R = "/images/resort/";
const V = "/videos/";

export const galleryItems: GalleryItem[] = [
  { type: "video", src: V + "meswo-tour.mp4", poster: V + "meswo-tour.jpg", title: "Resort tour", category: "Views", width: 720, height: 1280 },
  { type: "photo", src: R + "aerial-1.jpg", title: "The resort by the Meswo river", category: "Views", width: 3200, height: 1800 },
  { type: "photo", src: R + "drone-pools.jpg", title: "Both pools from above", category: "Pools", width: 720, height: 1280 },
  { type: "photo", src: R + "entrance.webp", title: "Heritage-style entrance", category: "Heritage", width: 1360, height: 608 },
  { type: "photo", src: R + "room-portrait.webp", title: "Hand-painted room", category: "Stay", width: 458, height: 1020 },
  { type: "photo", src: R + "adventure-sunset-2.webp", title: "Rope course at sunset", category: "Adventure", width: 744, height: 1020 },
  { type: "video", src: V + "pool-fountains.mp4", poster: V + "pool-fountains.jpg", title: "Poolside fountains", category: "Pools", width: 720, height: 1280 },
  { type: "photo", src: R + "well-landscape.jpg", title: "Painted courtyard and well", category: "Heritage", width: 2000, height: 900 },
  { type: "video", src: V + "drone-loop.mp4", poster: V + "drone-loop.jpg", title: "Flying over the cottages", category: "Views", width: 720, height: 1280 },
  { type: "photo", src: R + "pool-1.jpg", title: "Poolside", category: "Pools", width: 1125, height: 2000 },
  { type: "photo", src: R + "verandah-river.webp", title: "Verandah over the river", category: "Views", width: 765, height: 1020 },
  { type: "photo", src: R + "room.webp", title: "Room with a view of the lawns", category: "Stay", width: 1360, height: 610 },
  { type: "photo", src: R + "adventure-sunset-1.webp", title: "Climbing nets at golden hour", category: "Adventure", width: 744, height: 1020 },
  { type: "video", src: V + "rain-pool.mp4", poster: V + "rain-pool.jpg", title: "Rain on the pool", category: "Pools", width: 405, height: 720 },
  { type: "photo", src: R + "drone-cottages.jpg", title: "Cottages among the trees", category: "Stay", width: 720, height: 1280 },
  { type: "photo", src: R + "river-view.jpg", title: "The Meswo river", category: "Views", width: 2000, height: 894 },
  { type: "photo", src: R + "cottage-1.jpg", title: "Painted cottage", category: "Stay", width: 1000, height: 2000 },
  { type: "photo", src: R + "pool-trees.jpg", title: "Pool lined with trees", category: "Pools", width: 720, height: 1280 },
  { type: "photo", src: R + "adventure-park.webp", title: "Adventure park", category: "Adventure", width: 1360, height: 609 },
  { type: "photo", src: R + "climbing-wall.jpg", title: "Climbing wall & tyre swings", category: "Adventure", width: 895, height: 1600 },
  { type: "video", src: V + "pool-morning.mp4", poster: V + "pool-morning.jpg", title: "Misty morning swim", category: "Pools", width: 405, height: 720 },
  { type: "photo", src: R + "garden-cottage.jpg", title: "Cottage on the lawn", category: "Stay", width: 720, height: 1280 },
  { type: "photo", src: R + "well-portrait.jpg", title: "The courtyard well", category: "Heritage", width: 1002, height: 2000 },
  { type: "photo", src: R + "pool-2.jpg", title: "Evening by the pool", category: "Pools", width: 1125, height: 2000 },
  { type: "photo", src: R + "aerial-2.jpg", title: "Pools, cottages and the river", category: "Views", width: 2400, height: 1350 },
  { type: "video", src: V + "gazebo-walk.mp4", poster: V + "gazebo-walk.jpg", title: "Walk to the riverside gazebo", category: "Views", width: 720, height: 1280 },
  { type: "photo", src: R + "cottage-2.jpg", title: "Cottage details", category: "Stay", width: 1000, height: 2000 },
  { type: "video", src: V + "garden-cottage.mp4", poster: V + "garden-cottage.jpg", title: "Around the garden cottage", category: "Stay", width: 720, height: 1280 },
  { type: "photo", src: R + "pool-3.jpg", title: "Pool floats", category: "Pools", width: 1125, height: 2000 },
  { type: "video", src: V + "pool-rain-2.mp4", poster: V + "pool-rain-2.jpg", title: "Monsoon days", category: "Pools", width: 405, height: 720 },
];
