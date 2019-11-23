import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import NPick from '../../components/n-pick/index'

import './index.scss'

class Index extends Component {

  state = {
    data: [
      {
        min: 0,
        max: 10,
        step: 2,
      },
      {
        min: 1,
        max: 20,
        step: 1,
      },
    ],
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  onChange(e) {
    const data = this.state.data
    console.log (
      data[0].min + (e.detail.value[0]*data[0].step),
      data[1].min + (e.detail.value[1]*data[1].step)
    )
  }

  render () {
    return (
      <View>
        <NPick
          onChange={this.onChange.bind(this)}
          data={this.state.data}
        >
        </NPick>
      </View>
    )
  }
}

export default Index