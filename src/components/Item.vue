<template>
    <div>
    <li class="root">
        <div
            :class="{bold: isFolder}"
            @click="toggle"
            @dblclick="changeType">
            {{ model.name }}
            <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <item
            class="item"
            v-for="(model, index) in model.children"
            :key="index"
            :model="model">
            </item>
            <li class="add" @click="addChild"></li>
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
        open: true
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
        
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
        this.$emit('list-updated');
      this.$emit('update-tree');

      }
    },
    changeType: function () {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
        this.$emit('update-tree');
        this.addChild()
        this.open = true
        this.$emit('list-updated');
        this.$emit('update-tree');
      }
      
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })

      this.$emit('list-updated');
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
  padding-left: 1em;
  line-height: 1.5em;
  list-style: disc;
  text-align: left;
}

.root{
    list-style: none;
    width: 100%;
    
}

.root div{
  
  font-size: 30px;
  cursor: pointer;
}

.add{
  margin-top: 10px;
  font-size: 30px;
}
</style>
