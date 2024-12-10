<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg1">
                        <User />
                    </el-icon>
                    <div class="card-content">
                        <countup class="card-num color1" :end="statistics.user_count" />
                        <div>用户访问量</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg2">
                        <ChatDotRound />
                    </el-icon>
                    <div class="card-content">
                        <countup class="card-num color2" :end="statistics.operation_count" />
                        <div>系统消息</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg3">
                        <Goods />
                    </el-icon>
                    <div class="card-content">
                        <countup class="card-num color3" :end="statistics.product_count" />
                        <div>商品数量</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg4">
                        <ShoppingCartFull />
                    </el-icon>
                    <div class="card-content">
                        <countup class="card-num color4" :end="statistics.order_count" />
                        <div>今日订单量</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mgb20">
            <el-col :span="18">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">订单动态</p>
                        <p class="card-header-desc">最近一周订单状态，包括订单成交量和订单退货量</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt1" />
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">品类分布</p>
                        <p class="card-header-desc">最近一个月销售商品的品类情况</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt2" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-card shadow="hover" :body-style="{ height: '400px' }">
                    <div class="card-header">
                        <p class="card-header-title">时间线</p>
                        <p class="card-header-desc">最新的销售动态和活动信息</p>
                    </div>
                    <el-timeline>
                        <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
                            <div class="timeline-item">
                                <div>
                                    <p>{{ activity.content }}</p>
                                    <p class="timeline-desc">{{ activity.description }}</p>
                                </div>
                                <div class="timeline-time">{{ activity.timestamp }}</div>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card shadow="hover" :body-style="{ height: '400px' }">
                    <div class="card-header">
                        <p class="card-header-title">渠道统计</p>
                        <p class="card-header-desc">最近一个月的订单来源统计</p>
                    </div>
                    <v-chart class="map-chart" :option="mapOptions" />
                </el-card>
            </el-col>
            <el-col :span="7">
                <el-card shadow="hover" :body-style="{ height: '400px' }">
                    <div class="card-header">
                        <p class="card-header-title">排行榜</p>
                        <p class="card-header-desc">销售商品的热门榜单Top5</p>
                    </div>
                    <div>
                        <div class="rank-item" v-for="(rank, index) in ranks">
                            <div class="rank-item-avatar">{{ index + 1 }}</div>
                            <div class="rank-item-content">
                                <div class="rank-item-top">
                                    <div class="rank-item-title">{{ rank.title }}</div>
                                    <div class="rank-item-desc">销量：{{ rank.value }}</div>
                                </div>
                                <el-progress :show-text="false" striped :stroke-width="10" :percentage="rank.percent"
                                    :color="rank.color" />
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from '../components/countup.vue';
import { use, registerMap } from 'echarts/core';
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { barOptions, dashOpt1, dashOpt2, mapOptions } from './chart/options';
import chinaMap from '../utils/china';
import { onMounted, reactive } from 'vue';
import axios from '../utils/request.ts'
import { ElMessage } from 'element-plus';
use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    LineChart,
    PieChart,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    MapChart,
]);
registerMap('china', chinaMap);
interface Statistics {
    user_count: number,
    operation_count: number,
    product_count: number,
    order_count: number,
}

const statistics = reactive({
    user_count: 1213,
    operation_count: 3545,
    product_count: 2318,
    order_count: 4823
});

const activities = reactive([
    {
        content: '收藏商品',
        description: 'xxx收藏了你的商品，就是不买',
        timestamp: '30分钟前',
        color: '#00bcd4',
    },
    {
        content: '用户评价',
        description: 'xxx给了某某商品一个差评，吐血啊',
        timestamp: '55分钟前',
        color: '#1ABC9C',
    },
    {
        content: '订单提交',
        description: 'xxx提交了订单，快去收钱吧',
        timestamp: '1小时前',
        color: '#3f51b5',
    },
    {
        content: '退款申请',
        description: 'xxx申请了仅退款，又要亏钱了',
        timestamp: '15小时前',
        color: '#f44336',
    },
    {
        content: '商品上架',
        description: '运营专员瞒着你上架了一辆飞机',
        timestamp: '1天前',
        color: '#009688',
    },
]);

const ranks = reactive([
    {
        title: '手机',
        value: 10000,
        percent: 90,
        color: '#f25e43',
    },
    {
        title: '电脑',
        value: 8000,
        percent: 70,
        color: '#00bcd4',
    },
    {
        title: '相机',
        value: 6000,
        percent: 60,
        color: '#64d572',
    },
    {
        title: '衣服',
        value: 5000,
        percent: 55,
        color: '#e9a745',
    },
    {
        title: '书籍',
        value: 4000,
        percent: 50,
        color: '#009688',
    },
]);

