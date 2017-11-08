import {h, Component} from 'composi'

function sumUp(rows) {
  let total = 0
  rows.forEach((row) => {
    total += row.price * row.quantity
  })
  return total
}


function TableHeader() {
  return (
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
      <th></th>
    </tr>
  )
}

function TableRow({row, idx}) {
  return (
    <tr>
      <td>{row.product}</td>
      <td>
        <input class='price' data-index={String(idx)} type='number' min='0' value={row.price.toFixed(2)}/>
      </td>
      <td>
        <input class='quantity' data-index={String(idx)} type='number' min='0' value={row.quantity}/>
      </td>
      <td>
        <span class='total'>${(row.price * row.quantity).toFixed(2)}</span>
      </td>
      <td>
        <button data-index={idx} class='list-item__button--delete'>X</button>
      </td>
    </tr>
  )
}

function TableFooter({rows}) {
  return (
    <tfoot>
      <tr>
        <td colspan='3'>Sum:</td>
        <td colspan='2'>
          <span class='total'>${sumUp(rows).toFixed(2)}</span>
        </td>
      </tr>
    </tfoot>
  )
}

function NewRowForm() {
  return (
    <div id='newRowForm'>
      <p>
        <label for="product">Product: </label>
        <input name='product' id='product' type="text" tabindex='1' />
      </p>
      <p>
        <label for="price">Price: </label>
        <input name='price' id='price' type="text" tabindex='2' />
      </p>
      <p>
        <label for="quantity">Quantity: </label>
        <input name='quantity' id='quantity' type="text" tabindex='3' />
      </p>
      <p>
        <button id='addRow'>Add Row</button>
      </p>
    </div>
  )
}

function Spreadsheet({rows}) {
  return (
    <li class='list--spreadsheet__item'>
      <table id='spreadsheet'>
        <TableHeader/>
        {
          rows.map((row, idx) => (
            <TableRow {...{row, idx}}/>
          ))
        }
        <TableFooter {...{rows}}/>
      </table>
    </li>
  )
}

function AddNewRow() {
  return (
    <li class='list--spreadsheet__item'>
      <NewRowForm/>
    </li>
  )
}

export class SpreadSheet extends Component{
  render(rows) {
    return (
      <ul class='list--spreadsheet'>
        <Spreadsheet {...{rows}}/>
        <AddNewRow/>
      </ul>
    )
  }

  addNewRow(e) {
    const productInput = this.element.querySelector('#product')
    const priceInput = this.element.querySelector('#price')
    const quantityInput = this.element.querySelector('#quantity')
    const product = productInput.value
    const price = Number(priceInput.value) || 0
    const quantity = Number(quantityInput.value) || 0
    productInput.value = ''
    priceInput.value = ''
    quantityInput.value = ''
    const state = this.state
    if (product) {
      state.push({product, price, quantity})
      this.state = state
    } else {
      alert('Please provide a product name before trying to add a row.')
    }
  }

  deleteRow(e) {
    const index = e.target.dataset.index
    console.log(index)
    const state = this.state
    state.splice(index, 1)
    this.state = state
  }

  updateQuantity(e) {
    const index = e.target.dataset.index
    const value = Number(e.target.value)
    const state = this.state
    state[index].quantity = value
    this.state = state
  }

  updatePrice(e) {
    const index = e.target.dataset.index
    const value = Number(e.target.value)
    const state = this.state
    state[index].price = value
    this.state = state
  }

  handleEvent(e) {
    e.target.id === 'addRow' && this.addNewRow(e)
    e.target.className === 'list-item__button--delete' && this.deleteRow(e)
    e.target.className === 'quantity' && this.updateQuantity(e)
    e.target.className === 'price' && this.updatePrice(e)
  }

  componentWasCreated() {
    this.element.addEventListener('click', this)
    this.element.addEventListener('input', this)
  }
}