<template>
    <div>
    <li class="root">
        <div
            :class="{bold: isFolder,folder:isFolder,plus:!open,minus:open}"
            @click="toggle"
            @dblclick="changeType">
            <span :class="{done:done}">{{ model.name }}</span>
            <span v-if="isFolder" class="folder-heading">ITEM WITH DEPENDENCIES</span>
            <span v-if="!isFolder" class="folder-heading">DOUBLE CLICK TO ADD DEPENDENT</span>
            <input @click.stop="changeItem" v-model="done" type="checkbox" class="checkbox-done">
        </div>
        
        
        <ul v-show="open" v-if="isFolder">

            <div class="item-container">
            <item
              class="item"
              v-for="(model, index) in model.children"
              :key="index"
              :model="model" 
              @list-updated="$emit('list-updated')">
            </item>

            </div>
            

            <!-- <button class="show-adding" @click="addingShow = !addingShow">{{addingMessage}}</button> -->
            
            <div class="adding-container" v-show="addingShow"><input type="text" v-model="todoText"><button @click="addChild">add</button></div>
        </ul>
        
    </li>
    </div>
</template>
<script>

export default {
    name:'item',

    props: {
    model: Object
  },
  data: function () {
    return {
        open: true,
        todoText:'',
        addingShow:true,
        done:false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children //&& this.model.children.length
    },
    addingMessage:function(){
       return this.addingShow ? 'Hide Adding' : 'Show Adding'
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        this.$set(this.model, 'children', []);
        this.addChild();
        this.open = true;
      }
      
    },
    addChild: function () {
        if(this.todoText.length > 0){

          // this.model.children.forEach((item) => {
          //   if(item.name == ''){
          //     this.model.children.splice(this.model.children.indexOf(item),1);
          //   }
          // })

          this.model.children.push({
            name: this.todoText
          })

          this.todoText = '';
          this.$emit('list-updated');
        }
      
        
    },

    typeChanged(){
        this.model.children.push({
          name: this.todoText
        })

        
        this.$emit('list-updated');
    },

    changeItem(){
      console.log(this.done);
    },

    removeItem(){
     delete(this.model)
    }
  }
}
</script>

<style>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}

.bold {
  font-weight: bold;
}
ul {
  padding-left: 1.5em;
  line-height: 1.5em;
  text-align: left;
}

.root{
    list-style: none;
    width: 100%;
    
}

.root div{
  font-size: 30px;
}

.add{
  margin-top: 10px;
  font-size: 30px;
}

.folder{
  color: red;
  margin: 15px 0;
  cursor: pointer;
}

.plus:before{
  content: '+';
}

.minus:before{
  content: '-';
}

.show-adding{
  margin: 20px 0 0;
}

.item{
  margin: 10px 0px;
  transition: all .3s;
  padding-left: 15px;
}

.deleting{
  color:red;
}

input[type=text]{
  
  border:none;
  border-bottom: 1px solid black;
  background: none;
  outline: none;
  height: 20px;
  box-sizing: border-box;
}

button{
  margin: 0 10px;
  border: none;
  background: none;
  width: 100px;
  
  outline: none;
  cursor: pointer;
  background: #6200EE;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  transition: .3s;
}

button:hover{
  background: #208E79;
}

.adding-container{
  display: flex;
  padding: 15px;
  width: 300px;
  justify-content: space-between;
}

.folder-heading{
  font-size: 16px;
  text-transform: uppercase;
  color: #000;
  font-weight: bold;
}

.done{
  text-decoration: line-through;
}

.checkbox-done{
  display: inline-block;
  position: relative;
  top: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 5;
}
</style>
