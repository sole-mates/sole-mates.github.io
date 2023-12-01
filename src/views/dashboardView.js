import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllItems } from '../api/data.js'

const dashboardTemplate = (data) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    ${data.length === 0 ? html`<h2>There are no items added yet.</h2>`
        : null}
    <ul class="card-wrapper">
      ${data.map(itemCard)}
    </ul>          
</section>`

const itemCard = (data) => html`
<li class="card">
    <img src=${data.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${data.brand}</span>
    </p>
    <p><strong>Model: </strong><span class="model">${data.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
    <a class="details-btn" href="/details/${data._id}">Details</a>
</li>`

export async function dashboardPage(ctx) {
    const allProducts = await getAllItems();
    ctx.render(dashboardTemplate(allProducts))
}
