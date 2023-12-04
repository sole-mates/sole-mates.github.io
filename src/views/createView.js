import { html } from '../../lit-html/lit-html.js'
import { createShoe } from '../api/data.js'
import { addOwner } from '../api/queries.js'
import { createSubmitHandler } from './utils.js'

const createTemplate = (onSubmit, error) => html`
<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand"/>
      <input type="text" name="model" id="shoe-model" placeholder="Model"/>
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url"/>
      <input type="text" name="release" id="shoe-release" placeholder="Release date"/>
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer"/>
      <input type="text" name="value" id="shoe-value" placeholder="Value"/>
      ${error ? html`<p class='error' >${error}</p>` : null}
      <button type="submit">post</button>
    </form>
  </div>
</section>`

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)))

  async function onCreate(formData) {
    let error = ''
    if (Object.values(formData).some(key => key === '')) {
      error = 'All fields are required!'
      ctx.render(createTemplate(createSubmitHandler(onCreate), error))
      return
    }
    const { brand, model, imageUrl, release, designer, value } = formData;
    const data = addOwner({ brand, model, imageUrl, release, designer, value })
    const newShoe = await createShoe(data);
    console.log(newShoe)
    ctx.page.redirect('/dashboard')
  }
}