const { Query, User } = AV;
AV.init({
    appId: "RRovdt4PXCCqoYyAUhG6G1Ej-MdYXbMMI",
    appKey: "UnFICdCPPxjY62JPaWurJXpu",
    serverURL: "https://rrovdt4p.api.lncldglobal.com"
});

new Vue({
    el: '#registry_list',
    data(){
        return{
            table_list: [],
            addressBook: "23 Hampshire Dr,\nAPT J,\nNashua, NH 03063",
            isAddressVisible: false
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
      showAddress(){
        this.isAddressVisible = true;
        navigator.clipboard.writeText(this.addressBook)
          .then(() => alert("Address copied to clipboard: \n" + this.addressBook))
          .catch(err => console.error("Error copying address: ", err));
      },
        getList(){
            this.table_list = []
            const queryAll = new AV.Query('Data');
            queryAll.find().then((rows) => {
                for (let row of rows) {
                  this.table_list.push(row.attributes);
            }})
        },
        orderItem(item) {
          if(item.item_id !== 5){
            if (confirm(`Are you sure you want to order: ${item.item_name}?`)) {
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
          }else {
            alert("Order canceled.");
          }
        }else{
          alert("This item is just a display. Contact the couple for more information")
        }
      }
          
    }

})