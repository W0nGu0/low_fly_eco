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