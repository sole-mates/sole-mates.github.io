import { html } from '../../lit-html/lit-html.js'
import { editShoeById, getItemById } from '../api/data.js'
import { addOwner } from '../api/queries.js'
import { createSubmitHandler } from './utils.js'

const editTemplate = (data, onSubmit) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input type="text" name="brand" .value=${data.brand} id="shoe-brand" placeholder="Brand"/>
              <input type="text" name="model" .value=${data.model} id="shoe-model" placeholder="Model"/>
              <input type="text" name="imageUrl" .value=${data.imageUrl} id="shoe-img" placeholder="Image url"/>
              <input type="text" name="release" .value=${data.release} id="shoe-release" placeholder="Release date"/>
              <input type="text" name="designer" .value=${data.designer} id="shoe-designer" placeholder="Designer"/>
              <input type="text" name="value" .value=${data.value} id="shoe-value" placeholder="Value"/>
              <button type="submit">post</button>
            </form>
          </div>
        </section>`

export async function editPage(ctx) {
  const itemId = ctx.params.id
  const itemData = await getItemById(itemId);
  ctx.render(editTemplate(itemData, createSubmitHandler(onEdit)))

  async function onEdit(formData) {
    if (Object.values(formData).some(key => key === '')) {
      return alert('All fields are required!')
    }
    const { brand, model, imageUrl, release, designer, value } = formData;
    const data = addOwner({ brand, model, imageUrl, release, designer, value })
    await editShoeById(itemId, data);
    ctx.page.redirect(`/details/${itemId}`)
  }
}