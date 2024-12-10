<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :currentPage="page.index" :total="page.total"
                :viewFunc="handleView" :delFunc="handleDelete" :editFunc="handleEdit" :changePageFunc="handlePage">
                <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template>
            </TableCustom>

        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <template v-if="isEdit">
                <!-- 编辑时显示的内容 -->
                <TableEdit :form-data="rowData" :options="options" :edit="true" :update="updateData" />
            </template>
            <template v-else>
                <!-- 新增时显示的内容 -->
                <TableEdit :form-data="rowData" :options="options" :edit="true" :update="addData" />
            </template>
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData"></TableDetail>
            <br />

        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { Order } from '../../types/order';
import TableCustom from '../../components/table-custom.vue';
import TableDetail from '../../components/table-detail.vue';
import TableSearch from '../../components/table-search.vue';
import { FormOption, FormOptionList } from '../../types/form-option';
import axios from '../../utils/request.ts'
import router from '@/router/index.ts';
import { ProductStore } from '../../store/product.ts';

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '订单：', prop: 'name' }
])
const handleSearch = async () => {
    ElMessage.success('handleSearch :' + query.name);
    if (query.name.length > 0) {
        try {
            const res = await axios.get(`/order/find?query=${query.name}&&page=1`)
            const response = res.data;
            if (response.code === 0) {
                tableData.value = response.data.records;
                page.total = response.data.total
                ElMessage.error('模糊查询成功');
            } else {
                ElMessage.error('模糊查询失败');
            }
        } catch (error) {
            ElMessage.error(error);
        }
    }
    // changePage(1);
}

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'uid', label: '订单' },
    { prop: 'productId', label: '服装id' },
    { prop: 'number', label: '数量' },
    { prop: 'address', label: '订单地址' },
    { prop: 'status', label: '订单状态' },
    { prop: 'phone', label: '联系人电话' },
    { prop: 'month', label: '月份' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 100,
})
const tableData = ref<Order[]>([
    {
        id: 1,
        uid: '连衣裙',
        productId: 100,
        number: 1000,
        address: '浙江',
        status: '运输中',
        phone: '1846135456',
        month: 'Jun',
    },
    {
        id: 2,
        uid: '羽绒服',
        productId: 5,
        number: 500,
        address: '湖南',
        status: '运输中',
        phone: '123546462',
        month: 'Dev',
    },
]);
const getData = async () => {
    ElMessage.success('getData');
    try {
        const res = await axios.get('/order/find?page=' + page.index)
        const response = res.data;
        if (response.code === 0) {
            tableData.value = response.data.records;
            page.total = response.data.total
        } else {
            ElMessage.error(response.message);
        }
    } catch (error) {
        ElMessage.error(error);
    }
};
getData();

const changePagee = () => {
    console.log('changePage');
    getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '服装id', prop: 'productId', required: true },
        { type: 'input', label: '数量', prop: 'number', required: true },
        { type: 'input', label: '订单地址', prop: 'address', required: true },
        { type: 'input', label: '订单状态', prop: 'status', required: true },
        { type: 'input', label: '联系人电话', prop: 'phone', required: true },
        { type: 'input', label: '月份', prop: 'month', required: true },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Order) => {
    ElMessage.success('handleEdit');
    rowData.value = { ...row };
    console.log(rowData.value)
    isEdit.value = true;
    visible.value = true;
};
const addData = async (row: Order) => {
    ElMessage.success('addData');
    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/order/insert',rowData.value)
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success(response.message);
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
    getData();
}
const updateData = async (row: Order) => {
    ElMessage.success('updateData');
    console.log(row.id)
    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/order/update',rowData.value)
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success(response.message);
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
    closeDialog();
    getData();
};

const closeDialog = () => {
    ElMessage.success('closeDialog');
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});
const handleView = (row: Order) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        { prop: 'id', label: '订单ID',},
        { prop: 'uid', label: '订单', },
        { prop: 'productId', label: '服装id', },
        { prop: 'number', label: '数量' },
        { prop: 'address', label: '订单地址' },
        { prop: 'status', label: '订单状态' },
        { prop: 'phone', label: '联系人电话' },
        { prop: 'month', label: '月份' },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Order) => {
    ElMessage.success('删除成功');
    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/order/delete', rowData.value)
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success(response.message);
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    }
    getData();
}

const handlePage = async (val: number) => {
    ElMessage.success('handlePage :' + val);
    if (query.name.length > 0) {
        try {
            const res = await axios.get(`/order/find?query=${query.name}&&page=${val}`)
            const response = res.data;
            if (response.code === 0) {
                tableData.value = response.data.records;
                page.total = response.data.total
                page.index = val;
            } else {
                ElMessage.success('模糊查询成功');
            }
        } catch (error) {
            ElMessage.error(error);
        }
    } else {
       try {
        const res = await axios.get('/order/find?page=' + val)
        const response = res.data;
        if (response.code === 0) {
            ElMessage.success(response.message);
            tableData.value = response.data.records;
            page.total = response.data.total
            page.index = val;
        } else {
            ElMessage.error("服务端错误");
        }
    } catch (error) {
        ElMessage.error(error);
    } 
    }
}

</script>

<style scoped></style>