import {h, Component} from 'composi'
import {title} from './components/title'
import {SpreadSheet} from './components/spreadsheet'
import {fruitData} from './data'

title.state = 'Composi Spreadsheet'

// Create spreadsheet instance:
const spreadsheet = new SpreadSheet({
  container: 'section',
  state: fruitData
})