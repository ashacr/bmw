export default {
    getDataList: () => fetch("./data.json").then(res => res.json())
  };