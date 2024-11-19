Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myid: {
      type: Number,
      value: 0 // 唯一编号
    },
    title: {
      type: String,
      value: "default-name" // 初始标题
    },
    per_value: {
      type: Number,
      value: 0 // 初始每单位价格
    },
    total_price: {
      type: Number,
      value: 0 // 初始总价
    },
    cnt: {
      type: Number,
      value: 1 // 初始数量
    },
    value: {
      type: Number,
      value: 0 // 初始单价
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    localPerValue: 0,    // 本地存储每单位价格
    localTotalPrice: "", // 本地存储总价，初始化为空字符串
    localCnt: "",        // 本地存储数量，初始化为空字符串
    localValue: ""       // 本地存储单价，初始化为空字符串
  },

  lifetimes: {
    // 生命周期：初始化时同步父组件传入的值到子组件内部
    attached() {
      this.setData({
        localPerValue: this.properties.per_value,
        localTotalPrice: this.properties.total_price === 0 ? "" : this.properties.total_price,
        localCnt: this.properties.cnt === 0 ? "" : this.properties.cnt,
        localValue: this.properties.value === 0 ? "" : this.properties.value
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete() {
      console.log("hhhdelete");
      console.log(this.data.localCnt);
      this.triggerEvent("delete", { myid: this.properties.myid });
    },
   
    // 实时监听单价输入
    onValueInput(e) {
      const value = e.detail.value === "" ? 0 : parseFloat(e.detail.value); // 空值处理为 0
      this.setData({
        localValue: e.detail.value // 保留输入框显示为空
      });
      this.calculateTotalPrice(); // 重新计算总价
    },

    // 实时监听数量输入
    onCntInput(e) {
      const cnt = e.detail.value === "" ? 0 : parseInt(e.detail.value); // 空值处理为 0
      this.setData({
        localCnt: e.detail.value // 保留输入框显示为空
      });
      this.calculateTotalPrice(); // 重新计算总价
    },

    // 实时监听总价输入
    onPriceInput(e) {
      const price = e.detail.value === "" ? 0 : parseFloat(e.detail.value); // 空值处理为 0
      this.setData({
        localTotalPrice: e.detail.value // 保留输入框显示为空
      });
      this.calculateTotalPrice(); // 重新计算总价
    },

    // 计算总价和每单位价格
    calculateTotalPrice() {
      const value = parseFloat(this.data.localValue) || 0;
      const cnt = parseFloat(this.data.localCnt) || 0;
      const totalPrice = parseFloat(this.data.localTotalPrice) || 0;

      // 防止除以 0
      if (value === 0 || cnt === 0) {
        this.setData({
          localPerValue: 0 // 设置每单位价格为 0
        });
        return;
      }

      const perValue = (totalPrice / value).toFixed(2); // 计算每单位价格
      console.log("每单位价格:", perValue);

      this.setData({
        localPerValue: perValue // 更新每单位价格
      });
     
    }
    ,
    onBlur() {
      this.triggerEvent("update", {
        myid: this.properties.myid,
        per_value: this.data.localPerValue
      });
    }
  }
});
