import Taro, { Component } from '@tarojs/taro'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'

import './index.scss'

export default class Npick extends Component {
  constructor(props) {
    super(props)
    console.log('constructor props', this.props)
    this.state = {
      value: [],
      dataList: [],
    }

    this.handlePrpos()
  }

  componentWillReceiveProps (nextProps) {
    console.log('this.componentWillReceiveProps')
    this.handlePrpos(nextProps)
  }

  handlePrpos(nextProps = this.props) {
    let data = nextProps.data
    let dataList = []
    let value = []

    console.log('....props...', this.props)
    data.map((item, index) => {
      let tmpList = []
      value.push(item.min)
      for (let i = item.min; i <= item.max; i+=item.step) {
        tmpList.push(i)
        dataList[index] = tmpList
      }
    })

    this.setState({
      value: value,
      dataList: dataList,
    })
  }

  onChange = e =>{
    const val = e.detail.value
    this.setState({
      value: val,
    })

    if (_isFunction(this.props.onChange) && !this.props.disabled) {
      this.props.onChange(e)
    }
  }

  render() {
    const dataList = this.state.dataList
    console.log('render props', this.props)
    return (
      <View>
        <PickerView indicatorClass='indicator' className='picker' value={this.state.value} onChange={this.onChange}>
          {dataList && dataList.map((litem, index) =>
            <PickerViewColumn className='column' key={'pick'+index}>
              {litem.map((item, idx) =>
                <View key={'pick-item'+idx}>{item}</View>)
              }
            </PickerViewColumn>
            )
          }
        </PickerView>
      </View>
    )
  }
}

Npick.defaultProps = {
  onChange: () => {},
  data: [],
}

Npick.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }))
}
