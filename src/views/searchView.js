import { html } from '../../lit-html/lit-html.js'
import { searchByQuery } from '../api/data.js'
import { createSubmitHandler, getUserData } from './utils.js'

const searchTemplate = (onSubmit, data, user) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSubmit} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..."/>
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
            <ul class="card-wrapper">
        ${data && data.length === 0 ? html`<h2>There are no results found.</h2>` : null}
        ${data ? data.map((item) => cardLiTemplate(item, user)) : null}
            </ul>
    </div>
</section>`

const cardLiTemplate = (data, user) => html`
<li class="card">
  <img src=${data.imageUrl} alt=${data.brand} />
  <p>
    <strong>Brand: </strong><span class="brand">${data.brand}</span>
  </p>
  <p>
    <strong>Model: </strong
    ><span class="model">${data.model}</span>
  </p>
  <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
  <a class="details-btn" href="/details/${data.objectId}">Details</a>
</li>`

export async function searchPage(ctx) {
  ctx.render(searchTemplate(createSubmitHandler(onSearch)))

  async function onSearch({ search }, form) {
    if (!search) { return alert("Search field can't be empty!") }
    form.reset();
    const searchData = await searchByQuery(search);
    const searchResults = searchData.results
    console.log(searchResults)
    const user = getUserData()
    ctx.render(searchTemplate(createSubmitHandler(onSearch), searchResults, user))

  }
}