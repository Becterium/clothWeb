<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="mgb20">
                    <template #header>服装</template>
                    <el-carousel height="300px">
                        <el-carousel-item v-for="item in imgs" :key="item">
                            <el-image class="carousel-img" :src="item" fit="cover" />
                        </el-carousel-item>
                    </el-carousel>
                    <div class="container">
                        <div class="product-title">{{ hehe.product.name }}</div>
                        <div class="delivery-info">{{ hehe.product.description }}</div>
                        <div class="price">¥{{ hehe.product.price }}</div>
                        <div class="location">剩余库存: {{ hehe.product.stock }} || 质量: {{ hehe.product.quality }} || 主要颜色:
                            {{
                            hehe.product.color }} || 种类: {{ hehe.product.category }}</div>
                        <div class="delivery-info"></div>
                        <div class="button-container">
                            <el-button type="danger" @click="toggleVisibility">立即购买</el-button>
                            <el-button :type="boolStar" :icon="Star" circle @click="HandleStar" />
                        </div>
                        <br />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card id="myDiv" class="mgb21">
                    <el-form-item label="电话号码" prop="name">
                        <el-input>v-model="form.name"</el-input>
                    </el-form-item>
                    <el-select v-model="va" placeholder="Select" style="width: 240px">
                        <el-option-group v-for="group in op" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-option-group>
                    </el-select>
                    <br />
                    <br />
                    <el-button type="danger" @click="HandleOrder">提交订单</el-button>
                    <br />
                    <br />
                    <div class="container">
                        <md-editor class="mgb20" v-model="text" @on-upload-img="onUploadImg" />
                        <div style="text-align: right;">
                            <el-button type="info" @click="HandleComment">提交评价</el-button>
                            <el-button type="warning" @click="HandleRequest">退货退款</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Star } from '@element-plus/icons-vue'
import { ProductStore } from '../../store/product.ts';
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from '../../utils/request.ts'
import { ElMessage } from 'element-plus';

const text = ref('Hello Editor! \n```java \n public static void main(String[] args) { \n System.out.println("Hello World"); \n }\n ``` \n');
const onUploadImg = (files: any) => {
    console.log(files);
};
const imgs = [
    '/src/assets/heheda/1719147038437.jpg',
    '/src/assets/heheda/1719147066591.jpg',
];

const hehe = ProductStore();
console.log(hehe.product);

imgs.unshift('/src/assets/product/'+hehe.product.imageUrl)


const toggleVisibility = () => {
    var element = document.getElementById('myDiv');
    element.classList.toggle('visible');
}

const boolStar = ref();
const HandleStar = async () => {
    console.log(localStorage.getItem('vuems_name'));
    
    if (boolStar.value === null) {
        boolStar.value = 'warning';
        try {
            const res = await axios.get('/operate/insert?kind=star&&username=' + localStorage.getItem('vuems_name'))
            const response = res.data;
            if (response.code === 0) {
                ElMessage.success('收藏成功');
            } else {
                ElMessage.error("服务端错误");
            }
        } catch (error) {
            ElMessage.error(error);
        }
    } else {
        boolStar.value = null;
    }
}

const HandleComment = async () => {
    console.log(localStorage.getItem('vuems_name'));
    try {
        const res = await axios.get('/operate/insert?kind=comment&&username=' + localStorage.getItem('vuems_name'))
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success('评价成功');
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
}

const HandleRequest = async () => {
    console.log(localStorage.getItem('vuems_name'));
    try {
        const res = await axios.get('/operate/insert?kind=reject&&username=' + localStorage.getItem('vuems_name'))
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success('处理退款');
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
}

const HandleOrder = async () => {
    console.log(localStorage.getItem('vuems_name'));

    try {
        const res = await axios.get('/operate/insert?kind=order&&username=' + localStorage.getItem('vuems_name'))
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success('提交订单成功');
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
}
const va = ref('')
const op = [
    {
        label: '城市',
        options: [
            {
                value: '北京',
                label: '北京',
            },
            {
                value: '上海',
                label: '上海',
            },
            {
                value: '天津',
                label: '天津',
            },
            {
                value: '重庆',
                label: '重庆',
            },
            {
                value: '黑龙江',
                label: '黑龙江',
            },
            {
                value: '吉林',
                label: '吉林',
            },
            {
                value: '辽宁',
                label: '辽宁',
            },
            {
                value: '河北',
                label: '河北',
            },
            {
                value: '山西',
                label: '山西',
            },
            {
                value: '江苏',
                label: '江苏',
            },
            {
                value: '浙江',
                label: '浙江',
            },
            {
                value: '安徽',
                label: '安徽',
            },
            {
                value: '福建',
                label: '福建',
            },
            {
                value: '江西',
                label: '江西',
            },
            {
                value: '山东',
                label: '山东',
            },
            {
                value: '河南',
                label: '河南',
            },
            {
                value: '湖北',
                label: '湖北',
            },
            {
                value: '湖南',
                label: '湖南',
            },
            {
                value: '广东',
                label: '广东',
            },
            {
                value: '海南',
                label: '海南',
            },
            {
                value: '四川',
                label: '四川',
            },
            {
                value: '贵州',
                label: '贵州',
            },
            {
                value: '云南',
                label: '云南',
            },
            {
                value: '陕西',
                label: '陕西',
            },
            {
                value: '甘肃',
                label: '甘肃',
            },
            {
                value: '青海',
                label: '青海',
            },
            {
                value: '台湾',
                label: '台湾',
            },
            // {
            //     value: '',
            //     label: '',
            // },
        ],
    },
]
</script>

<style scoped>
.mgb21 {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-out, visibility 1s;
}

.mgb21.visible {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.5s ease-in;
}

.el-carousel__item h3 {
    color: #475669;
    line-height: 400px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.carousel-img {
    width: 100%;
    height: 100%;
}

.container {
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.price {
    color: #ff4d4f;
    font-size: 24px;
    margin: 10px 0;
    text-align: right;
}

.location {
    color: #666;
    margin-bottom: 10px;
}

.delivery-info {
    color: #666;
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.buy-now {
    background-color: #ff4d4f;
}

.add-to-cart {
    background-color: #ffa500;
}

.save {
    display: inline-block;
    margin-top: 10px;
    color: #ff4d4f;
    text-decoration: none;
    cursor: pointer;
}
</style>
