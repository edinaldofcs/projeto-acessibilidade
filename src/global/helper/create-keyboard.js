export const createButtons = (buttons) => {

  const buttonGrid = document.getElementById("button_container");
  for (let item of buttons) {
    const button = document.createElement("button");
    const classes = item.class.split(' ')
    button.classList.add(...classes);

    if ("id" in item) {
      button.setAttribute("id", item.id);
    }
    if ("data_option" in item) {
      button.setAttribute("data-option", item.data_option);
    }

    button.innerHTML = item.text;
    buttonGrid.append(button);
  }
};
