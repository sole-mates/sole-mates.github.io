import { html } from '../../lit-html/lit-html.js'
import { deleteShoe, getItemById } from '../api/data.js';
import { getUserData } from './utils.js';

const detailsTemplate = (data, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
           <img src=${data.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
           <p>Brand: <span id="details-brand">${data.brand}</span></p>
           <p>
        Model: <span id="details-model">${data.model}</span>
           </p>
           <p>Release date: <span id="details-release">${data.release}</span></p>
           <p>Designer: <span id="details-designer">${data.designer}</span></p>
           <p>Value: <span id="details-value">${data.value}</span></p>
        </div>
      ${data.owner == true ? html`
      <div id="action-buttons">
          <a href="/edit/${data.objectId}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>` : ''}
    </div>
</section>`

export async function detailsPage(ctx) {
  const itemId = ctx.params.id;
  const itemData = await getItemById(itemId);
  const user = getUserData();

  if (user && user.objectId === itemData.ownerId.objectId) {
    itemData.owner = true;
  }
  ctx.render(detailsTemplate(itemData, onDelete))

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
      await deleteShoe(itemId);
      ctx.page.redirect('/dashboard')
    }
  }
}