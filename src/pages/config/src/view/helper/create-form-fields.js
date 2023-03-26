export const createFormFields = (fileds) => {
  const div = document.getElementById("container");

  fileds.forEach((item) => {
    const divWrapper = document.createElement("div");
    let classes = "relative flex flex-col gap-6".split(' ')
    divWrapper.classList.add(...classes);

    const h2 = document.createElement("h2");
    h2.innerHTML = item.text;

    const span = document.createElement("span");
    classes = "absolute bottom-4 bg-white".split(' ')
    span.classList.add(...classes);
    span.setAttribute("id", item.spanId);

    const input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("step", item.step);
    input.setAttribute("value", item.value);
    input.setAttribute("min", item.min);
    input.setAttribute("max", item.max);
    input.setAttribute("id", item.id);
    input.setAttribute('data-storage', item.data_storage);
    input.classList.add("z-10");
    input.classList.add("w-full");

    divWrapper.appendChild(h2);
    divWrapper.appendChild(span);
    divWrapper.appendChild(input);
    div.append(divWrapper)
  });

  const button = document.createElement('button')
  button.setAttribute('id', 'form_button')
  button.setAttribute('type', 'submit')
  button.innerHTML = 'Restaurar padrão'
  let classes = "bg-blue-700 rounded text-white px-2 py-2".split(' ')
  button.classList.add(...classes);
  div.append(button)
};
