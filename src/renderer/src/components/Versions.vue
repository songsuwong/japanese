<script setup>
import { reactive, ref } from 'vue'
import json from './../script/importWordCsv.js'
const chinese = ref('')
const japanese = ref('')
const hiragana = ref('')
const excludeList = ref({})

function randomTopic() {
  var newIndex = Math.floor(Math.random() * json.wordJson.length)
  var topic = json.wordJson[newIndex]
  chinese.value = topic['中文']
  japanese.value = topic['日文']
  hiragana.value = topic['平假名讀音']
}

async function exclude() {
  await json.excludeJson({
    '中文': chinese.value,
    '日文': japanese.value,
    '平假名讀音': hiragana.value
  });
  excludeList.value = await json.getExcludeJson()
  
}

</script>

<template>

  <label for="name">中文</label>
  <input type="text" :value = 'chinese'/>
  <label for="name">日文</label>
  <input type="text" :value = 'japanese'/>
  <label for="name">平假名讀音</label>
  <input type="text" :value = 'hiragana'/>
  <button type="button" @click="randomTopic">刷新題目</button>
  <button type="button" @click="exclude">加入排除</button>
  <textarea rows="10" cols="33">{{ excludeList }}</textarea>
</template>
