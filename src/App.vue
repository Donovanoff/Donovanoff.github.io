<template>
  <div id="app">
    <div class="container">
      <div class="controls" >
        <input type="text" v-model="todoText">
        <input @click.prevent="addItem" type="submit">
      </div>

      <Tree :model="treeData" />
      
      <item class="item" :model="treeData"  @list-updated="hi"></item>
    </div>
  </div>
</template>

<script>
import List from './components/List'
import Tree from './components/Tree'
import item from './components/Item'

var data = {
  id:14234234324,
  name: 'TODO Tree',
  children: [
    
  ]
}

export default {
  components:{
    List,
    Tree,
    item
  },
  name: 'app',
  data () {
    return {
     treeData:data,
     todoText:''
    }
  },

  methods:{
        hi(){
          this.$emit('update-tree')
        },

        randomIdGenerator(){
            let max = 9;
            let min = 0;
            let count = 10;
            let id = ''
            let rand;

            for(let i = 0;i < count;i++){
                rand = min - 0.5 + Math.random() * (max - min + 1)
                rand = Math.round(rand);
                id+=rand;
            }

            this.todoItems.forEach(item => {
                if(item.id === id){
                    id = '';
                    for(let i = 0;i < count;i++){
                        rand = min - 0.5 + Math.random() * (max - min + 1)
                        rand = Math.round(rand);
                        id+=rand;
                    }
                    return id;
                }
            })

            return id;
        },

        addItem(){
          if(this.todoText.length > 0){
            this.treeData.children.push({name:this.todoText});
            this.$emit('update-tree')
            this.todoText = '';
          }
          
        }
    }
}
</script>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
    background: #F2F2F2;
    font-family: Arial,sans-serif;
    position: relative;

    // &:before{
    //   content: '';
    //   display: block;
    //   width: 6px;
    //   height: 100%;
    //   min-height: 100vh;
    //   background: black;
    //   position: absolute;
    //   left:50%;
    //   top:0;
    //   transform: translate(-50%,0)
    // }
  }

  .container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    
  }

  .wrapper{
        width: 50%;
  }


</style>
