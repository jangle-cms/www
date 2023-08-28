// Forms
const initializeForm = (props) => {

  let dialog = document.getElementById(props.dialogId)
  let form = document.getElementById(props.formId)
  let openDialogButtons = document.querySelectorAll(`button[data-action="${props.openDialogActionName}"]`)
  let closeDialogButton = document.querySelector(`button[data-action="${props.closeDialogActionName}"]`)

  const onFormSubmit = (event) => {
    event.preventDefault()

    const myForm = event.target
    const formData = new FormData(myForm)
    const body = new URLSearchParams(formData).toString()

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    })
      .then(() => dialog.close())
      .catch((error) => alert(error))
  }

  form.addEventListener("submit", onFormSubmit)
  openDialogButtons.forEach(button => {
    button.addEventListener('click', () => {
      dialog.showModal()
    })
  })
  closeDialogButton.addEventListener('click', () => {
    dialog.close()
  })
}

window.onload = () => {
  // Waitlist form
  initializeForm({
    dialogId: 'waitlistDialog',
    formId: 'waitlistForm',
    openDialogActionName: 'openWaitlistDialog',
    closeDialogActionName: 'closeWaitlistDialog'
  })
  // Contact us form
  initializeForm({
    dialogId: 'contactUsDialog',
    formId: 'contactUsForm',
    openDialogActionName: 'openContactUsDialog',
    closeDialogActionName: 'closeContactUsDialog'
  })
}
