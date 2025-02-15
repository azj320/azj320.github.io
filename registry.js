const { Query, User } = AV;
AV.init({
    appId: "RRovdt4PXCCqoYyAUhG6G1Ej-MdYXbMMI",
    appKey: "lUnFICdCPPxjY62JPaWurJXpu",
    serverURL: "https://rrovdt4p.api.lncldglobal.com"
});

new Vue({
    el: '#registry_list',
    data(){
        return{
            table_list: []
        };
    },
    computed: {
        sortedTableList() {
          return [...this.table_list].sort((a, b) => a.checked - b.checked);
        }
      },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            this.table_list = []
            const queryAll = new AV.Query('Data');
            queryAll.find().then((rows) => {
                for (let row of rows) {
                  this.tableList.push(row.attributes);
            }})
        },
        orderItem(item) {
            const query = new AV.Query('Data');
            query.equalTo("item_id", item.item_id);
            query.first().then((row) => {
              if (row) {
                row.set("checked", true);
                row.save().then(() => {
                    this.getList();
                  alert(`Ordered: ${item.item_name}`);
                }).catch((error) => {
                  console.error("Error updating order status", error);
                });
              }
            }).catch((error) => {
              console.error("Error finding item", error);
            });
          }
    }

})