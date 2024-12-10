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
            <el-button type="success" round @click="viewDetail">查看详情页</el-button>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { Product } from '../../types/product';
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
    { type: 'input', label: '服装名：', prop: 'name' }
])
const handleSearch = async () => {
    ElMessage.success('handleSearch :' + query.name);
    if (query.name.length > 0) {
        try {
            const res = await axios.get(`/product/find?query=${query.name}&&page=1`)
            const response = res.data;
            if (response.code === 0) {
                tableData.value = response.data.records;
                page.total = response.data.total
            } else {
                ElMessage.success('模糊查询成功');
            }
        } catch (error) {
            ElMessage.error(error);
        }
    } else {
        getData();
    }
    // changePage(1);
}

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'name', label: '服装名' },
    { prop: 'price', label: '价格' },
    { prop: 'stock', label: '库存数' },
    { prop: 'quality', label: '质量' },
    { prop: 'color', label: '颜色' },
    { prop: 'description', label: '评价' },
    { prop: 'category', label: '类别' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 100,
})
const tableData = ref<Product[]>([
    {
        id: 1,
        name: '连衣裙',
        price: 100,
        stock: 1000,
        quality: 1,
        color: '红',
        description: 'good',
        imageUrl: 'https://wallhaven.cc/w/2yxp16',
        category: '套装'
    },
    {
        id: 2,
        name: '连衣裙',
        price: 166,
        stock: 20000,
        quality: 2,
        color: '红',
        description: 'good',
        imageUrl: 'https://wallhaven.cc/w/p9pz89',
        category: '套装'
    },
]);
const getData = async () => {
    ElMessage.success('getData');
    try {
        const res = await axios.get('/product/find?page=' + page.index)
        const response = res.data;
        if (response.code === 0) {
            tableData.value = response.data.records;
            page.total = response.data.total
        } else {
            ElMessage.success(response.message);
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
        { type: 'input', label: '服装名', prop: 'name', required: true },
        { type: 'input', label: '价格', prop: 'price', required: true },
        { type: 'input', label: '库存数', prop: 'stock', required: true },
        { type: 'input', label: '质量', prop: 'quality', required: true },
        { type: 'input', label: '评价', prop: 'description', required: true },
        { type: 'input', label: '类别', prop: 'category', required: true },
        { type: 'input', label: '颜色', prop: 'color', required: true },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Product) => {
    ElMessage.success('handleEdit');
    rowData.value = { ...row };
    console.log(rowData.value)
    isEdit.value = true;
    visible.value = true;
};
const addData = async (row: Product) => {
    ElMessage.success('addData');

    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/product/insert', rowData.value)
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
const updateData = async (row: Product) => {
    ElMessage.success('updateData');
    console.log(row.id)
    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/product/update', rowData.value)
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
    viewData.value.list = [];
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});
const handleView = (row: Product) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '用户ID',
        },
        {
            prop: 'name',
            label: '服装名',
        },
        {
            prop: 'price',
            label: '价格',
        },
        {
            prop: 'stock',
            label: '库存数',
        },
        {
            prop: 'quality',
            label: '质量',
        },
        {
            prop: 'color',
            label: '颜色',
        },
        { prop: 'description', label: '评价' },
        { prop: 'category', label: '类别' },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Product) => {
    ElMessage.success('删除成功');
    rowData.value = { ...row };
    console.log(rowData.value)
    try {
        const res = await axios.post('/product/delete', rowData.value)
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
            const res = await axios.get(`/product/find?query=${query.name}&&page=${val}`)
            const response = res.data;
            if (response.code === 0) {
                tableData.value = response.data.records;
                page.total = response.data.total;
                page.index = val;
            } else {
                ElMessage.success('模糊查询成功');
            }
        } catch (error) {
            ElMessage.error(error);
        }
    } else {
        try {
            const res = await axios.get('/product/find?page=' + val)
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

const viewDetail = () => {
    ElMessage.success('viewDetail');
    ProductStore().setProduct(viewData.value.row)
    router.push('/system-product')
}
</script>

<style scoped></style>