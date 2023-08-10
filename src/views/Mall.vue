<template>
  
  <tabelTemplatVue :rules="rules"/>
</template>
<script>
import { getGoods, addMall, editMall, delMall } from "../api";
import tabelTemplatVue from './tabelTemplat.vue';
export default {
  data() {
    return { 
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        types: [
          { required: true, message: "商品类型不能为空", trigger: "blur" },
        ],
        model: [
          { required: true, message: "商品型号不能为空", trigger: "change" },
        ],
        price: [
          { required: true, message: "商品售价不能为空", trigger: "blur" },
        ],
        number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  components:{
    tabelTemplatVue
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
    // getModel(val){
    //     // console.log(val,"value");
    //     if(val === "sofa"){
    //         this.form.model="沙发"
    //     }else if(val === "tea table"){
    //       this.form.model="茶几"
    //     }else if(val === "bedside table"){
    //       this.form.model="床头柜"
    //     }else if(val === "mattress"){
    //       this.form.model="床垫"
    //     }else if(val === "bed"){
    //       this.form.model="床"
    //     }

    // }
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

