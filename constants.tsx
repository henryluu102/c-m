
import { Recipe } from './types';

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Thịt Kho Tàu Trứng Cút',
    description: 'Món ăn quốc hồn quốc túy trong mâm cơm người Việt với vị ngọt thanh từ nước dừa.',
    category: 'Món Kho',
    prepTime: '20 phút',
    cookTime: '45 phút',
    difficulty: 'Trung Bình',
    servings: 4,
    ingredients: [
      { name: 'Thịt ba chỉ', amount: '500g' },
      { name: 'Trứng cút', amount: '20 quả' },
      { name: 'Nước dừa tươi', amount: '500ml' },
      { name: 'Hành tím, tỏi', amount: '30g' }
    ],
    instructions: [
      'Thịt cắt miếng vuông vừa ăn, ướp gia vị 30 phút.',
      'Trứng cút luộc chín, bóc vỏ.',
      'Thắng nước màu, cho thịt vào xào săn.',
      'Đổ nước dừa vào đun sôi, hạ lửa nhỏ kho đến khi thịt mềm.',
      'Cho trứng cút vào kho thêm 15 phút là hoàn tất.'
    ],
    imageUrl: 'https://picsum.photos/seed/thitkho/800/600',
    nutrition: { calories: 450, protein: '25g', carbs: '10g', fat: '35g' }
  },
  {
    id: '2',
    title: 'Canh Chua Cá Lóc',
    description: 'Vị chua thanh mát của me hòa quyện cùng cá lóc tươi và các loại rau đặc trưng Nam Bộ.',
    category: 'Món Canh',
    prepTime: '15 phút',
    cookTime: '20 phút',
    difficulty: 'Dễ',
    servings: 4,
    ingredients: [
      { name: 'Cá lóc', amount: '1 con' },
      { name: 'Dứa (thơm)', amount: '1/4 quả' },
      { name: 'Cà chua', amount: '2 quả' },
      { name: 'Dọc mùng', amount: '100g' },
      { name: 'Nước cốt me', amount: '3 thìa' }
    ],
    instructions: [
      'Cá làm sạch, cắt khúc.',
      'Đun sôi nước với nước cốt me.',
      'Cho dứa, cà chua và cá vào nấu chín.',
      'Thêm dọc mùng, giá đỗ và đậu bắp vào đun sôi lại.',
      'Nêm nếm gia vị vừa ăn, rắc ngổ và hành lá.'
    ],
    imageUrl: 'https://picsum.photos/seed/canhchua/800/600',
    nutrition: { calories: 180, protein: '22g', carbs: '15g', fat: '5g' }
  },
  {
    id: '3',
    title: 'Rau Muống Xào Tỏi',
    description: 'Món rau giản dị nhưng cực kỳ đưa cơm với mùi thơm nồng nàn của tỏi phi.',
    category: 'Món Xào',
    prepTime: '10 phút',
    cookTime: '5 phút',
    difficulty: 'Dễ',
    servings: 3,
    ingredients: [
      { name: 'Rau muống', amount: '1 bó' },
      { name: 'Tỏi', amount: '2 củ' },
      { name: 'Dầu ăn', amount: '2 thìa' }
    ],
    instructions: [
      'Rau muống nhặt sạch, rửa để ráo.',
      'Tỏi băm nhỏ.',
      'Phi thơm tỏi với dầu ăn.',
      'Cho rau vào xào lửa lớn để giữ màu xanh.',
      'Nêm gia vị vừa ăn rồi tắt bếp.'
    ],
    imageUrl: 'https://picsum.photos/seed/raumuong/800/600',
    nutrition: { calories: 85, protein: '3g', carbs: '5g', fat: '7g' }
  }
];
