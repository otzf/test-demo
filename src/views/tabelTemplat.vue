
<template>
  <div class="message">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        :inline="true"
        :before-close="handleClose"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="types">
          <el-input
            v-model="form.types"
            placeholder="请输入商品类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品型号" prop="model">
          
          <el-select v-model="form.model" placeholder="请选择商品型号" @change ="getModel">
            <el-option label="沙发" value="sofa"></el-option>
            <el-option label="茶几" value="tea table"></el-option>
            <el-option label="床头柜" value="bedside table"></el-option>
            <el-option label="床垫" value="mattress"></el-option>
            <el-option label="床" value="bed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品售价" prop="price">
          <el-input
            v-model="form.price"
            placeholder="请输入商品售价"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="number">
          <el-input-number v-model="form.number" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="进货时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="handleAdd()">+新增</el-button>
      <!-- 查询按钮 -->
      <el-form ref="form" :model="mallForm" :inline="true">
        <el-form-item placeholder="请输入查询的商品名">
          <el-input v-model="mallForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ser()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="90%" style="width: 100%" stripe>
        <el-table-column prop="name" label="商品名称"> </el-table-column>
        <el-table-column prop="types" label="类型"> </el-table-column>
        <el-table-column prop="model" label="型号"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="number" label="数量"> </el-table-column>
        <el-table-column prop="date1" label="进货日期"></el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="clickEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="ClickDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChange"
          class="pager"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoods, addMall, editMall, delMall } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      pageDate: {
        page: 1,
        limit: 10,
      },
      defaultForm: {
        name: "",
        types: "",
        model: "",
        price: "",
        number: 1,
        date1: "",
      },
      form: {
        name: "",
        types: "",
        model: "",
        price: "",
        number: 1,
        date1: "",
      },
      
      total: 0,
      modelType: 0,
      mallForm: {
        name: "",
      },
    };
  },
  props:{
    rules:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods: {
    handleAdd() {
      this.modelType = 0;
      this.form = {...this.defaultForm}
      this.form.id = ''
      this.$refs.form.resetFields()
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addMall(this.form).then(() => {
              this.getList();
              this.form=this.defaultForm
            });
          } else {
            editMall(this.form).then(() => {
              this.getList();
            });
          }
          console.log(this.form.model);
          this.resetForm();
        }
      });
    },

    handleClose() {
      this.resetForm();
    },
    // 专门重置
    resetForm() {
      // 重置表单
      this.$refs.form.resetFields();
      // 关闭窗口
      this.dialogVisible = false;
    },
    cancel() {
      this.resetForm();
    },
    getList() {
      getGoods({ params: { ...this.pageDate, ...this.mallForm } }).then(
        ({ data }) => {
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    handleChange(val) {
      this.pageDate.page = val;
      this.getList();
    },
    clickEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    ClickDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMall({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ser() {
      this.getList();
    },
    getModel(val){
        // console.log(val,"value");
        if(val === "sofa"){
            this.form.model="沙发"
        }else if(val === "tea table"){
          this.form.model="茶几"
        }else if(val === "bedside table"){
          this.form.model="床头柜"
        }else if(val === "mattress"){
          this.form.model="床垫"
        }else if(val === "bed"){
          this.form.model="床"
        }

    }
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.message {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: 100%;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>

