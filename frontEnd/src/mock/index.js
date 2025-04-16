export const projects = [
  {
    id: 1,
    name: '城市热气球观光之旅',
    brief: '乘坐热气球，俯瞰整座城市的美景，体验自由飞翔的感觉',
    coverImage: '@/assets/images/projects/hot-air-balloon.jpg',
    categoryId: 1,
    location: '北京市朝阳区',
    duration: 60,
    price: 688,
    weekendPrice: 888,
    holidayPrice: 1088,
    maxBookingsPerDay: 30,
    bookingCount: 128,
    status: 'active',
    rating: 4.8,
    reviewCount: 128,
    isPopular: true
  },
  {
    id: 2,
    name: '直升机空中游览',
    brief: '乘坐专业直升机，从空中欣赏城市风光，拍摄绝美照片',
    coverImage: '@/assets/images/projects/helicopter.jpg',
    categoryId: 2,
    location: '上海市浦东新区',
    duration: 30,
    price: 1280,
    weekendPrice: 1580,
    holidayPrice: 1880,
    maxBookingsPerDay: 20,
    bookingCount: 92,
    status: 'active',
    rating: 4.6,
    reviewCount: 92,
    isPopular: true
  },
  {
    id: 3,
    name: '专业无人机飞行体验',
    brief: '在专业教练指导下，学习操控高端无人机，体验科技带来的乐趣',
    coverImage: '@/assets/images/projects/drone.jpg',
    categoryId: 3,
    location: '广州市天河区',
    duration: 120,
    price: 399,
    weekendPrice: 499,
    holidayPrice: 599,
    maxBookingsPerDay: 15,
    bookingCount: 75,
    status: 'active',
    rating: 4.5,
    reviewCount: 65,
    isPopular: true
  },
  {
    id: 4,
    name: '海岸线滑翔伞体验',
    brief: '从高处起飞，在专业教练陪同下体验滑翔伞飞行，欣赏壮丽的海岸线风光',
    coverImage: '@/assets/images/projects/paragliding.jpg',
    categoryId: 4,
    location: '厦门市思明区',
    duration: 90,
    price: 880,
    weekendPrice: 1080,
    holidayPrice: 1280,
    maxBookingsPerDay: 10,
    bookingCount: 58,
    status: 'active',
    rating: 4.9,
    reviewCount: 47,
    isPopular: true
  },
  {
    id: 5,
    name: '山地动力伞飞行',
    brief: '安全的驾驶动力伞飞越山谷，体验与鸟儿共舞的自由',
    coverImage: '@/assets/images/projects/powered-paragliding.jpg',
    categoryId: 2,
    location: '京郊怀柔区',
    duration: '3小时',
    price: 1580,
    weekendPrice: 1300,
    holidayPrice: 1500,
    maxBookingsPerDay: 8,
    bookingCount: 42,
    status: 'active',
    rating: 4.6,
    reviewCount: 36,
    isPopular: false
  },
  {
    id: 6,
    name: '高空跳伞极限体验',
    brief: '从3000米高空跳下，体验自由落体的极限挑战，专业教练全程陪伴',
    coverImage: '@/assets/images/projects/skydiving.jpg',
    categoryId: 4,
    location: '海南省三亚市',
    duration: 180,
    price: 2980,
    weekendPrice: 3280,
    holidayPrice: 3580,
    maxBookingsPerDay: 5,
    bookingCount: 39,
    status: 'active',
    rating: 4.9,
    reviewCount: 29,
    isPopular: false
  }
]

export const banners = [
  {
    id: 1,
    title: '低空飞行体验',
    subtitle: '探索城市上空的奇妙视角',
    image: '@/assets/images/banners/banner1.jpg',
    link: '/projects'
  },
  {
    id: 2,
    title: '热气球观光',
    subtitle: '体验自由飞翔的感觉',
    image: '@/assets/images/banners/banner2.jpg',
    link: '/projects'
  }
]

export const users = {
  admin: {
    id: 1,
    username: 'admin',
    role: 'admin',
    token: 'admin-token',
    avatar: '@/assets/images/users/user1.jpg'
  },
  user: {
    id: 2,
    username: 'user',
    role: 'user',
    token: 'user-token',
    avatar: '@/assets/images/users/user2.jpg'
  }
}