onMounted(() => {
    fetchData();
});

const handeledashOpt1 = async () => {
    try {
        const res = await axios.get(`/order/dashDate`)
        const response = res.data;

        if (response && response.length > 0) {
            dashOpt1.series[0].data = response[0];
            dashOpt1.series[1].data = response[1];
            ElMessage.success('handeledashOpt1成功');
        } else {
            ElMessage.error('handeledashOpt1失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const handeledashOpt2 = async () => {
    try {
        const res = await axios.get(`/product/dashDate`)
        const response = res.data;
        if (response && response.length > 0) {
            const transformedData = response.map(item => ({
                name: item.name,
                value: item.value
            }));
            dashOpt2.series[0].data = transformedData;
            ElMessage.success('handeledashOpt2成功');
        } else {
            ElMessage.error('handeledashOpt2失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
}

const handleActivities = async () => {
    try {
        const res = await axios.get(`/operate/topOp`);
        const response = res.data;

        if (response && response.length > 0) {
            const transformedData = response.map(item => ({
                content: item.kind,
                description: item.commend,
                timestamp: item.time,
                color: getRandomColor(),
            }));
            // 直接修改activities的内容
            activities.splice(0, activities.length, ...transformedData);
            ElMessage.success('handleActivities成功');
        } else {
            ElMessage.error('handleActivities失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
};
//mapOptions
const handleMapOptions = async () => {
    try {
        const res = await axios.get(`/order/saleAddress`);
        const response = res.data;
        if (response && response.length > 0) {
            const transformedDa = response.map(item => ({
                name: item.address,
                value: item.total_sales,
            }));
            mapOptions.series[0].data = transformedDa
            ElMessage.success('handleMapOptions成功');
        } else {
            ElMessage.error('handleMapOptions失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
};

const handleRanks = async () => {
    try {
        const res = await axios.get(`/order/topSales`);
        const response = res.data;

        if (response && response.length > 0) {
            const transformedData = response.map(item => ({
                title: item.category,
                value: item.total_sales,
                percent: item.total_sales/item.div,
                color: getRandomColor(),
            }));
            // 直接修改activities的内容
            ranks.splice(0, ranks.length, ...transformedData);
            ElMessage.success('handleRanks成功');
        } else {
            ElMessage.error('handleRanks失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
};
//statistics
const handleStatistics = async () => {
    try {
        const res = await axios.get(`/statistics/latest`);
        const response = res.data;

        if (response && response.length > 0) {
            statistics.user_count = response[0].userCount
            statistics.operation_count = response[0].operationCount
            statistics.product_count = response[0].productCount
            statistics.order_count = response[0].orderCount
            console.log(statistics)
            ElMessage.success('handleStatistics成功');
        } else {
            ElMessage.error('handleStatistics失败');
        }
    } catch (error) {
        ElMessage.error(error + "sdasd");
    }
};
const fetchData = async () => {
    try {
        await Promise.all([handeledashOpt1(), handeledashOpt2(), handleActivities(), handleMapOptions(), handleRanks(), handleStatistics()]);
        console.log('All data fetched successfully');
    } catch (error) {
        console.error('Error in fetching data:', error);
    }
}

// fetchData();
</script>

<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
}
</style>
<style scoped>
.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
}

.card-num {
    font-size: 30px;
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.bg1 {
    background: #2d8cf0;
}

.bg2 {
    background: #64d572;
}

.bg3 {
    background: #f25e43;
}

.bg4 {
    background: #e9a745;
}

.color1 {
    color: #2d8cf0;
}

.color2 {
    color: #64d572;
}

.color3 {
    color: #f25e43;
}

.color4 {
    color: #e9a745;
}

.chart {
    width: 100%;
    height: 400px;
}

.card-header {
    padding-left: 10px;
    margin-bottom: 20px;
}

.card-header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-header-desc {
    font-size: 14px;
    color: #999;
}

.timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #000;
}

.timeline-time,
.timeline-desc {
    font-size: 12px;
    color: #787878;
}

.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.rank-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f2f2f2;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
}

.rank-item-content {
    flex: 1;
}

.rank-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343434;
    margin-bottom: 10px;
}

.rank-item-desc {
    font-size: 14px;
    color: #999;
}

.map-chart {
    width: 100%;
    height: 350px;
}
</style>
