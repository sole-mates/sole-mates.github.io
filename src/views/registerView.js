import { registerUser } from "../api/auth.js";
import { createSubmitHandler } from "./utils.js";
import { html } from '../../lit-html/lit-html.js'

const registerTemplate = (onSubmit, error) => html`
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="login-form">
      <input type="text" name="username" id="register-email" placeholder="email"/>
      <input type="password" name="password" id="register-password" placeholder="password"/>
      <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
      ${error ? html`<p class='error'>${error}</p>` : null}
      <button type="submit">login</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)))

  async function onRegister({ username, password, ["re-password"]: repass }) {
    let error = ''
    if (!username || !password) {
      error = 'All fields are required!'
    }
    if (password != repass) {
      error = "Passwords don't match!"
    }
    if (error) {
      ctx.render(registerTemplate(createSubmitHandler(onRegister), error));
      return
    }

    try {
      await registerUser(username, password);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      error = error.message;
      ctx.render(registerTemplate(createSubmitHandler(onRegister), error))
    }
  }
}
