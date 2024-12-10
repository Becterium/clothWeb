export interface Product {
    id: number; // TypeScript 使用 number 类型来表示 Long 和 int
    name: string;
    price: number;
    stock: number;
    quality: number;
    color: string;
    description: string;
    imageUrl: string; // 使用驼峰命名法
    category: string;
}